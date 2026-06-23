# Architecture

**Analysis Date:** 2026-04-13

## Pattern Overview

**Overall:** Client-heavy Next.js App Router frontend with feature-sliced modules (UI + state stores + API clients) running as static export.

**Key Characteristics:**
- Static deployment model via `output: "export"` in `frontend/next.config.ts`, with runtime behavior shifted to browser-side logic.
- Composition root in `frontend/src/app/layout.tsx` and `frontend/src/app/page.tsx`, where top-level UI and providers are assembled.
- Shared infrastructure split into `frontend/src/services`, `frontend/src/stores`, `frontend/src/providers`, and `frontend/src/utils`.
- Bootstrap JS and CSS are loaded as external static assets (`/client/js/*`, `/client/css/*`) instead of module imports.

## System Boundaries

**In Scope (this repository runtime):**
- UI rendering and interaction in `frontend/src/app` and `frontend/src/components`.
- Local state persistence/session in Zustand stores under `frontend/src/stores`.
- API orchestration to backend endpoints via Axios clients under `frontend/src/services`.
- Wallet and chain runtime integration in `frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts`.

**Out of Scope (external systems):**
- HTTP API server behind `NEXT_PUBLIC_API_URL` consumed from `frontend/src/services/base-api.ts`.
- Socket.IO server behind `NEXT_PUBLIC_SOCKET_URL` consumed from `frontend/src/stores/socketio.ts`.
- Blockchain RPC endpoints and wallet providers configured in `frontend/src/providers/Web3Provider.tsx`.

## Layers

**Application Entry Layer:**
- Purpose: Define document shell, metadata, global resources, and root route composition.
- Location: `frontend/src/app/layout.tsx`, `frontend/src/app/page.tsx`
- Contains: Next.js root layout, page composition, global scripts/styles, section assembly.
- Depends on: Providers, layout components, utility i18n helpers.
- Used by: Next.js App Router runtime.

**Presentation Layer:**
- Purpose: Render reusable and page-specific UI blocks.
- Location: `frontend/src/components/layout`, `frontend/src/components/layout/portfolio`, `frontend/src/components/common`
- Contains: Header/nav, portfolio sections, modal abstraction, decorative components.
- Depends on: React hooks, Bootstrap classes, GSAP animation hooks, app utilities.
- Used by: Route components in `frontend/src/app`.

**Provider Layer:**
- Purpose: Bridge external contexts (i18n, auth guard, web3) to React tree.
- Location: `frontend/src/providers`
- Contains: `I18nProvider`, `AuthProvider`, `Web3Provider`.
- Depends on: Zustand stores, Web3 SDK hooks, i18n utility functions.
- Used by: Root layout and feature components requiring context.

**State Layer:**
- Purpose: Centralize client state and side-effectful actions.
- Location: `frontend/src/stores`
- Contains: Auth/account/web3/socket stores with persistence middleware.
- Depends on: API clients, browser storage, socket/web3 libraries.
- Used by: Providers, hooks, and view components.

**Service Layer:**
- Purpose: Standardize HTTP access and endpoint-specific client methods.
- Location: `frontend/src/services/base-api.ts`, `frontend/src/services/api/*`
- Contains: Axios base client, auth token attachment, endpoint wrappers.
- Depends on: Zustand auth state, Axios, environment variables.
- Used by: Stores and potential feature hooks/components.

**Utility Layer:**
- Purpose: Stateless/shared helpers for i18n, storage, cookies, notifications, formatting.
- Location: `frontend/src/utils`
- Contains: i18n bootstrap, cookie/localStorage adapters, toast/loading/confirm wrappers.
- Depends on: browser APIs and small utility libs.
- Used by: Multiple upper layers.

## Data Flow

**HTTP-backed state update flow:**

1. A UI action or lifecycle hook triggers a store action (for example `getBalance` in `frontend/src/stores/account.ts`).
2. Store calls a typed endpoint method from `frontend/src/services/api/*` (for example `userApi.balance()` in `frontend/src/services/api/user.ts`).
3. API call passes through `BaseApiClient` interceptor in `frontend/src/services/base-api.ts`, which injects bearer token from `useAuthStore`.
4. Response payload is returned to store action and committed into persisted Zustand state.
5. Components reading store selectors re-render with updated values.

**Web3 connection and chain control flow:**

1. `frontend/src/providers/Web3Provider.tsx` initializes AppKit and default chain from `NEXT_PUBLIC_MODE`.
2. Wallet connection state comes from AppKit hooks (`useAppKitAccount`, `useAppKitProvider`, `useAppKitNetwork`).
3. Provider resolves ethers provider/signer and writes connection fields into `useWeb3Store`.
4. On chain mismatch, provider requests `wallet_switchEthereumChain` (and fallback add-chain) on wallet provider.
5. Context values are exposed to consumers via `useWeb3` hook.

**Localization control flow:**

1. `I18nProvider` in `frontend/src/providers/I18nProvider.tsx` reads `i18nextLng` from localStorage.
2. Language code is normalized by `normalizeI18nLang` in `frontend/src/utils/i18n.ts`.
3. i18n instance is created and injected through `I18nextProvider`.
4. Page-level language changes update both i18n runtime and `localStorage` in `frontend/src/app/page.tsx`.

**State Management:**
- Global client state uses Zustand with `persist` middleware (`localStorage` for auth/account/socket, `sessionStorage` for web3).
- Actions are colocated with store definitions, so store modules own both state and side effects.

## Key Abstractions

**Base API client abstraction:**
- Purpose: Shared HTTP behavior (base URL, JSON headers, auth interceptors, unified `ApiError`).
- Examples: `frontend/src/services/base-api.ts`, `frontend/src/services/api/auth.ts`, `frontend/src/services/api/user.ts`
- Pattern: Abstract class + per-domain subclasses.

**Store-as-feature-controller abstraction:**
- Purpose: Combine state container and async orchestration in one module.
- Examples: `frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`, `frontend/src/stores/auth.ts`
- Pattern: Zustand store with synchronous setters + async action methods.

**Provider-based integration boundary:**
- Purpose: Isolate framework/runtime integrations from leaf components.
- Examples: `frontend/src/providers/I18nProvider.tsx`, `frontend/src/providers/Web3Provider.tsx`
- Pattern: React context/provider wrapping app tree.

## Entry Points

**Root layout entry point:**
- Location: `frontend/src/app/layout.tsx`
- Triggers: Every route render.
- Responsibilities: Metadata, global CSS/script injection, i18n provider setup, toast container.

**Home route entry point:**
- Location: `frontend/src/app/page.tsx`
- Triggers: `/` route navigation.
- Responsibilities: Compose landing sections, manage language selection UI behavior, coordinate section-level rendering.

## Error Handling

**Strategy:** Infrastructure-level API error normalization; UI/domain-level handling is mostly deferred to callers.

**Patterns:**
- HTTP errors become `ApiError` in `frontend/src/services/base-api.ts`.
- Unauthorized handling hook exists (`handleUnauthorized`) but currently does not enforce redirect/session teardown.
- Runtime integration errors are logged with `console.error` in provider/store/component layers.

## Cross-Cutting Concerns

**Logging:** Ad-hoc `console.log`/`console.error`/`console.warn` in `frontend/src/components/layout/portfolio/*`, `frontend/src/stores/account.ts`, `frontend/src/providers/Web3Provider.tsx`, `frontend/src/services/base-api.ts`.
**Validation:** Minimal runtime validation; most inputs are passed through directly to API methods and form handlers.
**Authentication:** Token is persisted in `useAuthStore` (`frontend/src/stores/auth.ts`) and attached by API interceptor in `frontend/src/services/base-api.ts`.

## Layering Decisions And Trade-offs

- Next.js App Router is used, but most behavior is in client components (`"use client"` in route page and providers). This favors rapid interactive UI and web3 compatibility, while reducing SSR/SEO/data-fetching benefits.
- Service and state layers are separated, which keeps endpoint definitions reusable; however actions in stores still couple business flow tightly to transport models (`any` payload usage in several API/store methods).
- Bootstrap is used via static script injection (`frontend/src/app/layout.tsx`) plus direct `window.bootstrap` access in components (`frontend/src/components/layout/Header.tsx`, `frontend/src/components/common/Modal.tsx`), which reduces bundle wiring overhead but introduces imperative runtime coupling.

## Architecture Drift Signals

- `frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts` both initialize AppKit/network logic, indicating duplicated ownership of web3 bootstrap concerns.
- `frontend/src/utils/axios.ts` provides a second HTTP abstraction parallel to `frontend/src/services/base-api.ts`, signaling an incomplete migration to one API-client standard.
- `frontend/src/providers/AuthProvider.tsx` exists as a guard but is not wired in `frontend/src/app/layout.tsx`, so authentication boundary is defined but not consistently enforced.
- Repository intent appears split between exchange/dApp modules (`stores/account.ts`, `services/api/*`) and portfolio landing content (`components/layout/portfolio/*`), increasing risk of mixed domain responsibilities in one frontend.

---

*Architecture analysis: 2026-04-13*
