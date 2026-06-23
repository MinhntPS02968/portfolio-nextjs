# External Integrations

**Analysis Date:** 2026-04-13

## APIs & External Services

**Backend REST API:**
- Custom HTTPS API service - primary business data/auth endpoints.
  - SDK/Client: `axios` via shared client in `frontend/src/services/base-api.ts` and helper in `frontend/src/utils/axios.ts`.
  - Auth: bearer token from auth store/cookie (`frontend/src/services/base-api.ts`, `frontend/src/utils/axios.ts`), base URL from `NEXT_PUBLIC_API_URL`.

**Realtime API:**
- Socket.IO server - realtime room join and event channel.
  - SDK/Client: `socket.io-client` + `socket.io-msgpack-parser` in `frontend/src/stores/socketio.ts`.
  - Auth: socket `auth.token` taken from `useAuthStore` and endpoint from `NEXT_PUBLIC_SOCKET_URL`.

**Web3 Wallet + Chain RPC:**
- Reown AppKit (WalletConnect-style wallet UX) + Ethers provider/signer for contract interactions.
  - SDK/Client: `@reown/appkit`, `@reown/appkit-adapter-ethers`, `ethers`, `viem` in `frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts`.
  - Auth: project-level client ID from `NEXT_PUBLIC_REOWN_PROJECT_ID`; metadata via `NEXT_PUBLIC_REOWN_NAME`, `NEXT_PUBLIC_REOWN_DESCRIPTION`, `NEXT_PUBLIC_REOWN_URL`, `NEXT_PUBLIC_REOWN_ICON`.

**Third-party CDN assets:**
- Google Fonts + static template assets loaded in root layout.
  - SDK/Client: `<link>` and `<Script>` tags in `frontend/src/app/layout.tsx`.
  - Auth: Not applicable.

## Data Storage

**Databases:**
- Not detected in this repository (frontend app only; database expected behind backend API).
  - Connection: Not applicable in this codebase.
  - Client: Not applicable in this codebase.

**File Storage:**
- Local static assets via Next public path (`/client/*`, `/images/*`) in `frontend/src/app/layout.tsx`.

**Caching:**
- Client-side persisted state through Zustand middleware:
  - `localStorage` for account/socket stores (`frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`).
  - `sessionStorage` for web3 store (`frontend/src/stores/web3.ts`).

## Authentication & Identity

**Auth Provider:**
- Custom backend auth + wallet login flow.
  - Implementation: API login endpoints in `frontend/src/services/api/auth.ts`; token propagation through axios interceptors in `frontend/src/services/base-api.ts`; wallet connect/disconnect via Reown in `frontend/src/providers/Web3Provider.tsx` and `frontend/src/hooks/useLogout.ts`.

## Monitoring & Observability

**Error Tracking:**
- No external error tracking service detected.

**Logs:**
- Runtime logging through `console.*` statements (e.g., `frontend/src/services/base-api.ts`, `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/account.ts`).

## CI/CD & Deployment

**Hosting:**
- Self-managed Node/PM2 process hosting indicated by `frontend/ecosystem.config.js` and deploy script `frontend/install.bash`.

**CI Pipeline:**
- Not detected (`.github/workflows` absent in scanned repository).

## Environment Configuration

**Required env vars:**
- API/socket: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`, `NEXT_PUBLIC_TOKEN_NAME`.
- App mode/debug/site metadata: `NEXT_PUBLIC_MODE`, `NEXT_PUBLIC_DEBUG`, `NEXT_PUBLIC_SITE_TITLE`, `NEXT_PUBLIC_SITE_DESCRIPTION`.
- Web3/Reown: `NEXT_PUBLIC_REOWN_PROJECT_ID`, `NEXT_PUBLIC_REOWN_NAME`, `NEXT_PUBLIC_REOWN_DESCRIPTION`, `NEXT_PUBLIC_REOWN_URL`, `NEXT_PUBLIC_REOWN_ICON`.
- Referral seed: `NEXT_PUBLIC_ROOT_REF_ID`.

**Secrets location:**
- Environment template exists at `frontend/.env.example` (public-prefixed variables only in observed usage).

## Webhooks & Callbacks

**Incoming:**
- Not detected in frontend repository.

**Outgoing:**
- HTTP calls to backend API route groups: `/auth/*`, `/user/*`, `/staking/*`, `/swap/*`, `/vip-boost/*` via `frontend/src/services/api/*.ts`.

## Key Coupling Points

- `frontend/src/stores/account.ts` couples UI state updates to specific API client contracts (`userApi`, `vipBoosterApi`).
- `frontend/src/providers/Web3Provider.tsx` couples environment mode, chain selection, wallet provider behavior, and global web3 state synchronization.
- `frontend/src/stores/socketio.ts` couples auth store token lifecycle to socket connection lifecycle.
- `frontend/src/app/layout.tsx` couples app boot path to external font CDNs and static client bundle files.

---

*Integration audit: 2026-04-13*
