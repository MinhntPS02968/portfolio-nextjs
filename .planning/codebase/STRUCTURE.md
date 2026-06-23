# Codebase Structure

**Analysis Date:** 2026-04-13

## Directory Layout

```text
portfolio-nextjs/
├── frontend/                   # Next.js application workspace
│   ├── public/                 # Static runtime assets (vendor css/js, images, flags)
│   ├── src/                    # Application source code
│   │   ├── app/                # App Router entry files (`layout.tsx`, `page.tsx`)
│   │   ├── components/         # UI components (layout, portfolio sections, common primitives)
│   │   ├── hooks/              # Reusable React hooks for client behavior
│   │   ├── locales/            # i18n dictionaries per language code
│   │   ├── providers/          # Top-level context providers/integration adapters
│   │   ├── services/           # HTTP client base and endpoint wrappers
│   │   ├── stores/             # Zustand state containers and side-effect actions
│   │   └── utils/              # Shared helper modules
│   ├── style/                  # SCSS source (tokens, breakpoints, portfolio styles)
│   ├── next.config.ts          # Next runtime/build behavior
│   ├── tsconfig.json           # TypeScript compiler and path aliases
│   ├── eslint.config.mjs       # Linting configuration
│   └── package.json            # Scripts and dependencies
├── .planning/codebase/         # Generated architecture/codebase mapping docs
└── PROJECT_ARCHITECTURE.md     # Human-authored architecture notes
```

## Directory Purposes And Ownership

**`frontend/src/app`:**
- Purpose: Route-level composition and HTML shell control.
- Contains: `layout.tsx`, `page.tsx`.
- Key files: `frontend/src/app/layout.tsx`, `frontend/src/app/page.tsx`.
- Ownership guideline: Keep this layer thin; it should compose providers/components, not contain heavy API or store logic.

**`frontend/src/components/layout`:**
- Purpose: Navigation/chrome and page section building blocks.
- Contains: `Header`, `Preloader`, `StreakCanvas`, portfolio sections under `portfolio/`.
- Key files: `frontend/src/components/layout/Header.tsx`, `frontend/src/components/layout/portfolio/HeroSection.tsx`.
- Ownership guideline: UI rendering, local animation orchestration, section-scoped interactions only.

**`frontend/src/components/common`:**
- Purpose: Reusable cross-feature UI primitives.
- Contains: Generic `Modal`, `Pagination`.
- Key files: `frontend/src/components/common/Modal.tsx`.
- Ownership guideline: Keep generic and domain-agnostic; do not embed business endpoint logic.

**`frontend/src/providers`:**
- Purpose: Cross-cutting runtime adapters for i18n/auth/web3.
- Contains: `I18nProvider`, `AuthProvider`, `Web3Provider`.
- Key files: `frontend/src/providers/I18nProvider.tsx`, `frontend/src/providers/Web3Provider.tsx`.
- Ownership guideline: Centralize external context setup and wiring here.

**`frontend/src/stores`:**
- Purpose: Persistent client state and async orchestration actions.
- Contains: Auth/account/web3/socket Zustand stores.
- Key files: `frontend/src/stores/auth.ts`, `frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`, `frontend/src/stores/web3.ts`.
- Ownership guideline: State transitions and side effects belong here; UI should consume selectors/actions only.

**`frontend/src/services`:**
- Purpose: Transport layer boundaries for backend APIs.
- Contains: `base-api.ts` plus endpoint-specific clients under `api/`.
- Key files: `frontend/src/services/base-api.ts`, `frontend/src/services/api/user.ts`, `frontend/src/services/api/swap.ts`.
- Ownership guideline: Keep request semantics and endpoint contracts here; avoid direct axios calls in components.

**`frontend/src/utils`:**
- Purpose: Stateless utility logic and browser adapters.
- Contains: i18n normalization, storage wrappers, notification wrappers, misc helpers.
- Key files: `frontend/src/utils/i18n.ts`, `frontend/src/utils/storage.ts`, `frontend/src/utils/axios.ts`.
- Ownership guideline: Shared helpers only; avoid creating alternate architectural layers that duplicate `services`.

**`frontend/style/scss`:**
- Purpose: SCSS entry and design primitives.
- Contains: `style.scss`, `portfolio.scss`, `variables.scss`, `breakpoint.scss`.
- Key files: `frontend/style/scss/style.scss`.
- Ownership guideline: Global styling tokens/layout primitives; component markup in `src/components` must consume class contracts from here.

## Key File Locations

**Entry Points:**
- `frontend/src/app/layout.tsx`: Global HTML shell, providers, vendor CSS/JS scripts.
- `frontend/src/app/page.tsx`: Home route composition and top-level language behavior.

**Configuration:**
- `frontend/next.config.ts`: Static export mode and image/compiler switches.
- `frontend/tsconfig.json`: `@/*` aliasing and compiler strictness.
- `frontend/eslint.config.mjs`: Lint extensions and disabled rule set.

**Core Logic:**
- `frontend/src/services/base-api.ts`: Common API client and error strategy.
- `frontend/src/stores/account.ts`: Account domain state + API side effects.
- `frontend/src/providers/Web3Provider.tsx`: Wallet/network orchestration boundary.

**Testing:**
- Not detected: no `*.test.*` or `*.spec.*` files under `frontend/src` in current repository snapshot.

## Naming Conventions

**Files:**
- React components and providers use PascalCase filenames (for example `Header.tsx`, `Web3Provider.tsx`).
- State/services/hooks/utils use lowercase or camel-like file names (for example `auth.ts`, `base-api.ts`, `useLogout.ts`).

**Directories:**
- Top-level source folders are lowercase plural by concern (`components`, `stores`, `services`, `providers`, `utils`).
- Feature-specific subdirectories exist under shared concerns (`components/layout/portfolio`, `services/api`).

## Layering Decisions Actually Present

- Route layer imports presentation and utilities directly (`frontend/src/app/page.tsx`), with no explicit domain/application service layer in between.
- Stores call API clients directly (`frontend/src/stores/account.ts` -> `frontend/src/services/api/user.ts`), making stores the effective application orchestration layer.
- Providers bridge external runtimes into component tree (`frontend/src/providers/Web3Provider.tsx`, `frontend/src/providers/I18nProvider.tsx`).
- UI layer directly touches browser globals for Bootstrap behaviors (`window.bootstrap`) in `frontend/src/components/layout/Header.tsx` and `frontend/src/components/common/Modal.tsx`.

## Major Module Map

**Landing Portfolio Module:**
- Paths: `frontend/src/components/layout/portfolio/*`, `frontend/src/components/layout/Header.tsx`, `frontend/style/scss/portfolio.scss`.
- Responsibilities: Main section rendering and GSAP animation pipelines.

**Auth And Session Module:**
- Paths: `frontend/src/stores/auth.ts`, `frontend/src/providers/AuthProvider.tsx`, `frontend/src/hooks/useLogout.ts`.
- Responsibilities: Token persistence, logout reset, route-guard intent.

**Account/Trading Data Module:**
- Paths: `frontend/src/stores/account.ts`, `frontend/src/services/api/user.ts`, `frontend/src/services/api/package.ts`, `frontend/src/services/api/stake.ts`, `frontend/src/services/api/vip.ts`, `frontend/src/services/api/swap.ts`.
- Responsibilities: User/account/balance/referral/vip/swap endpoint access and state hydration.

**Web3 Connectivity Module:**
- Paths: `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/web3.ts`.
- Responsibilities: Wallet modal setup, signer/provider resolution, chain synchronization, web3 state persistence.

**Realtime Socket Module:**
- Paths: `frontend/src/stores/socketio.ts`.
- Responsibilities: Socket connection bootstrap with token auth and reconnect room join.

## Data And Control Flow Pointers

**UI to API flow:**
- User action/component effect -> store action in `frontend/src/stores/*` -> API client call in `frontend/src/services/api/*` -> interceptor in `frontend/src/services/base-api.ts` -> state update in store -> UI rerender.

**Global startup flow:**
- Next runtime -> `frontend/src/app/layout.tsx` -> provider bootstrapping (`I18nProvider`) and script injection -> `frontend/src/app/page.tsx` -> section components.

**Web3 control flow:**
- Provider-level AppKit hooks in `frontend/src/providers/Web3Provider.tsx` -> wallet state persisted into `frontend/src/stores/web3.ts` -> components/hooks consume context/store.

## Where To Add New Code

**New Route-level feature section (homepage):**
- Primary code: `frontend/src/components/layout/portfolio/`.
- Route composition point: `frontend/src/app/page.tsx`.

**New shared UI primitive:**
- Implementation: `frontend/src/components/common/`.
- Usage wiring: importing route/component files under `frontend/src/components/layout` or `frontend/src/app`.

**New backend endpoint integration:**
- Client class method: `frontend/src/services/api/<domain>.ts`.
- Shared request behavior: keep in `frontend/src/services/base-api.ts`.
- State orchestration: call from corresponding store in `frontend/src/stores/<domain>.ts`.

**New reusable hook/helper:**
- Hooks: `frontend/src/hooks/`.
- Stateless helpers/adapters: `frontend/src/utils/`.

## Special Directories

**`frontend/public/client`:**
- Purpose: Vendor/static files (Bootstrap assets, flags, scripts).
- Generated: No.
- Committed: Yes.

**`frontend/.next`:**
- Purpose: Next.js build artifacts.
- Generated: Yes.
- Committed: No (tooling output).

**`.planning/codebase`:**
- Purpose: Machine-consumable codebase mapping docs for planning/execution workflows.
- Generated: Yes.
- Committed: Yes (project planning artifact).

## Notable Trade-offs And Drift Signals

- Coexistence of portfolio-presentational code and exchange/web3 business data flows in one app root (`frontend/src/app/page.tsx` + `frontend/src/stores/account.ts`) raises domain-boundary ambiguity.
- Dual web3 setup points (`frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts`) indicate ownership overlap and potential configuration divergence over time.
- Dual HTTP abstractions (`frontend/src/services/base-api.ts` and `frontend/src/utils/axios.ts`) signal layering drift away from a single transport standard.
- Authentication guard ownership is present but inactive in route composition (`frontend/src/providers/AuthProvider.tsx` not mounted in `frontend/src/app/layout.tsx`), leaving intended control flow partially disconnected.

---

*Structure analysis: 2026-04-13*
