import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  DEVELOPMENT_FONT_FAMILIES,
  getFontChoice,
  listFontChoices,
  renderDevelopmentFontOptions
} from '../public/studio/font-catalog.js';
import { createApp } from '../src/server.js';
import {
  createInitialStudioState,
  reduceStudioState,
  runIndicativeChecks
} from '../public/studio/studio-state.js';

test('development Studio exposes the controlled ten-family apparel font library', () => {
  assert.deepEqual(
    DEVELOPMENT_FONT_FAMILIES.map(font => font.label),
    [
      'Anton',
      'Bebas Neue',
      'Oswald',
      'League Spartan',
      'Barlow Condensed',
      'Montserrat',
      'Archivo Black',
      'Bitter',
      'Graduate',
      'Pacifico'
    ]
  );

  const choices = listFontChoices();
  assert.equal(choices.length, 16);
  assert.equal(choices.every(choice => choice.developmentOnly), true);
  assert.equal(choices.every(choice => choice.productionApproved === false), true);
  assert.equal(getFontChoice('anton-regular').version, '2.116');
  assert.equal(getFontChoice('league-spartan-bold').weight, 700);
});

test('basketball number fonts remain usable for development but block production readiness', () => {
  const state = createInitialStudioState('basketball-jersey');
  const number = state.surfaces['dark.front'].layers.find(layer => layer.role === 'number');

  assert.equal(number.fontId, 'anton-regular');

  const changed = reduceStudioState(state, {
    type: 'updateLayer',
    surface: 'dark.front',
    layerId: number.id,
    patch: { fontId: 'graduate-regular' }
  });
  assert.equal(changed.ok, true);
  assert.equal(changed.state.surfaces['dark.front'].layers.find(layer => layer.id === number.id).fontId, 'graduate-regular');

  const checks = runIndicativeChecks(changed.state);
  const gate = checks.find(check => check.code === 'UNVALIDATED_BASKETBALL_FONT' && check.surface === 'dark.front');
  assert.equal(gate?.blocking, true);
  assert.match(gate?.message, /development preview only/i);
});

test('basketball development picker keeps every candidate selectable and labels the gate', () => {
  const html = renderDevelopmentFontOptions('graduate-regular');

  assert.match(html, /<optgroup label="Anton">/);
  assert.match(html, />Anton — Regular · Not production validated<\/option>/);
  assert.match(html, /value="graduate-regular" selected[^>]*>Graduate — Regular/);
  assert.doesNotMatch(html, /disabled/);
  assert.match(html, /Not production validated/);
});

test('development font assets match the validated artifacts and retain OFL evidence', async () => {
  const expected = new Map([
    ['public/fonts/anton/Anton-Regular.ttf', 'a4ba3a92350ebb031da0cb47630ac49eb265082ca1bc0450442f4a83ab947cab'],
    ['public/fonts/bebas-neue/BebasNeue-Regular.ttf', '08e4623805102d819f58601e46e345648846075e363b2ceb23313c2d1c83ec73'],
    ['public/fonts/oswald/Oswald[wght].ttf', '5b38c246e255a12f5712d640d56bcced0472466fc68983d2d0410ec0457c2817'],
    ['public/fonts/league-spartan/LeagueSpartan-Regular.woff2', '41a272ba94993caefcdc0444407b7bfa400a6d44c32857b8f2273b3c568bc112'],
    ['public/fonts/league-spartan/LeagueSpartan-Bold.woff2', '353514311e239dfba514b3673a9348caab3a0fc639bd4e889b00707576d532ed'],
    ['public/fonts/barlow-condensed/BarlowCondensed-Regular.ttf', '583cec5da3b84bc4dc7c9c72e2a565c94d34e431518b19d7e250b7830ad5f996'],
    ['public/fonts/barlow-condensed/BarlowCondensed-SemiBold.ttf', '7b619d14bc2327509a9ef32b0890f709626f7ecc9ff61191c2a4314c5499d2d9'],
    ['public/fonts/barlow-condensed/BarlowCondensed-Bold.ttf', 'e476562ec9c1e16cf16475895b511f08c804f438cc9a9f80a44ea50a0eeb5b65'],
    ['public/fonts/montserrat/Montserrat[wght].ttf', '0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7'],
    ['public/fonts/archivo-black/ArchivoBlack-Regular.ttf', 'dd9a89a019b4849f66ab75455fe7bdf931311042cbb0f0f97acc061539703180'],
    ['public/fonts/bitter/Bitter[wght].ttf', 'ef2b9a711fb02f1e5823b34da1b7450e0fc76793b7d733a8b41006e24916d4a7'],
    ['public/fonts/graduate/Graduate-Regular.ttf', '971222b309851d86f2513f89b510dc52d52ef7798b5f43af2c6f58d43df568e5'],
    ['public/fonts/pacifico/Pacifico-Regular.ttf', '5b6c0d5334a7bf77dea52b975c5a0c408878c0f7115ed5b6fb151f634b7bf701']
  ]);

  for (const [path, hash] of expected) {
    const contents = await readFile(path);
    assert.equal(createHash('sha256').update(contents).digest('hex'), hash, path);
  }

  for (const family of DEVELOPMENT_FONT_FAMILIES) {
    const licenceName = family.id === 'league-spartan' ? 'OFL.md' : 'OFL.txt';
    const licence = await readFile(`public/fonts/${family.id}/${licenceName}`, 'utf8');
    assert.match(licence, /SIL Open Font License[\s\S]*Version 1\.1/i, family.label);
  }

  const css = await readFile('public/studio/fonts.css', 'utf8');
  assert.match(css, /font-family: "Pivot Anton"/);
  assert.match(css, /font-family: "Pivot Pacifico"/);
  assert.match(css, /None of these faces is production approved/);
});

test('server sends development fonts and licence evidence with usable content types', async t => {
  const server = createApp();
  await new Promise(resolve => server.listen(0, resolve));
  t.after(() => server.close());
  const origin = `http://127.0.0.1:${server.address().port}`;

  const font = await fetch(`${origin}/fonts/anton/Anton-Regular.ttf`);
  const licence = await fetch(`${origin}/fonts/anton/OFL.txt`);

  assert.equal(font.status, 200);
  assert.equal(font.headers.get('content-type'), 'font/ttf');
  assert.equal(licence.status, 200);
  assert.equal(licence.headers.get('content-type'), 'text/plain; charset=utf-8');
});
