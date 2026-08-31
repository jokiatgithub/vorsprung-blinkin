// ponytail: one shared switcher for the current and archived versions
(function () {
  var versions = ['v15', 'v14', 'v13', 'v12', 'v11', 'v10', 'v9', 'v8', 'v7', 'v6', 'v5', 'v3', 'v2', 'v1'];
  var m = location.pathname.match(/^\/(v15|v14|v13|v12|v11|v10|v1|v2|v3|v5|v6|v7|v8|v9)(\/|$)/);
  var cur = m ? m[1] : 'v15';
  var page = location.pathname.replace(/^\/(v15|v14|v13|v12|v11|v10|v1|v2|v3|v5|v6|v7|v8|v9)\/?/, '/').replace(/^\/+/, '/');
  if (page === '/' || page === '') page = '/index.html';
  var multiPage = { '/index.html': 1, '/build.html': 1, '/playground.html': 1, '/vorher-nachher.html': 1, '/about.html': 1 };
  function href(v) {
    if (v === 'v15') return '/';
    if (v === 'v14') return '/v14/';
    if (v === 'v13') return '/v13/';
    if (v === 'v12') return '/v12/';
    if (v === 'v11') return '/v11/';
    if (v === 'v1' || v === 'v2' || v === 'v3') return multiPage[page] ? '/' + v + page : '/' + v + '/';
    return '/' + v + '/';
  }
  var items = versions.map(function (v) {
    return v === cur
      ? '<span class="version-picker__current">' + v.toUpperCase() + '</span>'
      : '<a class="version-picker__link" href="' + href(v) + '">' + v.toUpperCase() + '</a>';
  }).join('<span class="version-picker__separator">·</span>');
  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/version-picker.css';
  document.head.appendChild(stylesheet);
  var el = document.createElement('div');
  el.innerHTML =
    '<nav class="version-picker" aria-label="Versionsauswahl">' +
    '<span class="version-picker__label">Version</span>' + items + '</nav>';
  document.body.appendChild(el.firstChild);
})();
