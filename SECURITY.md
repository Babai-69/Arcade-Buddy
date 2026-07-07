# Security Policy

## Supported Versions

The following versions of Arcade Buddy are currently supported with security updates:

| Version | Supported |
|---------|-----------|
| Latest (main branch) | ✅ Active |
| Previous releases | ❌ Not supported |

> Arcade Buddy is continuously deployed. Always use the latest version at:
> [arcade-buddy-385186531056.asia-southeast1.run.app](https://arcade-buddy-385186531056.asia-southeast1.run.app)

---

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Arcade Buddy, please follow responsible disclosure practices.

### How to Report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, report privately through one of these channels:

| Channel | Contact |
|---------|---------|
| 📧 Email | deya58690@gmail.com |
| 💼 LinkedIn | [Abir Dey](https://www.linkedin.com/in/abir-dey-a34914254/) |
| 🐙 GitHub | [@Babai-69](https://github.com/Babai-69) |

### What to Include in Your Report

Please provide as much detail as possible:

```
1. Description of the vulnerability
2. Steps to reproduce the issue
3. Affected component (frontend, backend, API, Firebase, etc.)
4. Potential impact (data exposure, unauthorized access, etc.)
5. Suggested fix (optional but appreciated)
6. Your contact information for follow-up
```

### What to Expect

| Timeline | Action |
|----------|--------|
| Within 48 hours | Acknowledgement of your report |
| Within 7 days | Initial assessment and severity classification |
| Within 30 days | Fix deployed for critical/high severity issues |
| After fix | Credit given in release notes (if desired) |

---

## Security Scope

### In Scope

These areas are within scope for security research:

```
✅ Points calculator API endpoint
✅ Profile URL fetching logic
✅ Leaderboard data exposure
✅ Firebase Firestore security rules
✅ Authentication bypass attempts
✅ Admin panel access controls
✅ CORS policy issues
✅ API rate limiting
✅ Data validation and sanitization
✅ HTTPS enforcement
```

### Out of Scope

These areas are NOT in scope:

```
❌ Third-party services (Google Cloud, Firebase infrastructure)
❌ cloudskillsboost.google.com itself
❌ Social engineering attacks
❌ Physical security
❌ Denial of service (DoS/DDoS) attacks
❌ Issues requiring physical access to devices
❌ Already known vulnerabilities
❌ Issues in outdated browsers
```

---

## Security Architecture

### Data We Store

| Data Type | Where Stored | Who Can Access |
|-----------|-------------|----------------|
| Leaderboard participant names | Firebase Firestore | Public (read only) |
| Leaderboard points & badges | Firebase Firestore | Public (read only) |
| Admin email address | Firebase Auth | Admin only |
| SMTP credentials | Environment variables | Server only |
| Firebase API keys | Environment variables | Server only |
| Profile URLs (temporary) | In-memory only | Not persisted |

### What We Do NOT Store

```
❌ Passwords (no password-based auth)
❌ Payment information
❌ Personal identification documents
❌ Private Google Cloud Skills Boost data
❌ Session tokens in localStorage
❌ Cookies with sensitive data
```

### Authentication & Authorization

```
Public access:
→ View leaderboard (read only)
→ Use points calculator
→ View all public pages

Admin access (deya58690@gmail.com only):
→ Upload CSV to update leaderboard
→ Modify Firestore leaderboard data
→ Requires Google Sign-In + email verification

Firebase rules enforce this at the database level:
→ Even if someone bypasses the UI,
  Firestore rejects unauthorized writes
```

### API Security

```
Rate limiting:
→ /api/calculator — profile URL must be valid
  Google Cloud Skills Boost URL format

Input validation:
→ Profile URLs validated before fetching
→ CSV data sanitized before Firestore writes

CORS:
→ Configured to allow only trusted origins
→ Preflight OPTIONS requests handled

HTTPS:
→ Enforced on all endpoints
→ Google Cloud Run handles SSL/TLS automatically
```

---

## Known Security Considerations

### Public API Keys

Firebase API keys (VITE_FIREBASE_*) are exposed in the frontend bundle. This is expected behavior for Firebase web apps. Security is enforced through **Firestore Security Rules**, not by keeping keys secret.

```
Our Firestore rules ensure:
→ Anyone can READ leaderboard data (intentional — it's public)
→ Only the admin email can WRITE data
→ Rules are enforced server-side by Firebase
→ Exposed API keys alone cannot bypass these rules
```

### Profile URL Scraping

The calculator fetches public Google Cloud Skills Boost profiles. This is only possible because:
- The profile is intentionally set to **public** by the user
- No authentication is required to view public profiles
- We do not store or log any profile data

### Third-Party Dependencies

We regularly update dependencies to patch known vulnerabilities. Check our `package.json` for current versions.

---

## Security Best Practices for Users

If you use Arcade Buddy, here are recommendations:

```
✅ Only share your PUBLIC profile URL
   (not your login credentials)

✅ Your Google Cloud account credentials
   are never entered into Arcade Buddy

✅ The leaderboard shows only your name
   and badge counts — no private data

✅ Admin CSV files should only be uploaded
   by the program facilitator

✅ Use the official Cloud Run URL only:
   arcade-buddy-385186531056.asia-southeast1.run.app
```

---

## Vulnerability Severity Classification

We classify vulnerabilities using the following scale:

| Severity | Description | Response Time |
|----------|-------------|---------------|
| 🔴 Critical | Remote code execution, full data breach, auth bypass | 24 hours |
| 🟠 High | Significant data exposure, privilege escalation | 7 days |
| 🟡 Medium | Limited data exposure, CSRF, stored XSS | 14 days |
| 🟢 Low | Minor information disclosure, low-impact bugs | 30 days |
| ℹ️ Informational | Best practice improvements | Next release |

---

## Hall of Fame

We appreciate responsible disclosure. Security researchers who report valid vulnerabilities will be credited here (with their permission):

| Researcher | Vulnerability | Date |
|------------|--------------|------|
| *Be the first!* | — | — |

---

## Disclaimer

Arcade Buddy is an independent community project and is **not affiliated with, endorsed by, or officially connected to Google LLC**. We do not have access to any official Google Cloud infrastructure. All data displayed is either publicly available or submitted voluntarily by users.

---

## Legal

Unauthorized security testing against Arcade Buddy's production infrastructure without prior written permission is prohibited and may violate applicable laws. We encourage responsible disclosure and will not pursue legal action against researchers who:

- Report vulnerabilities privately before public disclosure
- Do not exploit vulnerabilities beyond what is necessary to demonstrate the issue
- Do not access, modify, or delete data that does not belong to them
- Do not perform denial of service attacks

---

*Last updated: July 2026*
*Maintained by Abir Dey — Google Cloud Arcade Facilitator 2026*
