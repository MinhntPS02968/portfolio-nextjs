<!-- gsd-project-start source:PROJECT.md -->
## Project

**Frontend Developer Portfolio**

This project is a personal portfolio website for a Frontend Developer, focused on presenting profile, skills, and selected work in a visually strong way. The product direction prioritizes clean UI quality, smooth performance, and modern motion effects that support storytelling instead of distracting from content. The initial release is web-first and optimized for recruiter-facing review.

**Core Value:** A visitor can quickly understand the developer's strengths and projects through a fast, polished, and memorable browsing experience.

### Constraints

- **Tech stack**: Continue with existing Next.js + React + TypeScript stack — reduce migration risk.
- **Experience**: Animation must feel premium but not degrade runtime responsiveness — maintain speed as a first-class constraint.
- **Accessibility**: Visual neon effects must preserve readability and keyboard/accessibility basics — avoid style-over-usability regressions.
- **Content maintenance**: Portfolio data must remain easy to edit — future updates should not require deep refactors.
<!-- gsd-project-end -->

<!-- gsd-stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript (strict mode) - app code and config in `frontend/src/**/*` and `frontend/*.ts`.
- JavaScript (ESM/CJS configs + scripts) - tooling and process config in `frontend/eslint.config.mjs`, `frontend/prettier.config.mjs`, `frontend/ecosystem.config.js`.
- SCSS/CSS assets - styling pipeline and vendor CSS loaded via `frontend/src/app/layout.tsx`.
## Runtime
- Node.js runtime for Next.js app server/build (`frontend/package.json` scripts `dev`, `build`, `start`).
- Browser runtime for client-side features (`"use client"` usage in `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/socketio.ts`).
- Yarn (lockfile present at `yarn.lock`; install command in `frontend/install.bash`).
- Lockfile: present.
## Frameworks
- Next.js `16.2.2` - app framework and build/runtime (`frontend/package.json`, `frontend/next.config.ts`).
- React `19.2.4` + React DOM `19.2.4` - UI runtime (`frontend/package.json`).
- TypeScript `^5` - static typing (`frontend/package.json`, `frontend/tsconfig.json`).
- Not detected (no test runner config files found; no `*.test.*`/`*.spec.*` patterns detected in inspected scope).
- Next compiler/export mode (`output: "export"`) in `frontend/next.config.ts`.
- ESLint 9 + `eslint-config-next` in `frontend/eslint.config.mjs`.
- Prettier config in `frontend/prettier.config.mjs`.
- PM2 cluster process management (`instances: 2`) in `frontend/ecosystem.config.js`.
## Key Dependencies
- `axios` - HTTP transport foundation (`frontend/src/services/base-api.ts`, `frontend/src/utils/axios.ts`).
- `zustand` - shared client state and persisted stores (`frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`, `frontend/src/stores/web3.ts`).
- `@reown/appkit` + `@reown/appkit-adapter-ethers` + `ethers` - wallet connectivity and chain interaction (`frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/web3.ts`).
- `socket.io-client` + `socket.io-msgpack-parser` - real-time channel (`frontend/src/stores/socketio.ts`).
- `i18next` + `react-i18next` - localization subsystem (`frontend/src/utils/i18n.ts`, `frontend/src/providers/I18nProvider.tsx`).
- `sass` - SCSS compilation for global styles (`frontend/src/app/layout.tsx` imports `../../style/scss/style.scss`).
- `react-toastify`, `notiflix` - user notification layer (`frontend/src/app/layout.tsx`, `frontend/src/utils/toast.ts`).
## Configuration
- Public runtime config via `NEXT_PUBLIC_*` environment variables consumed across app (`frontend/src/app/layout.tsx`, `frontend/src/services/base-api.ts`, `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/socketio.ts`).
- Environment template file present: `frontend/.env.example` (not quoted; contains environment setup placeholders/sample values).
- `frontend/next.config.ts` controls export mode and image optimization flags.
- `frontend/tsconfig.json` configures strict TypeScript, bundler module resolution, and path aliases (`@/*`, `@/public/client/*`).
- `frontend/eslint.config.mjs` and `frontend/prettier.config.mjs` define lint/format policy.
## Platform Requirements
- Node.js + Yarn environment capable of running `yarn dev` and `yarn build` in `frontend/package.json`.
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
<!-- gsd-stack-end -->

<!-- gsd-conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components use `PascalCase` file names in `frontend/src/components/` (examples: `frontend/src/components/layout/Header.tsx`, `frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Hooks use `useX` camelCase names in `frontend/src/hooks/` (examples: `frontend/src/hooks/useLogout.ts`, `frontend/src/hooks/useClientOnly.ts`).
- Stores use lowercase nouns in `frontend/src/stores/` and export `useXStore` hooks (example: `frontend/src/stores/auth.ts`).
- Service modules are split by domain under `frontend/src/services/api/` with lowercase filenames (examples: `frontend/src/services/api/auth.ts`, `frontend/src/services/api/user.ts`).
- Utility modules use lowercase singular nouns in `frontend/src/utils/` (examples: `frontend/src/utils/i18n.ts`, `frontend/src/utils/cookie.ts`).
- Component functions are `PascalCase` and default-exported in page/component files (examples: `HomePage` in `frontend/src/app/page.tsx`, `Header` in `frontend/src/components/layout/Header.tsx`).
- Hook functions are `camelCase` with `use` prefix and named export (example: `useLogout` in `frontend/src/hooks/useLogout.ts`).
- Service methods use verb-based camelCase names (examples: `loginDApp`, `loginById` in `frontend/src/services/api/auth.ts`).
- Local variables use `camelCase` (examples: `activeSection` in `frontend/src/components/layout/Header.tsx`, `currentLang` in `frontend/src/app/page.tsx`).
- Constants use `UPPER_SNAKE_CASE` when globally significant (examples: `API_BASE_URL` in `frontend/src/services/base-api.ts`, `I18N_LANG_CODES` in `frontend/src/utils/i18n.ts`).
- Interfaces use `PascalCase` with optional `I` prefix for response types (examples: `AuthState` in `frontend/src/stores/auth.ts`, `IResponseCustom` in `frontend/src/utils/axios.ts`).
- Union and derived types use `PascalCase` aliases (example: `I18nLangCode` in `frontend/src/utils/i18n.ts`).
## Code Style
- Tool used: Prettier via `frontend/prettier.config.mjs`.
- Key settings from `frontend/prettier.config.mjs`:
- Practical rule for onboarding: keep 4-space indentation and avoid semicolons to match existing files such as `frontend/src/app/layout.tsx`.
- Tool used: ESLint flat config in `frontend/eslint.config.mjs`.
- Base presets: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Prettier compatibility is enabled via `prettier` extension in config.
- Important relaxed rules in `frontend/eslint.config.mjs`:
- Maintainability impact: the relaxed rules reduce noise during rapid iteration but allow dead code and weak typing to accumulate.
## Import Organization
- `@/*` -> `frontend/src/*` from `frontend/tsconfig.json`.
- `@/public/client/*` -> `frontend/public/client/*` from `frontend/tsconfig.json`.
## Error Handling
- API layer wraps transport errors into domain error objects (`ApiError`) in `frontend/src/services/base-api.ts`.
- User-action handlers often use local `try/catch` with console logging (example: `logout` in `frontend/src/hooks/useLogout.ts`).
- Promise wrappers in `frontend/src/utils/axios.ts` reject with `error.response?.data || error`; this yields inconsistent error shapes across call sites.
## Logging
- Debug logs are present in animation-heavy component code (`frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Warning/error logs are used around auth token retrieval and logout flow (`frontend/src/services/base-api.ts`, `frontend/src/hooks/useLogout.ts`).
- Recommendation for new code in this repo: keep debug logs behind environment checks to avoid noisy production output.
## Comments
- Comments are used to explain intent for browser/Bootstrap behavior and animation timeline sequencing (examples in `frontend/src/components/layout/Header.tsx` and `frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Existing comments are bilingual; for consistency with the repo trend, keep comments concise and focused on intent, not line-by-line narration.
- Selective usage in utility/domain modules (`frontend/src/utils/i18n.ts`).
- Not consistently applied across components and services.
## Function Design
- Small utility/service methods are concise (example: `loginDApp` in `frontend/src/services/api/auth.ts`).
- UI sections can become large and multi-responsibility (example: `frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Service methods pass explicit arguments for API payload fields.
- Utility wrappers often use permissive `any` parameters (`frontend/src/utils/axios.ts`, `frontend/src/services/base-api.ts`).
- Service layer generally returns typed promises (`Promise<T>`) in `frontend/src/services/base-api.ts`.
- Legacy wrappers return broad custom response interfaces with optional fields (`IResponseCustom` in `frontend/src/utils/axios.ts`).
## Module Design
- Component files usually default-export a primary component.
- Hooks/services/stores commonly use named exports and may also expose singleton instances (example: `authApi` in `frontend/src/services/api/auth.ts`).
- Barrel exports are used in local component groups (`frontend/src/components/layout/index.ts`).
- Pattern is limited; most folders are imported directly by path.
## Maintainability Hotspots
- `frontend/src/components/layout/portfolio/HeroSection.tsx`: combines rendering, animation orchestration, and debug logging in one file; split animation setup into dedicated hook/module when extending behavior.
- `frontend/src/components/layout/Header.tsx`: mixes navigation rendering, scrollspy observer logic, and Bootstrap offcanvas lifecycle; isolate DOM/bootstrap bridge logic to improve testability.
- `frontend/src/services/base-api.ts` and `frontend/src/utils/axios.ts`: parallel API abstractions coexist, producing inconsistent error and typing patterns; prefer one unified client abstraction for new features.
- `frontend/eslint.config.mjs`: disabled unused/any rules permit entropy; new modules should still avoid `any` and prune unused bindings manually.
- `frontend/src/providers/AuthProvider.tsx`: redirect side effect relies on client mount + store state and can hide route-level auth boundaries; document auth guard strategy before adding protected pages.
<!-- gsd-conventions-end -->

<!-- gsd-architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Static deployment model via `output: "export"` in `frontend/next.config.ts`, with runtime behavior shifted to browser-side logic.
- Composition root in `frontend/src/app/layout.tsx` and `frontend/src/app/page.tsx`, where top-level UI and providers are assembled.
- Shared infrastructure split into `frontend/src/services`, `frontend/src/stores`, `frontend/src/providers`, and `frontend/src/utils`.
- Bootstrap JS and CSS are loaded as external static assets (`/client/js/*`, `/client/css/*`) instead of module imports.
## System Boundaries
- UI rendering and interaction in `frontend/src/app` and `frontend/src/components`.
- Local state persistence/session in Zustand stores under `frontend/src/stores`.
- API orchestration to backend endpoints via Axios clients under `frontend/src/services`.
- Wallet and chain runtime integration in `frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts`.
- HTTP API server behind `NEXT_PUBLIC_API_URL` consumed from `frontend/src/services/base-api.ts`.
- Socket.IO server behind `NEXT_PUBLIC_SOCKET_URL` consumed from `frontend/src/stores/socketio.ts`.
- Blockchain RPC endpoints and wallet providers configured in `frontend/src/providers/Web3Provider.tsx`.
## Layers
- Purpose: Define document shell, metadata, global resources, and root route composition.
- Location: `frontend/src/app/layout.tsx`, `frontend/src/app/page.tsx`
- Contains: Next.js root layout, page composition, global scripts/styles, section assembly.
- Depends on: Providers, layout components, utility i18n helpers.
- Used by: Next.js App Router runtime.
- Purpose: Render reusable and page-specific UI blocks.
- Location: `frontend/src/components/layout`, `frontend/src/components/layout/portfolio`, `frontend/src/components/common`
- Contains: Header/nav, portfolio sections, modal abstraction, decorative components.
- Depends on: React hooks, Bootstrap classes, GSAP animation hooks, app utilities.
- Used by: Route components in `frontend/src/app`.
- Purpose: Bridge external contexts (i18n, auth guard, web3) to React tree.
- Location: `frontend/src/providers`
- Contains: `I18nProvider`, `AuthProvider`, `Web3Provider`.
- Depends on: Zustand stores, Web3 SDK hooks, i18n utility functions.
- Used by: Root layout and feature components requiring context.
- Purpose: Centralize client state and side-effectful actions.
- Location: `frontend/src/stores`
- Contains: Auth/account/web3/socket stores with persistence middleware.
- Depends on: API clients, browser storage, socket/web3 libraries.
- Used by: Providers, hooks, and view components.
- Purpose: Standardize HTTP access and endpoint-specific client methods.
- Location: `frontend/src/services/base-api.ts`, `frontend/src/services/api/*`
- Contains: Axios base client, auth token attachment, endpoint wrappers.
- Depends on: Zustand auth state, Axios, environment variables.
- Used by: Stores and potential feature hooks/components.
- Purpose: Stateless/shared helpers for i18n, storage, cookies, notifications, formatting.
- Location: `frontend/src/utils`
- Contains: i18n bootstrap, cookie/localStorage adapters, toast/loading/confirm wrappers.
- Depends on: browser APIs and small utility libs.
- Used by: Multiple upper layers.
## Data Flow
- Global client state uses Zustand with `persist` middleware (`localStorage` for auth/account/socket, `sessionStorage` for web3).
- Actions are colocated with store definitions, so store modules own both state and side effects.
## Key Abstractions
- Purpose: Shared HTTP behavior (base URL, JSON headers, auth interceptors, unified `ApiError`).
- Examples: `frontend/src/services/base-api.ts`, `frontend/src/services/api/auth.ts`, `frontend/src/services/api/user.ts`
- Pattern: Abstract class + per-domain subclasses.
- Purpose: Combine state container and async orchestration in one module.
- Examples: `frontend/src/stores/account.ts`, `frontend/src/stores/socketio.ts`, `frontend/src/stores/auth.ts`
- Pattern: Zustand store with synchronous setters + async action methods.
- Purpose: Isolate framework/runtime integrations from leaf components.
- Examples: `frontend/src/providers/I18nProvider.tsx`, `frontend/src/providers/Web3Provider.tsx`
- Pattern: React context/provider wrapping app tree.
## Entry Points
- Location: `frontend/src/app/layout.tsx`
- Triggers: Every route render.
- Responsibilities: Metadata, global CSS/script injection, i18n provider setup, toast container.
- Location: `frontend/src/app/page.tsx`
- Triggers: `/` route navigation.
- Responsibilities: Compose landing sections, manage language selection UI behavior, coordinate section-level rendering.
## Error Handling
- HTTP errors become `ApiError` in `frontend/src/services/base-api.ts`.
- Unauthorized handling hook exists (`handleUnauthorized`) but currently does not enforce redirect/session teardown.
- Runtime integration errors are logged with `console.error` in provider/store/component layers.
## Cross-Cutting Concerns
## Layering Decisions And Trade-offs
- Next.js App Router is used, but most behavior is in client components (`"use client"` in route page and providers). This favors rapid interactive UI and web3 compatibility, while reducing SSR/SEO/data-fetching benefits.
- Service and state layers are separated, which keeps endpoint definitions reusable; however actions in stores still couple business flow tightly to transport models (`any` payload usage in several API/store methods).
- Bootstrap is used via static script injection (`frontend/src/app/layout.tsx`) plus direct `window.bootstrap` access in components (`frontend/src/components/layout/Header.tsx`, `frontend/src/components/common/Modal.tsx`), which reduces bundle wiring overhead but introduces imperative runtime coupling.
## Architecture Drift Signals
- `frontend/src/providers/Web3Provider.tsx` and `frontend/src/stores/web3.ts` both initialize AppKit/network logic, indicating duplicated ownership of web3 bootstrap concerns.
- `frontend/src/utils/axios.ts` provides a second HTTP abstraction parallel to `frontend/src/services/base-api.ts`, signaling an incomplete migration to one API-client standard.
- `frontend/src/providers/AuthProvider.tsx` exists as a guard but is not wired in `frontend/src/app/layout.tsx`, so authentication boundary is defined but not consistently enforced.
- Repository intent appears split between exchange/dApp modules (`stores/account.ts`, `services/api/*`) and portfolio landing content (`components/layout/portfolio/*`), increasing risk of mixed domain responsibilities in one frontend.
<!-- gsd-architecture-end -->

<!-- gsd-skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| figma-html | > Implements responsive HTML/CSS from Figma or from a provided website URL using Bootstrap 5, SCSS modules, and strict naming/asset conventions. The skill splits into (1) Figma-to-HTML workflow, (2) website-URL clone/rebuild workflow, and (3) platform code style & tech — read the relevant docs below. In this repository, images live under src/public/images; adjust per project. | `.agents/skills/figma-html/SKILL.md` |
<!-- gsd-skills-end -->

<!-- gsd-workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- gsd-workflow-end -->



<!-- gsd-profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- gsd-profile-end -->
