import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { brotliCompress as brotliCompressCallback, gzip as gzipCallback } from 'node:zlib';
import { canAccessClub, publicProducts, transition } from './domain.js';
import { uniformRuleProfile } from './uniform-rules.js';
import { validateClubInterest } from './club-interest.js';
import { validateStudioFeedback } from './studio-feedback.js';
import { createFastmailJmapSender } from './fastmail-jmap.js';
import { createStudioFeedbackSender } from './studio-feedback-delivery.js';
import { getHomePageMarkup } from '../public/website/home-page.js';
const root = fileURLToPath(new URL('..', import.meta.url));
const stateFile = join(root, 'data/state.json');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf','.woff':'font/woff','.woff2':'font/woff2','.otf':'font/otf','.txt':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8'};
const compressible=new Set(['.html','.js','.css','.svg']);
const brotliCompress=promisify(brotliCompressCallback);const gzip=promisify(gzipCallback);
const securityHeaders={'content-security-policy':"default-src 'self'; base-uri 'none'; connect-src 'self'; font-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob:; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'",'permissions-policy':'camera=(), geolocation=(), microphone=()','referrer-policy':'strict-origin-when-cross-origin','x-content-type-options':'nosniff'};
const load=async()=>JSON.parse(await readFile(stateFile,'utf8'));
const save=s=>writeFile(stateFile,JSON.stringify(s,null,2));
const send=(res,status,data,headers={})=>{res.writeHead(status,{...securityHeaders,'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers});res.end(JSON.stringify(data));};
async function sendStatic(req,res,path,content){const extension=extname(path);let body=Buffer.isBuffer(content)?content:Buffer.from(content);const headers={...securityHeaders,'content-type':types[extension]||'application/octet-stream','cache-control':['.html','.js','.css'].includes(extension)?'no-cache':path.startsWith('/brand/')?'public, max-age=604800':'public, max-age=3600'};if(body.length>=1024&&compressible.has(extension)){headers.vary='Accept-Encoding';const accepted=req.headers['accept-encoding']||'';if(/\bbr\b/.test(accepted)){body=await brotliCompress(body);headers['content-encoding']='br';}else if(/\bgzip\b/.test(accepted)){body=await gzip(body);headers['content-encoding']='gzip';}}res.writeHead(200,headers);res.end(body);}
async function body(req,maxBytes=1e6){let raw='';let bytes=0;for await(const chunk of req){bytes+=chunk.length;if(bytes>maxBytes)throw Object.assign(new Error('Request too large'),{code:'REQUEST_TOO_LARGE'});raw+=chunk;}if(!raw)return{};try{return JSON.parse(raw)}catch{throw Object.assign(new Error('Invalid JSON'),{code:'INVALID_JSON'})}}
function user(req,state){const email=req.headers['x-demo-user'];return state.users.find(u=>u.email===email);}
export function createApp({sendClubInterest=createFastmailJmapSender(),sendStudioFeedback=createStudioFeedbackSender(),now=Date.now}={}){const clientKey=req=>req.socket.remoteAddress||'unknown';const interestAttempts=new Map();const takeInterestAttempt=req=>{const key=clientKey(req);const cutoff=now()-15*60*1000;const recent=(interestAttempts.get(key)||[]).filter(at=>at>cutoff);if(recent.length>=5)return false;recent.push(now());interestAttempts.set(key,recent);return true};const feedbackAttempts=new Map();const takeFeedbackAttempt=req=>{const key=clientKey(req);const cutoff=now()-15*60*1000;const recent=(feedbackAttempts.get(key)||[]).filter(at=>at>cutoff);if(recent.length>=10)return false;recent.push(now());feedbackAttempts.set(key,recent);return true};return createServer(async(req,res)=>{try{
  const url=new URL(req.url,'http://local');
  if(url.pathname==='/api/club-interest'&&req.method==='POST'){
    if(!/^application\/json\b/i.test(req.headers['content-type']||''))return send(res,415,{error:'JSON required',code:'UNSUPPORTED_MEDIA_TYPE'});
    const origin=req.headers.origin;const expectedOrigin=`http://${req.headers.host}`;
    if(origin&&origin!==expectedOrigin&&origin!==expectedOrigin.replace('http://','https://'))return send(res,403,{error:'Request not permitted',code:'ORIGIN_NOT_PERMITTED'});
    const input=await body(req,16*1024);
    if(typeof input.website==='string'&&input.website.trim())return send(res,200,{ok:true});
    const result=validateClubInterest(input);if(!result.ok)return send(res,400,{error:'Check the required details',code:result.code});
    if(!takeInterestAttempt(req))return send(res,429,{error:'Please wait before trying again',code:'RATE_LIMITED'},{'retry-after':'900'});
    if(typeof sendClubInterest!=='function')return send(res,503,{error:'Form delivery is not configured',code:'DELIVERY_UNAVAILABLE'});
    try{await sendClubInterest(result.submission)}catch{console.error(JSON.stringify({event:'club_interest_delivery',outcome:'failed'}));return send(res,502,{error:'We could not send your details',code:'DELIVERY_FAILED'})}console.log(JSON.stringify({event:'club_interest_delivery',outcome:'accepted'}));return send(res,200,{ok:true});
  }
  if(url.pathname==='/api/studio-feedback'&&req.method==='POST'){
    if(!/^application\/json\b/i.test(req.headers['content-type']||''))return send(res,415,{error:'JSON required',code:'UNSUPPORTED_MEDIA_TYPE'});
    const origin=req.headers.origin;const expectedOrigin=`http://${req.headers.host}`;
    if(origin&&origin!==expectedOrigin&&origin!==expectedOrigin.replace('http://','https://'))return send(res,403,{error:'Request not permitted',code:'ORIGIN_NOT_PERMITTED'});
    const input=await body(req,16*1024);
    if(typeof input.website==='string'&&input.website.trim())return send(res,200,{ok:true});
    const result=validateStudioFeedback(input);if(!result.ok)return send(res,400,{error:'Add your feedback before sending',code:result.code});
    if(!takeFeedbackAttempt(req))return send(res,429,{error:'Please wait before sending more feedback',code:'RATE_LIMITED'},{'retry-after':'900'});
    if(typeof sendStudioFeedback!=='function')return send(res,503,{error:'Feedback delivery is not configured',code:'DELIVERY_UNAVAILABLE'});
    try{await sendStudioFeedback(result.submission)}catch{console.error(JSON.stringify({event:'studio_feedback_delivery',outcome:'failed'}));return send(res,502,{error:'We could not send your feedback',code:'DELIVERY_FAILED'})}console.log(JSON.stringify({event:'studio_feedback_delivery',outcome:'accepted'}));return send(res,200,{ok:true});
  }
  const state=await load();
  if(url.pathname.startsWith('/api/store/')){const result=publicProducts(state,url.pathname.split('/').pop());return result?send(res,200,result,{'x-robots-tag':'noindex, nofollow'}):send(res,404,{error:'Store not found'});}
  if(url.pathname==='/api/session'){const u=user(req,state);return send(res,u?200:401,u??{error:'Sign in required'});}
  if(url.pathname==='/api/uniform-rules'){return send(res,200,uniformRuleProfile);}
  if(url.pathname==='/api/admin'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});return send(res,200,{user:u,clubs:state.clubs.filter(c=>canAccessClub(u,c.id)),designs:state.designs.filter(d=>canAccessClub(u,d.clubId)),users: u.role==='pivot_admin'?state.users:state.users.filter(x=>x.clubId===u.clubId)});}
  const match=url.pathname.match(/^\/api\/designs\/([^/]+)\/(save|submit|clubApprove|pivotApprove|return|publish)$/);
  if(match&&req.method==='POST'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});const i=state.designs.findIndex(d=>d.id===match[1]);if(i<0)return send(res,404,{error:'Design not found'});const input=await body(req);if(match[2]==='save'){for(const key of ['colour','accent','artwork','uploadedArtwork'])if(input[key]!==undefined)state.designs[i][key]=input[key];}state.designs[i]=transition(state.designs[i],match[2],u);if(match[2]!=='submit')await save(state);console.log(JSON.stringify({event:'design_transition',design:match[1],action:match[2],actor:u.email}));return send(res,200,state.designs[i]);}
  if(url.pathname==='/api/admin/users'&&req.method==='POST'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});const input=await body(req);if(!canAccessClub(u,input.clubId)||u.role==='club_admin'&&input.role==='primary_approver')return send(res,403,{error:'Not permitted'});if(!['club_admin','primary_approver'].includes(input.role)||!/^\S+@\S+$/.test(input.email))return send(res,400,{error:'Invalid account'});state.users.push(input);await save(state);return send(res,201,input);}
  const path=url.pathname==='/'?'/index.html':url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;try{const file=await readFile(join(root,'public',path));const content=path==='/index.html'?file.toString('utf8').replace('<main id="app" tabindex="-1"></main>',`<main id="app" tabindex="-1">${getHomePageMarkup()}</main>`):file;await sendStatic(req,res,path,content);}catch{send(res,404,{error:'Not found'});}
}catch(error){console.error(JSON.stringify({event:'request_error',code:error.code||'ERROR',message:error.message}));send(res,error.code==='FORBIDDEN'?403:error.code==='INVALID_TRANSITION'?409:400,{error:error.message,code:error.code});}})}
if(process.argv[1]===fileURLToPath(import.meta.url)){createApp().listen(process.env.PORT||3000,()=>console.log(JSON.stringify({event:'listening',url:`http://localhost:${process.env.PORT||3000}`})));}
