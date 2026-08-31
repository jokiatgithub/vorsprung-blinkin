import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import worker from '../worker.js';

test('redirects the .io host and serves V15 at the .de root', async () => {
  assert.match(await readFile(new URL('../wrangler.toml', import.meta.url), 'utf8'), /run_worker_first = true/);
  const v15 = await readFile(new URL('../v15/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(v15, /version-picker\.js/);
  assert.match(v15, /href="\/">KI-Begleitung<\/a>/);
  for (const page of ['v15/index.html', 'build.html', 'forward-deployed-engineering.html', 'playground.html', 'vorher-nachher.html', 'about.html']) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.equal(html.match(/>KI-Plattform<\/a>/g)?.length, 2, `${page} keeps the KI-Plattform label in header and footer`);
  }

  const redirect = await worker.fetch(new Request('https://vorsprung.blinkin.io/v10/?from=io'));
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get('location'), 'https://vorsprung.blinkin.de/v10/?from=io');

  const legacy = await worker.fetch(new Request('https://vorsprung.blinkin.de/v14/?from=menu'));
  assert.equal(legacy.status, 301);
  assert.equal(legacy.headers.get('location'), 'https://vorsprung.blinkin.de/?from=menu');

  const request = new Request('https://vorsprung.blinkin.de/?campaign=root');
  const response = new Response('site');
  const assets = { fetch: (received) => {
    assert.equal(received.url, 'https://vorsprung.blinkin.de/v15/?campaign=root');
    return response;
  } };
  assert.equal(await worker.fetch(request, { ASSETS: assets }), response);
});
