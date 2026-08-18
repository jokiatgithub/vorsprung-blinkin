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
// mobile: mirror the header CTA as the last menu item (hidden on desktop via CSS)
(function () {
  var nav = document.querySelector('.site-nav');
  var cta = document.querySelector('.site-header .nav-action');
  if (nav && cta && !nav.querySelector('.nav-cta-clone')) {
    var a = document.createElement('a');
    a.className = 'nav-cta-clone';
    a.href = cta.getAttribute('href');
    a.textContent = 'Gespräch buchen ↗';
    nav.appendChild(a);
  }
})();
