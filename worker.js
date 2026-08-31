export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'vorsprung.blinkin.io') {
      url.hostname = 'vorsprung.blinkin.de';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url, 301);
    }

    if (['/v15', '/v15/'].includes(url.pathname)) {
      url.pathname = '/';
      return Response.redirect(url, 301);
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      url.pathname = '/v15/';
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  },
};
