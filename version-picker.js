// ponytail: tiny floating version switcher across / (v10), /v3/, /v2/, /v1/
(function () {
  var m = location.pathname.match(/^\/(v1|v2|v3)(\/|$)/);
  var cur = m ? m[1] : 'v10';
  var page = location.pathname.replace(/^\/(v1|v2|v3)\/?/, '/').replace(/^\/+/, '/');
  if (page === '/' || page === '') page = '/index.html';
  var v1Pages = { '/index.html': 1, '/build.html': 1, '/vorher-nachher.html': 1, '/about.html': 1 };
  function href(v) {
    if (v === 'v10') return page;
    if (v === 'v1') return v1Pages[page] ? '/v1' + page : '/v1/';
    return '/' + v + page;
  }
  var items = ['v10', 'v3', 'v2', 'v1'].map(function (v) {
    return v === cur
      ? '<span style="font-weight:700">' + v + '</span>'
      : '<a href="' + href(v) + '" style="color:#7ad0ff;text-decoration:none;opacity:.9">' + v + '</a>';
  }).join('<span style="opacity:.3">·</span>');
  var el = document.createElement('div');
  el.innerHTML =
    '<div style="position:fixed;bottom:14px;right:14px;z-index:9999;font:12px/1 Manrope,system-ui,sans-serif;' +
    'background:#111;color:#fff;border-radius:999px;padding:7px 12px;display:flex;gap:8px;align-items:center;' +
    'box-shadow:0 4px 14px rgba(0,0,0,.25)"><span style="opacity:.6">Version</span>' + items + '</div>';
  document.body.appendChild(el.firstChild);
})();
