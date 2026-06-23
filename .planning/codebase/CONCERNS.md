# Codebase Concerns

**Analysis Date:** 2026-04-13

## Tech Debt

**HTTP client layer duplication (`BaseApiClient` vs `utils/axios`):**
- Issue: Two API abstractions coexist with different error/timeout/auth behavior, which creates inconsistent runtime behavior per endpoint.
- Files: `frontend/src/services/base-api.ts`, `frontend/src/utils/axios.ts`, `frontend/src/services/api/*.ts`
- Impact: Different failure modes and token handling make incidents hard to diagnose and can cause partial auth breakage.
- Fix approach: Standardize on one API client module, then migrate endpoint files incrementally with compatibility tests for auth/error flows.

**Web3 initialization duplicated in two places:**
- Issue: Wallet/network setup logic exists in both provider and store and can diverge over time.
- Files: `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/web3.ts`
- Impact: Chain selection and provider behavior can drift, causing intermittent wallet/network mismatch bugs.
- Fix approach: Keep all Web3 bootstrap config in one shared module consumed by both provider and store.

**Low type safety in critical API/store boundaries:**
- Issue: Extensive `any` use in API DTOs/responses and store actions weakens compile-time guarantees.
- Files: `frontend/src/services/api/user.ts`, `frontend/src/stores/account.ts`, `frontend/src/utils/axios.ts`, `frontend/src/services/base-api.ts`
- Impact: Backend contract changes can silently ship to production and fail only at runtime.
- Fix approach: Add typed API response schemas/interfaces for auth/user/vip paths and remove `any` from store actions.

## Known Bugs

**401 unauthorized handling is effectively disabled:**
- Symptoms: Expired/invalid token errors are thrown but no forced logout/session cleanup is performed.
- Files: `frontend/src/services/base-api.ts`
- Trigger: Any API response with status `401`.
- Workaround: Manual user logout via `useLogout` flow.

**Auth state can be marked true even with null token:**
- Symptoms: `isAuthenticated` becomes true when `setToken(null)` is called.
- Files: `frontend/src/stores/auth.ts`
- Trigger: Any caller sets token to null through store action.
- Workaround: Ensure all callers avoid `setToken(null)` and call `reset()` instead.

## Security Considerations

**TLS certificate verification disabled in API client (high risk):**
- Risk: Man-in-the-middle attacks become possible because HTTPS certificate validation is bypassed.
- Files: `frontend/src/services/base-api.ts`
- Current mitigation: None detected.
- Recommendations: Remove `https.Agent({ rejectUnauthorized: false })`; use environment-specific trust setup for local development only.

**Auth tokens stored in browser-accessible storage/cookies:**
- Risk: XSS can exfiltrate bearer tokens from `localStorage`/cookie APIs.
- Files: `frontend/src/stores/auth.ts`, `frontend/src/utils/storage.ts`, `frontend/src/utils/axios.ts`
- Current mitigation: None visible in frontend code (no HttpOnly cookie strategy in client layer).
- Recommendations: Move session token to secure HttpOnly cookie managed server-side; apply strict CSP and sanitize all dynamic rendering paths.

**Use of public env vars as runtime trust source without validation:**
- Risk: Missing/malformed `NEXT_PUBLIC_*` values can create insecure or undefined behavior (empty URL sockets, wrong wallet metadata, wrong API target).
- Files: `frontend/src/stores/socketio.ts`, `frontend/src/providers/Web3Provider.tsx`, `frontend/src/utils/axios.ts`, `frontend/src/services/base-api.ts`
- Current mitigation: Fallback strings exist, but no hard validation.
- Recommendations: Add startup config validation and fail fast when required runtime vars are absent.

## Performance Bottlenecks

**Potential event-listener leak in reusable modal component:**
- Problem: Event listeners are attached with named handlers but removed with anonymous no-op callbacks, so cleanup does not detach original listeners.
- Files: `frontend/src/components/common/Modal.tsx`
- Cause: `removeEventListener(..., () => {})` does not match previously registered references.
- Improvement path: Store handler refs in `useRef` and remove exact same callback references on cleanup.

**Verbose console logging in animation paths and production bundles:**
- Problem: Repeated logs in animation lifecycle and API/store logic increase runtime overhead and noise.
- Files: `frontend/src/components/layout/portfolio/HeroSection.tsx`, `frontend/src/components/layout/portfolio/SkillsSection.tsx`, `frontend/src/components/layout/portfolio/ProjectsSection.tsx`, `frontend/src/components/layout/portfolio/ContactSection.tsx`, `frontend/src/stores/account.ts`
- Cause: Debug logs left in frequently executed paths.
- Improvement path: Gate logs behind dedicated debug utility and strip in production consistently.

**Aggressive storage clears on logout:**
- Problem: `localStorage.clear()` and `sessionStorage.clear()` wipe all keys, including unrelated app/runtime entries.
- Files: `frontend/src/hooks/useLogout.ts`
- Cause: Global clear instead of key-scoped removal.
- Improvement path: Remove only app-owned keys (`auth-storage`, `account-storage`, `web3-storage`, language key, token key).

## Fragile Areas

**Bootstrap JS integration depends on global window object timing:**
- Files: `frontend/src/components/common/Modal.tsx`, `frontend/src/components/layout/Header.tsx`, `frontend/src/app/layout.tsx`
- Why fragile: Components rely on `window.bootstrap` and delayed initialization (`setTimeout`), making behavior timing-sensitive.
- Safe modification: Wrap Bootstrap bridge behind a single hook/adapter with deterministic init and teardown.
- Test coverage: No automated UI tests detected for modal/offcanvas interactions.

**Static export mode with dynamic runtime expectations:**
- Files: `frontend/next.config.ts`, `frontend/src/services/base-api.ts`, `frontend/src/stores/socketio.ts`
- Why fragile: `output: "export"` requires strict static assumptions while app depends on runtime API/socket endpoints and auth state.
- Safe modification: Explicitly document deployment model and verify static export constraints against required runtime behavior.
- Test coverage: No integration tests validating production export + API/socket runtime.

## Scaling Limits

**Client-side persisted global stores without eviction policy:**
- Current capacity: Store payload grows with account/referral/socket-related data in browser storage.
- Limit: Browsers enforce storage quotas and can silently fail writes near quota limits.
- Scaling path: Persist minimal slices only, add versioning/migrations, and avoid storing large API payloads directly.

## Dependencies at Risk

**jQuery/legacy Bootstrap asset coupling through static scripts:**
- Risk: Runtime behavior depends on globally loaded scripts (`/client/js/*.js`) and DOM-centric imperative APIs.
- Impact: Framework upgrades and hydration behavior become harder to reason about and test.
- Migration plan: Move interactive components toward React-native implementations or controlled wrappers with explicit ownership.

## Missing Critical Features

**No automated test suite detected for core flows:**
- Problem: Authentication, wallet/network switching, API failures, and modal/offcanvas behavior are unprotected by tests.
- Blocks: Safe refactors and reliable incident prevention.

**No explicit frontend security headers/CSP policy in codebase:**
- Problem: Client has token-sensitive flows but no visible defense-in-depth config for CSP/security headers.
- Blocks: Reducing XSS impact and credential theft risk from client-side token storage.

## Test Coverage Gaps

**Auth/session lifecycle and unauthorized recovery:**
- What's not tested: 401 recovery, forced logout behavior, token expiry handling.
- Files: `frontend/src/services/base-api.ts`, `frontend/src/stores/auth.ts`, `frontend/src/hooks/useLogout.ts`
- Risk: Broken session handling can leave users in inconsistent authenticated states.
- Priority: High

**Web3 network switching and signer initialization failures:**
- What's not tested: Wrong-chain auto-switch, rejected network switch, provider/signer error paths.
- Files: `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/web3.ts`
- Risk: Transaction workflows fail unpredictably across wallets/networks.
- Priority: High

**Bootstrap bridge behavior under rapid mount/unmount:**
- What's not tested: Modal/offcanvas cleanup, event detachment, and timing race conditions.
- Files: `frontend/src/components/common/Modal.tsx`, `frontend/src/components/layout/Header.tsx`
- Risk: Memory leaks and UI deadlocks in long sessions.
- Priority: Medium

## Undocumented Assumptions

**Runtime environment assumptions currently implicit:**
- Assumption: All required `NEXT_PUBLIC_*` keys are present and valid in every deploy target.
- Files: `frontend/src/providers/Web3Provider.tsx`, `frontend/src/stores/socketio.ts`, `frontend/src/app/layout.tsx`, `frontend/src/services/base-api.ts`
- Risk if false: App boots with broken API/socket/wallet behavior without clear operator feedback.
- Action: Add a central runtime config contract and startup validation checks.

**Deployment workflow assumes mutable server + PM2 restart access:**
- Assumption: Target host can `git pull`, run `yarn install`, run `pm2 delete/start`, and `chown` system paths.
- Files: `frontend/install.bash`, `frontend/ecosystem.config.js`
- Risk if false: Deployments fail partially and can leave app offline.
- Action: Document supported deployment environments and add health checks/rollback script.

## Immediate High-Risk Unknowns

**Unknown: actual production behavior of TLS verification bypass path**
- Why critical: If this client path is used in production, transport security is materially weakened.
- Evidence path: `frontend/src/services/base-api.ts`
- Immediate check: Confirm runtime bundle path usage of `BaseApiClient` in production and remove insecure agent unconditionally.

**Unknown: token lifecycle ownership between frontend and backend**
- Why critical: Current frontend stores token in browser-accessible locations, but backend cookie/session strategy is not visible.
- Evidence path: `frontend/src/stores/auth.ts`, `frontend/src/utils/axios.ts`, `frontend/src/utils/storage.ts`
- Immediate check: Align backend/frontend session design and document authoritative token invalidation flow.

**Unknown: compatibility of static export mode with authenticated API/WebSocket flows**
- Why critical: Build/deploy mismatch can break navigation/auth/socket features after deployment.
- Evidence path: `frontend/next.config.ts`, `frontend/src/services/base-api.ts`, `frontend/src/stores/socketio.ts`
- Immediate check: Validate production deploy architecture and run smoke tests on exported build artifacts.

---

*Concerns audit: 2026-04-13*
