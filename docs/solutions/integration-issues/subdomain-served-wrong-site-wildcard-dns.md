---
module: hosting
date: 2026-08-18
problem_type: integration_issue
component: tooling
severity: medium
symptoms:
  - "vorsprung.blinkin.de served an unrelated app (HeyHouston) instead of this site"
  - "Cloudflare Pages custom domain stuck at status: pending"
  - "Cloudflare API DNS calls returned: Authentication error (code 10000)"
root_cause: missing_permission
resolution_type: config_change
tags:
  - cloudflare
  - dns
  - wildcard-dns
  - cloudflare-pages
  - workers
  - wrangler
  - custom-domain
---

# Subdomain served the wrong site: wildcard DNS plus a token without DNS rights

## Problem

`vorsprung.blinkin.de` was supposed to serve this landing page but returned a
different application. The Cloudflare Pages custom domain for the hostname
existed yet never left `pending`.

## Symptoms

- `curl https://vorsprung.blinkin.de/` returned `<title>HeyHouston</title>`, HTTP 200.
- Pages API listed the domain with `"status": "pending"`.
- Any `POST`/`GET` on `/zones/<id>/dns_records` returned
  `{"success":false,"errors":[{"code":10000,"message":"Authentication error"}]}`.

## What Didn't Work

- **Assuming a Worker route was hijacking the hostname.** Listing
  `/zones/<id>/workers/routes` and `/accounts/<id>/workers/domains` showed no
  entry for `vorsprung` — the routes belonged to other subdomains.
- **Creating the CNAME through the Cloudflare API with the local wrangler
  token.** The token carries `pages:write`, `workers:write` and `zone:read`, but
  no `dns_records:edit`; even reading DNS records fails.
- **`wrangler pages domain add`.** That subcommand does not exist in wrangler 4 —
  `wrangler pages` only exposes `project`, `deployment`, `deploy`, `dev`,
  `functions`, `secret`, `download`.

## Solution

Two findings drove the fix.

1. The zone has a wildcard record. Any unknown host resolves:

   ```bash
   dig +short zzz-nonexistent-test.blinkin.de   # → Cloudflare proxy IPs
   ```

   So `vorsprung` had no record of its own; it fell through to `*.blinkin.de`,
   which is why another app answered and why Pages stayed `pending`.

2. Creating an explicit record was impossible with the available token — but a
   **Worker custom domain provisions its own DNS record** using the `workers`
   scope. Serving the static files from a Worker therefore sidesteps the missing
   DNS permission entirely.

Remove the dead Pages custom domain, then deploy the directory as a Worker with
static assets:

```toml
# wrangler.toml
name = "vorsprung-blinkin-site"
compatibility_date = "2026-08-18"

[assets]
directory = "."
not_found_handling = "404-page"

[[routes]]
pattern = "vorsprung.blinkin.de"
custom_domain = true
zone_name = "blinkin.de"
```

```
# .assetsignore — keeps repo cruft off the public site
.git
.claude
node_modules
dist
wrangler.toml
.assetsignore
*.md
package.json
package-lock.json
```

```bash
wrangler deploy
```

`wrangler deploy` reported `vorsprung.blinkin.de (custom domain - zone name:
blinkin.de)` and the hostname was live within seconds.

## Why This Works

A wildcard record answers every hostname that has no more specific record, so a
subdomain can look "configured" while pointing at whatever the wildcard serves.
Cloudflare Pages custom domains do **not** create DNS themselves through the API
— the dashboard makes a separate DNS call, which is why the browser flow works
and the API flow leaves the domain `pending`. Worker custom domains are
different: provisioning the hostname *is* part of the Workers API, so the record
and certificate are created with `workers:write` alone.

## Prevention

- When a subdomain serves unexpected content, test for a wildcard first — one
  `dig` against a nonsense hostname in the same zone answers it:

  ```bash
  dig +short definitely-not-a-real-host.example.com
  ```

  An answer means every unconfigured subdomain in that zone is already "live".

- A Pages custom domain stuck at `pending` means DNS, not Pages. Check the
  record before touching the project.

- Check token scope before planning the route:

  ```bash
  wrangler whoami   # lists the OAuth token's scopes
  ```

  No `dns_records` entry means CNAMEs must be added in the dashboard, or the
  hostname must be attached through a mechanism that provisions DNS itself
  (Worker custom domain).

- Verify a static deploy per page, not just at the root — asset propagation can
  briefly return 500 right after `wrangler deploy`:

  ```bash
  for p in / about build.html vorher-nachher.html; do
    curl -sSL -o /dev/null -w "$p:%{http_code}\n" "https://vorsprung.blinkin.de/$p"
  done
  ```
