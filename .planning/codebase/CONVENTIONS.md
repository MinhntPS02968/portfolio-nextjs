# Coding Conventions

**Analysis Date:** 2026-04-13

## Naming Patterns

**Files:**
- React components use `PascalCase` file names in `frontend/src/components/` (examples: `frontend/src/components/layout/Header.tsx`, `frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Hooks use `useX` camelCase names in `frontend/src/hooks/` (examples: `frontend/src/hooks/useLogout.ts`, `frontend/src/hooks/useClientOnly.ts`).
- Stores use lowercase nouns in `frontend/src/stores/` and export `useXStore` hooks (example: `frontend/src/stores/auth.ts`).
- Service modules are split by domain under `frontend/src/services/api/` with lowercase filenames (examples: `frontend/src/services/api/auth.ts`, `frontend/src/services/api/user.ts`).
- Utility modules use lowercase singular nouns in `frontend/src/utils/` (examples: `frontend/src/utils/i18n.ts`, `frontend/src/utils/cookie.ts`).

**Functions:**
- Component functions are `PascalCase` and default-exported in page/component files (examples: `HomePage` in `frontend/src/app/page.tsx`, `Header` in `frontend/src/components/layout/Header.tsx`).
- Hook functions are `camelCase` with `use` prefix and named export (example: `useLogout` in `frontend/src/hooks/useLogout.ts`).
- Service methods use verb-based camelCase names (examples: `loginDApp`, `loginById` in `frontend/src/services/api/auth.ts`).

**Variables:**
- Local variables use `camelCase` (examples: `activeSection` in `frontend/src/components/layout/Header.tsx`, `currentLang` in `frontend/src/app/page.tsx`).
- Constants use `UPPER_SNAKE_CASE` when globally significant (examples: `API_BASE_URL` in `frontend/src/services/base-api.ts`, `I18N_LANG_CODES` in `frontend/src/utils/i18n.ts`).

**Types:**
- Interfaces use `PascalCase` with optional `I` prefix for response types (examples: `AuthState` in `frontend/src/stores/auth.ts`, `IResponseCustom` in `frontend/src/utils/axios.ts`).
- Union and derived types use `PascalCase` aliases (example: `I18nLangCode` in `frontend/src/utils/i18n.ts`).

## Code Style

**Formatting:**
- Tool used: Prettier via `frontend/prettier.config.mjs`.
- Key settings from `frontend/prettier.config.mjs`:
  - `tabWidth: 4`
  - `semi: false`
  - `singleQuote: true`
  - `trailingComma: "es5"`
- Practical rule for onboarding: keep 4-space indentation and avoid semicolons to match existing files such as `frontend/src/app/layout.tsx`.

**Linting:**
- Tool used: ESLint flat config in `frontend/eslint.config.mjs`.
- Base presets: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Prettier compatibility is enabled via `prettier` extension in config.
- Important relaxed rules in `frontend/eslint.config.mjs`:
  - `no-unused-vars: off`
  - `@typescript-eslint/no-unused-vars: off`
  - `@typescript-eslint/no-explicit-any: off`
- Maintainability impact: the relaxed rules reduce noise during rapid iteration but allow dead code and weak typing to accumulate.

## Import Organization

**Order:**
1. Framework/library imports (`react`, `next/*`, third-party packages) as seen in `frontend/src/app/page.tsx` and `frontend/src/components/layout/portfolio/HeroSection.tsx`.
2. Internal alias imports from `@/` (components, utils, stores, providers) as seen in `frontend/src/app/layout.tsx`.
3. Relative imports mainly in service-layer sibling references (example: `frontend/src/services/api/auth.ts` imports from `../base-api`).

**Path Aliases:**
- `@/*` -> `frontend/src/*` from `frontend/tsconfig.json`.
- `@/public/client/*` -> `frontend/public/client/*` from `frontend/tsconfig.json`.

## Error Handling

**Patterns:**
- API layer wraps transport errors into domain error objects (`ApiError`) in `frontend/src/services/base-api.ts`.
- User-action handlers often use local `try/catch` with console logging (example: `logout` in `frontend/src/hooks/useLogout.ts`).
- Promise wrappers in `frontend/src/utils/axios.ts` reject with `error.response?.data || error`; this yields inconsistent error shapes across call sites.

## Logging

**Framework:** `console` APIs (`console.log`, `console.warn`, `console.error`).

**Patterns:**
- Debug logs are present in animation-heavy component code (`frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Warning/error logs are used around auth token retrieval and logout flow (`frontend/src/services/base-api.ts`, `frontend/src/hooks/useLogout.ts`).
- Recommendation for new code in this repo: keep debug logs behind environment checks to avoid noisy production output.

## Comments

**When to Comment:**
- Comments are used to explain intent for browser/Bootstrap behavior and animation timeline sequencing (examples in `frontend/src/components/layout/Header.tsx` and `frontend/src/components/layout/portfolio/HeroSection.tsx`).
- Existing comments are bilingual; for consistency with the repo trend, keep comments concise and focused on intent, not line-by-line narration.

**JSDoc/TSDoc:**
- Selective usage in utility/domain modules (`frontend/src/utils/i18n.ts`).
- Not consistently applied across components and services.

## Function Design

**Size:** 
- Small utility/service methods are concise (example: `loginDApp` in `frontend/src/services/api/auth.ts`).
- UI sections can become large and multi-responsibility (example: `frontend/src/components/layout/portfolio/HeroSection.tsx`).

**Parameters:** 
- Service methods pass explicit arguments for API payload fields.
- Utility wrappers often use permissive `any` parameters (`frontend/src/utils/axios.ts`, `frontend/src/services/base-api.ts`).

**Return Values:** 
- Service layer generally returns typed promises (`Promise<T>`) in `frontend/src/services/base-api.ts`.
- Legacy wrappers return broad custom response interfaces with optional fields (`IResponseCustom` in `frontend/src/utils/axios.ts`).

## Module Design

**Exports:**
- Component files usually default-export a primary component.
- Hooks/services/stores commonly use named exports and may also expose singleton instances (example: `authApi` in `frontend/src/services/api/auth.ts`).

**Barrel Files:**
- Barrel exports are used in local component groups (`frontend/src/components/layout/index.ts`).
- Pattern is limited; most folders are imported directly by path.

## Maintainability Hotspots

- `frontend/src/components/layout/portfolio/HeroSection.tsx`: combines rendering, animation orchestration, and debug logging in one file; split animation setup into dedicated hook/module when extending behavior.
- `frontend/src/components/layout/Header.tsx`: mixes navigation rendering, scrollspy observer logic, and Bootstrap offcanvas lifecycle; isolate DOM/bootstrap bridge logic to improve testability.
- `frontend/src/services/base-api.ts` and `frontend/src/utils/axios.ts`: parallel API abstractions coexist, producing inconsistent error and typing patterns; prefer one unified client abstraction for new features.
- `frontend/eslint.config.mjs`: disabled unused/any rules permit entropy; new modules should still avoid `any` and prune unused bindings manually.
- `frontend/src/providers/AuthProvider.tsx`: redirect side effect relies on client mount + store state and can hide route-level auth boundaries; document auth guard strategy before adding protected pages.

---

*Convention analysis: 2026-04-13*
