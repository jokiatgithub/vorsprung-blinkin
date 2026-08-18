// ponytail: tiny floating version switcher; maps same page between / and /v1/
(function () {
  var inV1 = location.pathname.indexOf('/v1/') === 0 || location.pathname === '/v1';
  var page = location.pathname.replace(/^\/v1\/?/, '/').replace(/^\/+/, '/');
  if (page === '/' || page === '') page = '/index.html';
  var other = inV1 ? page.replace(/^\//, '/') : '/v1' + page;
  if (inV1) other = page;            // v1 -> new version at root
  else other = '/v1' + page;         // root -> old version
  var el = document.createElement('div');
  el.innerHTML =
    '<div style="position:fixed;bottom:14px;right:14px;z-index:9999;font:12px/1 Manrope,system-ui,sans-serif;' +
    'background:#111;color:#fff;border-radius:999px;padding:7px 12px;display:flex;gap:8px;align-items:center;' +
    'box-shadow:0 4px 14px rgba(0,0,0,.25)">' +
    '<span style="opacity:.6">Version</span>' +
    (inV1
      ? '<span style="opacity:.55">v1</span><a href="' + other + '" style="color:#7ad0ff;text-decoration:none;font-weight:700">neu &rarr;</a>'
      : '<span style="font-weight:700">neu</span><a href="' + other + '" style="color:#7ad0ff;text-decoration:none;opacity:.9">v1 &rarr;</a>') +
    '</div>';
  document.body.appendChild(el.firstChild);
})();
