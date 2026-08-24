// ponytail: floating version switcher across /, /v1/, /v2/, /v5/ … /v9/
(function () {
  var VERSIONS = [
    { id: 'neu', label: 'Neu', name: 'Aktuelle Base-Seite' },
    { id: 'v9', label: 'V9', name: 'Parloa-Grammatik' },
    { id: 'v8', label: 'V8', name: 'Der Helle Weg' },
    { id: 'v7', label: 'V7', name: 'Vom Rauschen zur Struktur' },
    { id: 'v6', label: 'V6', name: 'Protokoll' },
    { id: 'v5', label: 'V5', name: 'Shibuya Sleeve' },
    { id: 'v2', label: 'V2', name: 'Base Iteration 2' },
    { id: 'v1', label: 'V1', name: 'Base Iteration 1' }
  ];
  var SUB = '/(v1|v2|v5|v6|v7|v8|v9)';
  var m = location.pathname.match(new RegExp('^' + SUB + '(/|$)'));
  var cur = m ? m[1] : 'neu';
  var page = location.pathname.replace(new RegExp('^' + SUB + '/?'), '/').replace(/^\/+/, '/');
  if (page === '/' || page === '') page = '/index.html';
  var multiPage = { '/index.html': 1, '/build.html': 1, '/vorher-nachher.html': 1, '/about.html': 1 };
  function href(v) {
    if (v === cur) return null;
    if (v === 'neu') return page;
    if (v === 'v1' || v === 'v2') return multiPage[page] ? '/' + v + page : '/' + v + '/';
    return '/v' + v.slice(1) + '/'; // v5-v9: eigene Landing je Version
  }
  var items = VERSIONS.map(function (v) {
    if (v.id === cur) {
      return '<span title="' + v.name + '" style="font-weight:700;color:#ff7714;white-space:nowrap">' + v.label + '</span>';
    }
    return '<a href="' + href(v.id) + '" title="' + v.name + '" style="color:#7ad0ff;text-decoration:none;opacity:.9;white-space:nowrap">' + v.label + '</a>';
  }).join('<span style="opacity:.3">·</span>');
  var el = document.createElement('div');
  el.innerHTML =
    '<div role="navigation" aria-label="Versionsauswahl" style="position:fixed;bottom:14px;right:14px;z-index:9999;' +
    "font:12px/1 Manrope,system-ui,sans-serif;background:#111;color:#fff;border-radius:999px;padding:7px 12px;" +
    'display:flex;gap:8px;align-items:center;box-shadow:0 4px 14px rgba(0,0,0,.25);max-width:calc(100vw - 28px);flex-wrap:wrap">' +
    '<span style="opacity:.6">Version</span>' + items + '</div>';
  document.body.appendChild(el.firstChild);
})();
