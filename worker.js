const analyticsAssets = `
<link data-blinkin-analytics href="https://blinkin.de/cookieconsent/cookieconsent.css" rel="stylesheet">
<link href="https://blinkin.de/cookie-consent.css" rel="stylesheet">
<script defer src="https://blinkin.de/cookieconsent/cookieconsent.umd.js"></script>
<script type="text/plain" data-category="analytics" data-service="PostHog" src="https://blinkin.de/posthog-init.js"></script>
<script defer src="https://blinkin.de/cookie-consent.js"></script>`;

export default {
  async fetch(request, env) {
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
      request = new Request(url, request);
    }

    const response = await env.ASSETS.fetch(request);
    if (!response.headers.get('content-type')?.includes('text/html')) return response;

    return new HTMLRewriter()
      .on('head', {
        element(element) {
          element.append(analyticsAssets, { html: true });
        },
      })
      .transform(response);
  },
};
