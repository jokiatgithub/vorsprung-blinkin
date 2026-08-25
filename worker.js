export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'vorsprung.blinkin.io') {
      url.hostname = 'vorsprung.blinkin.de';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
