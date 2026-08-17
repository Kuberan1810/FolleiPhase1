# Follei Phase 1 Frontend

React/Vite frontend for the Follei tenant onboarding and Insurance lead-to-application slice.

## Integrated backend flows

- Tenant registration, login, JWT refresh, and current-user hydration
- Tenant user profile and company profile
- Mandatory frontend industry selection (`Insurance` is temporarily translated to the backend's `Financial Services` value)
- Company document upload with indexing-job polling
- Authorized company website ingestion
- Extracted-fact review and human approval/rejection
- Authenticated Google Workspace/Gmail OAuth start and callback
- HubSpot private-app connection and contact/company/deal sync
- Lead-file upload, preview summary, and explicit commit
- Onboarding completion

Unsupported CRM and messaging cards are displayed as **Coming soon** and do not create fake connected state.

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Default local values:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_OAUTH_START_PATH=/api/email-connections/gmail/oauth/start
VITE_GOOGLE_CONNECTIONS_PATH=/api/email-connections
```

For the current Gmail OAuth backend, set this backend value so Google returns to the frontend:

```dotenv
GMAIL_OAUTH_SUCCESS_URL=http://localhost:5173/integrations/google/callback
```

The Google Cloud OAuth client's authorized backend redirect URI remains the backend callback, normally:

```text
http://127.0.0.1:8000/api/email-connections/gmail/oauth/callback
```

If the expanded Google Workspace API is deployed, set the two frontend path variables to its OAuth-start and connection-list routes. The frontend accepts either a raw `{authorization_url}` response or a `{data:{authorization_url}}` envelope and immediately opens the returned Google URL in the current browser tab.

## Lightweight validation

The frontend is safe to validate without starting PostgreSQL, Kafka, Qdrant, FerretDB, MinIO, or the backend:

```bash
npm install
npm run build
npm run lint
```

To test live API behavior later, start the backend separately and then run:

```bash
npm run dev
```

## Current backend limitations reflected in the UI

- Google account sign-up/sign-in is not exposed by the current backend, so authentication uses email/password. Google Workspace is connected after authentication.
- The current Google endpoint provides Gmail communication OAuth. Drive, Calendar, and Contacts require the expanded Workspace migration.
- HubSpot uses a private-app access token; HubSpot OAuth is not implemented yet.
- Manual lead-to-customer conversion and invoice entry do not yet have completed backend APIs.
- Claims, renewals, binding, issuance, and underwriting decisions are outside this frontend slice.
