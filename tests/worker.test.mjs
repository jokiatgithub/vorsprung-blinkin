import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import worker from '../worker.js';

test('redirects the .io host and serves V15 at the .de root', async () => {
  assert.match(await readFile(new URL('../wrangler.toml', import.meta.url), 'utf8'), /run_worker_first = true/);
  const v15 = await readFile(new URL('../v15/index.html', import.meta.url), 'utf8');
  assert.match(v15, /version-picker\.js/);
  const picker = await readFile(new URL('../version-picker.js', import.meta.url), 'utf8');
  assert.match(picker, /var cur = m \? m\[1\] : 'v15'/);
  assert.match(picker, /if \(v === 'v15'\) return '\/'/);
  assert.match(picker, /if \(v === 'v11'\) return '\/v11\/'/);
  assert.match(v15, /href="\/">KI-Begleitung<\/a>/);
  for (const page of ['v15/index.html', 'build.html', 'forward-deployed-engineering.html', 'playground.html', 'vorher-nachher.html', 'about.html']) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.equal(html.match(/>KI-Plattform<\/a>/g)?.length, 2, `${page} keeps the KI-Plattform label in header and footer`);
  }

  const redirect = await worker.fetch(new Request('https://vorsprung.blinkin.io/v10/?from=io'));
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get('location'), 'https://vorsprung.blinkin.de/v10/?from=io');

  const legacyRequest = new Request('https://vorsprung.blinkin.de/v14/?from=archive');
  const legacyResponse = new Response('legacy');
  const legacyAssets = { fetch: (received) => {
    assert.equal(received, legacyRequest);
    return legacyResponse;
  } };
  assert.equal(await worker.fetch(legacyRequest, { ASSETS: legacyAssets }), legacyResponse);

  const request = new Request('https://vorsprung.blinkin.de/?campaign=root');
  const response = new Response('site');
  const assets = { fetch: (received) => {
    assert.equal(received.url, 'https://vorsprung.blinkin.de/v15/?campaign=root');
    return response;
  } };
  assert.equal(await worker.fetch(request, { ASSETS: assets }), response);
});

test('injects the shared consent-gated PostHog assets into HTML only', async () => {
  let injected = '';
  globalThis.HTMLRewriter = class {
    on(selector, handlers) {
      assert.equal(selector, 'head');
      handlers.element({
        append(markup, options) {
          injected = markup;
          assert.deepEqual(options, { html: true });
        },
      });
      return this;
    }

    transform(response) {
      return response;
    }
  };

  try {
    const response = new Response('<html><head></head><body></body></html>', {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
    const result = await worker.fetch(new Request('https://vorsprung.blinkin.de/page.html'), {
      ASSETS: { fetch: () => response },
    });

    assert.equal(result, response);
    assert.match(injected, /data-blinkin-analytics/);
    assert.match(injected, /data-category="analytics" data-service="PostHog"/);
    assert.match(injected, /https:\/\/blinkin\.de\/posthog-init\.js/);
  } finally {
    delete globalThis.HTMLRewriter;
  }
});

test('the FDE page explains the partnership offer in one scannable module', async () => {
  const html = await readFile(new URL('../forward-deployed-engineering.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../partnership-module.css', import.meta.url), 'utf8');

  assert.match(html, /class="partnership-module"/);
  assert.match(html, /Gemeinsam vom Vorhaben in den Betrieb\./);
  assert.equal(html.match(/class="partnership-item"/g)?.length, 7);
  assert.match(html, /class="partnership-cta" href="https:\/\/calendar\.app\.google\/h872ptRL3MNE3dZ7A">Gespr&auml;ch buchen/);
  assert.match(html, /href="\/partnership-module\.css\?v=20260901-1"/);
  assert.match(css, /--partnership-accent: #17607c/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.partnership-list/);
});

test('the Build Sprint page summarizes the concrete sprint outcome', async () => {
  const html = await readFile(new URL('../build.html', import.meta.url), 'utf8');

  assert.match(html, /class="partnership-module"/);
  assert.match(html, /Das nehmt ihr nach vier Wochen mit\./);
  assert.equal(html.match(/class="partnership-item"/g)?.length, 7);
  assert.match(html, /class="partnership-cta" href="https:\/\/calendar\.app\.google\/h872ptRL3MNE3dZ7A">Build Sprint besprechen/);
  assert.match(html, /href="\.\/partnership-module\.css\?v=20260901-1"/);
});
