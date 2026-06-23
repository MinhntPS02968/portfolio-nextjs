# Technology Stack

**Analysis Date:** 2026-04-13

## Languages

**Primary:**
- TypeScript (strict mode) - app code and config in `frontend/src/**/*` and `frontend/*.ts`.

**Secondary:**
- JavaScript (ESM/CJS configs + scripts) - tooling and process config in `frontend/eslint.config.mjs`, `frontend/prettier.config.mjs`, `frontend/ecosystem.config.js`.
- SCSS/CSS assets - styling pipeline and vendor CSS loaded via `frontend/src/app/layout.tsx`.

## Runtime

**Environment:**
- Node.js runtime for Next.js app server/build (`frontend/package.json` scripts `dev`, `build`, `start`).
- Browser runtime for client-side features (`"use client"` usage in `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/socketio.ts`).

**Package Manager:**
- Yarn (lockfile present at `yarn.lock`; install command in `frontend/install.bash`).
- Lockfile: present.

## Frameworks

**Core:**
- Next.js `16.2.2` - app framework and build/runtime (`frontend/package.json`, `frontend/next.config.ts`).
- React `19.2.4` + React DOM `19.2.4` - UI runtime (`frontend/package.json`).
- TypeScript `^5` - static typing (`frontend/package.json`, `frontend/tsconfig.json`).

**Testing:**
- Not detected (no test runner config files found; no `*.test.*`/`*.spec.*` patterns detected in inspected scope).

**Build/Dev:**
- Next compiler/export mode (`output: "export"`) in `frontend/next.config.ts`.
- ESLint 9 + `eslint-config-next` in `frontend/eslint.config.mjs`.
- Prettier config in `frontend/prettier.config.mjs`.
- PM2 cluster process management (`instances: 2`) in `frontend/ecosystem.config.js`.

## Key Dependencies

**Critical:**
- `axios` - HTTP transport foundation (`frontend/src/services/base-api.ts`, `frontend/src/utils/axios.ts`).
- `zustand` - shared client state and persisted stores (`frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`, `frontend/src/stores/web3.ts`).
- `@reown/appkit` + `@reown/appkit-adapter-ethers` + `ethers` - wallet connectivity and chain interaction (`frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/web3.ts`).
- `socket.io-client` + `socket.io-msgpack-parser` - real-time channel (`frontend/src/stores/socketio.ts`).

**Infrastructure:**
- `i18next` + `react-i18next` - localization subsystem (`frontend/src/utils/i18n.ts`, `frontend/src/providers/I18nProvider.tsx`).
- `sass` - SCSS compilation for global styles (`frontend/src/app/layout.tsx` imports `../../style/scss/style.scss`).
- `react-toastify`, `notiflix` - user notification layer (`frontend/src/app/layout.tsx`, `frontend/src/utils/toast.ts`).

## Configuration

**Environment:**
- Public runtime config via `NEXT_PUBLIC_*` environment variables consumed across app (`frontend/src/app/layout.tsx`, `frontend/src/services/base-api.ts`, `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/socketio.ts`).
- Environment template file present: `frontend/.env.example` (not quoted; contains environment setup placeholders/sample values).

**Build:**
- `frontend/next.config.ts` controls export mode and image optimization flags.
- `frontend/tsconfig.json` configures strict TypeScript, bundler module resolution, and path aliases (`@/*`, `@/public/client/*`).
- `frontend/eslint.config.mjs` and `frontend/prettier.config.mjs` define lint/format policy.

## Platform Requirements

**Development:**
- Node.js + Yarn environment capable of running `yarn dev` and `yarn build` in `frontend/package.json`.

**Production:**
- Next.js production start under PM2 cluster mode (`frontend/ecosystem.config.js`).
- Deployment flow expects git/yarn/pm2 shell pipeline (`frontend/install.bash`).

## Dependency Hotspots

- **Web3 stack coupling hotspot:** `frontend/src/providers/Web3Provider.tsx` centralizes Reown AppKit, chain definitions, network switching, signer/provider setup, and store sync.
- **API access hotspot:** `frontend/src/services/base-api.ts` defines shared axios client, timeout, TLS agent option, auth token injection, and common error normalization.
- **State + integration hotspot:** `frontend/src/stores/account.ts` depends on multiple API clients (`userApi`, `vipBoosterApi`) and environment seed value (`NEXT_PUBLIC_ROOT_REF_ID`).

## Key Coupling Points

- `frontend/src/services/api/*.ts` classes are tightly coupled to backend route contracts under `/auth`, `/user`, `/staking`, `/swap`, `/vip-boost`.
- `frontend/src/stores/socketio.ts` couples socket auth handshake to auth store token and `NEXT_PUBLIC_SOCKET_URL`.
- `frontend/src/app/layout.tsx` couples app bootstrap to external font CDNs and local static template assets (`/client/css/*`, `/client/js/*`).

---

*Stack analysis: 2026-04-13*
