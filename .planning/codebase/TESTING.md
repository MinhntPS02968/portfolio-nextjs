# Testing Patterns

**Analysis Date:** 2026-04-13

## Test Framework

**Runner:**
- Not detected in current repository state (`frontend/package.json` has no `test` script and no `jest`/`vitest` dependencies).
- Config: Not detected (`jest.config.*`, `vitest.config.*`, `playwright.config.*`, `cypress.config.*` not present in workspace scan).

**Assertion Library:**
- Not detected.

**Run Commands:**
```bash
yarn lint              # Current quality gate available in `frontend/package.json`
# Not configured: run all tests
# Not configured: watch mode
# Not configured: coverage
```

## Test File Organization

**Location:**
- No test files detected for `frontend/src/` (`*.test.*` / `*.spec.*` patterns not present).

**Naming:**
- Not applicable in current state.

**Structure:**
```text
Not detected: no dedicated test directories or co-located test files in `frontend/src/`.
```

## Test Structure

**Suite Organization:**
```typescript
// Not detected in repository.
// Recommended baseline for this codebase:
describe('AuthApi', () => {
    it('wraps API errors as ApiError', async () => {
        // target: `frontend/src/services/base-api.ts`
    })
})
```

**Patterns:**
- Setup pattern: Not detected.
- Teardown pattern: Not detected.
- Assertion pattern: Not detected.

## Mocking

**Framework:** Not detected.

**Patterns:**
```typescript
// Not detected in repository.
// Recommended first mocks for this architecture:
// - mock axios transport in `frontend/src/services/base-api.ts`
// - mock zustand selectors from `frontend/src/stores/auth.ts`
// - mock browser APIs (localStorage/sessionStorage/window.location) used in `frontend/src/hooks/useLogout.ts`
```

**What to Mock:**
- HTTP boundary (`axios`) in `frontend/src/services/base-api.ts` and `frontend/src/utils/axios.ts`.
- Browser storage and redirect side effects in `frontend/src/hooks/useLogout.ts` and `frontend/src/providers/AuthProvider.tsx`.
- Third-party wallet disconnect call from `@reown/appkit/react` in `frontend/src/hooks/useLogout.ts`.

**What NOT to Mock:**
- Pure transformation logic in `frontend/src/utils/i18n.ts` (`normalizeI18nLang`).
- Zustand store transition behavior in `frontend/src/stores/auth.ts` when validating state updates.

## Fixtures and Factories

**Test Data:**
```typescript
// Not detected in repository.
// Recommended fixture candidates:
const validLangCodes = ['gb', 'vn', 'kr', 'jp', 'cn', 'fr'] // `frontend/src/utils/i18n.ts`
const authState = { isAuthenticated: false, token: null }   // `frontend/src/stores/auth.ts`
```

**Location:**
- Not detected. Recommended path when introducing tests: `frontend/src/test/fixtures/` for shared fixtures, or co-locate near feature modules.

## Coverage

**Requirements:** None enforced (no coverage tooling or CI coverage gate detected).

**View Coverage:**
```bash
# Not configured yet.
# Add a test runner first, then expose `yarn test:coverage`.
```

## Test Types

**Unit Tests:**
- Not present currently.
- Highest-value initial unit targets:
  - `frontend/src/utils/i18n.ts` language normalization mapping.
  - `frontend/src/stores/auth.ts` state transition and persist reset behavior.
  - `frontend/src/services/api/auth.ts` request payload contract for login methods.

**Integration Tests:**
- Not present currently.
- Highest-value initial integration targets:
  - API client interceptors in `frontend/src/services/base-api.ts` (auth header + error wrapping).
  - Auth/logout side-effects across `frontend/src/hooks/useLogout.ts`, `frontend/src/stores/auth.ts`, and `frontend/src/stores/account.ts`.

**E2E Tests:**
- Not used (no Playwright/Cypress setup detected).
- Recommended first E2E flow for onboarding confidence: landing page render + navigation interaction in `frontend/src/app/page.tsx` and `frontend/src/components/layout/Header.tsx`.

## Common Patterns

**Async Testing:**
```typescript
// Pattern needed for this codebase's async APIs/hooks:
await expect(api.loginById('123')).rejects.toMatchObject({ status: 401 })
// target behavior from `frontend/src/services/base-api.ts`
```

**Error Testing:**
```typescript
// Pattern needed for error normalization:
try {
    await api.loginDApp('bad-signature')
} catch (error) {
    expect(error).toBeInstanceOf(ApiError) // from `frontend/src/services/base-api.ts`
}
```

## Coverage Gaps and Maintainability Hotspots

- `frontend/src/components/layout/portfolio/HeroSection.tsx`: animation timeline and DOM selectors are untested; regressions likely during UI iteration.
- `frontend/src/components/layout/Header.tsx`: IntersectionObserver + Bootstrap offcanvas behavior has no safety net; mobile navigation regressions are easy to introduce.
- `frontend/src/providers/AuthProvider.tsx`: redirect logic depends on runtime state with no route-guard tests; authentication flow can break silently.
- `frontend/src/services/base-api.ts`: interceptor contract (token injection, 401 handling, `ApiError`) is central but unverified.
- `frontend/src/utils/axios.ts` vs `frontend/src/services/base-api.ts`: duplicated API-layer behavior increases divergence risk without characterization tests.

## Practical Rollout Plan (Onboarding Order)

- Phase 1: add test runner + basic config in `frontend/` and expose `yarn test`.
- Phase 2: lock unit tests for pure modules (`frontend/src/utils/i18n.ts`, `frontend/src/stores/auth.ts`).
- Phase 3: add integration tests for API + auth side effects (`frontend/src/services/base-api.ts`, `frontend/src/hooks/useLogout.ts`).
- Phase 4: add one smoke E2E for homepage navigation (`frontend/src/app/page.tsx`, `frontend/src/components/layout/Header.tsx`).

---

*Testing analysis: 2026-04-13*
