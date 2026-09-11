# Deploying to a VPS + domain

## Frontend (this repo)

1. Build once: `npm install && npm run build` — this produces a static `dist/` folder.
2. Upload `dist/` to the VPS and serve it as static files (nginx, Caddy, etc.)
   pointed at your domain. Any static file server works; there is no Node
   process to keep running.
3. Set the backend URL by editing `dist/config.js` on the server (not by
   rebuilding):
   ```js
   window.__COIREI_CONFIG__ = {
     apiBaseUrl: 'https://api.yourdomain.com', // no trailing slash
   };
   ```
   Changing this later (new backend host, moved server, etc.) only needs an
   edit to this one file and a page reload — never a rebuild or re-upload of
   the whole app.
4. SPA routing: configure the web server to serve `index.html` for any path
   that isn't a real file (nginx: `try_files $uri /index.html;`), so
   `/p/<id>/leads` etc. work on a hard refresh, not just client-side nav.

## Backend

Set these in the backend's `.env` (see `.env.example` there for the full list):

- `FRONTEND_BASE_URL=https://yourdomain.com` — where Google sign-in redirects
  back to, and the default allowed CORS origin.
- `FRONTEND_ORIGINS=` — extra origins if the frontend is on a different
  subdomain than the one derived above (comma separated).
- `GOOGLE_SIGNIN_REDIRECT_URI=https://api.yourdomain.com/api/auth/google/callback`
  — set explicitly rather than relying on auto-detection from the request,
  since that depends on the reverse proxy forwarding `Host`/`X-Forwarded-Proto`
  correctly.
- `GOOGLE_REDIRECT_URI=https://api.yourdomain.com/api/oauth/google/callback`
  — the separate Gmail-send OAuth callback.
- Register **both** of the above exact URLs (https, real domain, no trailing
  slash) as Authorized redirect URIs in the Google Cloud Console OAuth client
  — sign-in fails with a generic error if these don't match exactly.
- `ADMIN_API_KEY`, `DATABASE_URL`, `OLLAMA_KEY` and the other provider keys.
- If the backend sits behind a reverse proxy (nginx/Caddy on the same host),
  keep `forwarded_allow_ips` matching the proxy's IP in the uvicorn launch
  command (`127.0.0.1` if nginx is on the same box) so it trusts the
  forwarded `Host`/`Proto` headers.

## Quick way to catch a mismatch

- Open the deployed site, open the browser's Network tab, and confirm `/api/...`
  requests go to the URL you set in `config.js` — not `localhost`.
- Try Google sign-in once end to end; a redirect_uri_mismatch error from
  Google means the registered URI and `GOOGLE_SIGNIN_REDIRECT_URI` don't
  match exactly (scheme, host, and path all have to be identical).
