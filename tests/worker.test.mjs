import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../worker.js';

test('redirects the .io host and serves assets on .de', async () => {
  const redirect = await worker.fetch(new Request('https://vorsprung.blinkin.io/v10/?from=io'));
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get('location'), 'https://vorsprung.blinkin.de/v10/?from=io');

  const request = new Request('https://vorsprung.blinkin.de/');
  const response = new Response('site');
  const assets = { fetch: (received) => {
    assert.equal(received, request);
    return response;
  } };
  assert.equal(await worker.fetch(request, { ASSETS: assets }), response);
});
