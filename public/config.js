/**
 * Runtime configuration, loaded before the app bundle.
 *
 * VITE_API_BASE_URL (in .env) is baked into the JS bundle at *build* time --
 * fine for local dev, but it means changing the backend URL after deploying
 * to a VPS would require rebuilding and re-uploading the whole app. Editing
 * the one value below instead takes effect on the next page load, no build
 * step needed: this file is served as a plain static file, untouched by the
 * bundler.
 *
 * Leave apiBaseUrl empty to fall back to VITE_API_BASE_URL from the build
 * (or same-origin /api, e.g. behind a reverse proxy that forwards /api to
 * the backend on the same domain).
 */
window.__COIREI_CONFIG__ = {
  apiBaseUrl: '',
};
