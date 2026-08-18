// ponytail: derive active nav item from the route instead of hardcoding it per page
(function () {
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var target = (a.getAttribute('href') || '').split('#')[0];
    if (target === here || (here === 'index.html' && (target === '' || target === 'index.html'))) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
})();
