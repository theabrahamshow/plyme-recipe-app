# Plyme iOS App · Security Policy

> This document outlines security considerations and implementation rules for Plyme, a React Native / Expo iOS app using Supabase and EAS. It reflects our current infrastructure and deployment stack.

_Last reviewed: May 2025  
Maintainer: Core Dev Team  
Next audit: August 2025 (pre-Store submission)_

---

## 🔐 Core Security Principles

- Secrets never committed to Git
- Supabase rows always gated by auth policies
- No unvalidated input or unthrottled API routes
- Sensitive data stored in encrypted secure store
- Users can’t see or access other users’ data

---

## ✅ Development & Codebase Hygiene

### General Rules
- [x] Use **TypeScript strict mode**
- [x] Enforce **ESLint** with security plugins
- [x] Format and lint all PRs (Husky + Prettier)
- [x] Use `ErrorBoundary` for all navigable screens
- [x] Centralize security code:
  - `utils/security/` — general crypto, token
  - `utils/validation/` — Zod input schemas
  - `utils/encryption/` — low-level encryption utils
  - `hooks/auth/` — login, logout, Apple auth, etc.

### Git Hygiene
- [x] `.env.local` must exist and be gitignored
- [x] `.env` only contains **safe** public config (e.g., `NEXT_PUBLIC_API_URL`)
- [x] All secrets read via `process.env`
- [x] No hardcoded API keys or tokens in codebase

---

## 🔐 Supabase

### RLS & DB Access
- [x] **Row Level Security enabled on every table**
- [x] Use `auth.uid()` for access policies:
  - Users can only read/write their own rows
  - No wildcard read access
- [x] No `service_role` used on the client
- [x] Any privileged behavior wrapped in `rpc()` calls, executed from server-side (Edge functions)

### Storage
- [x] Storage buckets (`slides/`, `avatars/`) use signed URLs or public read-only access if safe
- [x] Supabase edge function used for seeding

---

## 🔒 Authentication & Session Management

- [x] Anonymous auth supported for casual use
- [x] Apple Sign-In for account upgrades
- [x] Token storage:
  - Supabase JWT stored via `expo-secure-store`
- [x] Sessions auto-refresh using Supabase SDK
- [x] Session invalidation on logout
- [x] Re-auth required for sensitive changes

### Optional (post-MVP)
- [ ] MFA for account-based logins
- [ ] Biometric fallback (`expo-local-authentication`)
- [ ] Account lockout after brute-force attempts

---

## 🧾 Data Privacy & Local Storage

- [x] All sensitive data stored in `expo-secure-store`
- [x] No tokens in AsyncStorage or Redux
- [x] File uploads stored via `expo-file-system` with cleanup logic
- [x] App uses OTA updates (Expo) — locked to production channel

### iOS Requirements
- [x] No plaintext sensitive data in local logs
- [x] Clipboard access avoided for credentials
- [x] App Transport Security (ATS) enforced
- [x] App state cleared on background
- [x] Jailbreak detection (partial via `expo-device`)
- [x] App icon/splash uses no third-party analytics SDKs

---

## 🔐 API Security

- [x] All `/api/*` routes require:
  - [x] JWT in `Authorization` header
  - [x] Zod input validation
  - [x] 429 on >5 req/min/IP (rate limiting)
  - [x] Consistent 400/401/403/500 errors with no sensitive leak
- [x] No `console.log()`s shipped to production
- [x] Edge functions validate all inputs

---

## 🔒 Secrets Management

- [x] `.env` for public config only
- [x] `.env.local` for secrets
- [x] `.env.local` is `.gitignore`d
- [x] No secrets in hardcoded strings
- [x] Vercel → Settings → Environment Variables used for deploy-time secrets

> **Prompt for devs using Cursor/Windsurf:**  
> “Use `process.env.<VAR>` for all secrets. If config is needed, list the key to add to `.env.local`.”

---

## 🔎 Dependency & Supply Chain Security

- [x] Use `yarn.lock` to freeze versions
- [x] `yarn audit` run before all builds
- [x] Minimize deps, vet security of new ones
- [x] Keep Expo SDK up-to-date (quarterly)

---

## 🚧 Security Testing

- [x] Lint/format on commit (Husky)
- [x] Jest tests for auth/session utils
- [x] CI/CD uses Expo EAS build
- [x] No `debugger`, `.only`, or `console.log()` in prod
- [ ] Future: Pen test endpoints (manual or service)

---

## 🛡 App Store Security Compliance

- [x] iOS entitlements set properly (`appleSignIn`)
- [x] App uses ATS
- [x] Permissions use just-in-time prompts
- [x] Privacy policy + contact URL in App Store metadata
- [x] Supports Apple Data Deletion + Export (v1.1+)
- [x] OTA updates locked to prod channel

---

## 🧪 Monitoring & Response

- [x] Crash reporting (Expo + Sentry)
- [x] Manual error capture in auth & slideshow
- [x] API logs via Supabase Logs panel
- [ ] SLA for security patch deployment (to be defined)
- [ ] Email/Slack channel for incident triage

---

## 🧹 Regular Reviews

- [x] Security review every 90 days
- [x] RLS policy audit
- [x] Dependency audit quarterly
- [x] Review `.env` / keys on developer churn
- [x] Monitor Supabase logs for abnormal traffic

---

## 📚 Resources

- [Expo Security](https://docs.expo.dev/guides/security/)
- [Supabase RLS & Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Zod Validation](https://zod.dev/)
- [Apple iOS Data Safety](https://developer.apple.com/app-store/data-privacy/)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)

---

_This file documents the current security posture for Plyme and must be updated with every major infra or SDK change._