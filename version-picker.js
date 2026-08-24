// ponytail: one shared switcher for the current v10 and archived versions
(function () {
  var versions = ['v10', 'v9', 'v8', 'v7', 'v6', 'v5', 'v3', 'v2', 'v1'];
  var m = location.pathname.match(/^\/(v1|v2|v3|v5|v6|v7|v8|v9)(\/|$)/);
  var cur = m ? m[1] : 'v10';
  var page = location.pathname.replace(/^\/(v1|v2|v3|v5|v6|v7|v8|v9)\/?/, '/').replace(/^\/+/, '/');
  if (page === '/' || page === '') page = '/index.html';
  var multiPage = { '/index.html': 1, '/build.html': 1, '/playground.html': 1, '/vorher-nachher.html': 1, '/about.html': 1 };
  function href(v) {
    if (v === 'v10') return page;
    if (v === 'v1' || v === 'v2' || v === 'v3') return multiPage[page] ? '/' + v + page : '/' + v + '/';
    return '/' + v + '/';
  }
  var items = versions.map(function (v) {
    return v === cur
      ? '<span style="font-weight:700;color:#ff7714;white-space:nowrap">' + v.toUpperCase() + '</span>'
      : '<a href="' + href(v) + '" style="color:#7ad0ff;text-decoration:none;opacity:.9;white-space:nowrap">' + v.toUpperCase() + '</a>';
  }).join('<span style="opacity:.3">·</span>');
  var el = document.createElement('div');
  el.innerHTML =
    '<div role="navigation" aria-label="Versionsauswahl" style="position:fixed;bottom:14px;right:14px;z-index:9999;' +
    'font:12px/1 Manrope,system-ui,sans-serif;background:#111;color:#fff;border-radius:999px;padding:7px 12px;' +
    'display:flex;gap:8px;align-items:center;box-shadow:0 4px 14px rgba(0,0,0,.25);max-width:calc(100vw - 28px);flex-wrap:wrap">' +
    '<span style="opacity:.6">Version</span>' + items + '</div>';
  document.body.appendChild(el.firstChild);
})();
