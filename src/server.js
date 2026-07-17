import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { canAccessClub, publicProducts, transition } from './domain.js';
import { uniformRuleProfile } from './uniform-rules.js';
const root = fileURLToPath(new URL('..', import.meta.url));
const stateFile = join(root, 'data/state.json');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const load=async()=>JSON.parse(await readFile(stateFile,'utf8'));
const save=s=>writeFile(stateFile,JSON.stringify(s,null,2));
const send=(res,status,data,headers={})=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8',...headers});res.end(JSON.stringify(data));};
async function body(req){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>1e6)throw new Error('Request too large');}return raw?JSON.parse(raw):{};}
function user(req,state){const email=req.headers['x-demo-user'];return state.users.find(u=>u.email===email);}
export function createApp(){return createServer(async(req,res)=>{try{
  const url=new URL(req.url,'http://local'); const state=await load();
  if(url.pathname.startsWith('/api/store/')){const result=publicProducts(state,url.pathname.split('/').pop());return result?send(res,200,result,{'x-robots-tag':'noindex, nofollow'}):send(res,404,{error:'Store not found'});}
  if(url.pathname==='/api/session'){const u=user(req,state);return send(res,u?200:401,u??{error:'Sign in required'});}
  if(url.pathname==='/api/uniform-rules'){return send(res,200,uniformRuleProfile);}
  if(url.pathname==='/api/admin'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});return send(res,200,{user:u,clubs:state.clubs.filter(c=>canAccessClub(u,c.id)),designs:state.designs.filter(d=>canAccessClub(u,d.clubId)),users: u.role==='pivot_admin'?state.users:state.users.filter(x=>x.clubId===u.clubId)});}
  const match=url.pathname.match(/^\/api\/designs\/([^/]+)\/(save|submit|clubApprove|pivotApprove|return|publish)$/);
  if(match&&req.method==='POST'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});const i=state.designs.findIndex(d=>d.id===match[1]);if(i<0)return send(res,404,{error:'Design not found'});const input=await body(req);if(match[2]==='save'){for(const key of ['colour','accent','artwork','uploadedArtwork'])if(input[key]!==undefined)state.designs[i][key]=input[key];}state.designs[i]=transition(state.designs[i],match[2],u);if(match[2]!=='submit')await save(state);console.log(JSON.stringify({event:'design_transition',design:match[1],action:match[2],actor:u.email}));return send(res,200,state.designs[i]);}
  if(url.pathname==='/api/admin/users'&&req.method==='POST'){const u=user(req,state);if(!u)return send(res,401,{error:'Sign in required'});const input=await body(req);if(!canAccessClub(u,input.clubId)||u.role==='club_admin'&&input.role==='primary_approver')return send(res,403,{error:'Not permitted'});if(!['club_admin','primary_approver'].includes(input.role)||!/^\S+@\S+$/.test(input.email))return send(res,400,{error:'Invalid account'});state.users.push(input);await save(state);return send(res,201,input);}
  const path=url.pathname==='/'?'/index.html':url.pathname;try{const file=await readFile(join(root,'public',path));res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream'});res.end(file);}catch{send(res,404,{error:'Not found'});}
}catch(error){console.error(JSON.stringify({event:'request_error',code:error.code||'ERROR',message:error.message}));send(res,error.code==='FORBIDDEN'?403:error.code==='INVALID_TRANSITION'?409:400,{error:error.message,code:error.code});}})}
if(process.argv[1]===fileURLToPath(import.meta.url)){createApp().listen(process.env.PORT||3000,()=>console.log(JSON.stringify({event:'listening',url:`http://localhost:${process.env.PORT||3000}`})));}
