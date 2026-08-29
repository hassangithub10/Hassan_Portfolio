# Hassan Sarfraz - Developer Portfolio

A modern, high-performance, cinematic developer portfolio website for Hassan Sarfraz built with Next.js App Router, Tailwind CSS, Framer Motion, and Three.js.

Production Site: [https://hassansarfraz.online](https://hassansarfraz.online)

---

## 🔒 Security Notice & Git History Warning

> [!WARNING]
> **Secret Rotation & Git History Warning**:
> If any API keys, database connection strings, passwords, or service credentials were previously hardcoded or committed in earlier commits of this repository, those values may still exist in the Git history.
> **Action Required**: You MUST rotate and revoke any previously exposed secrets, credentials, or connection strings across all associated services, cloud providers, and databases immediately before production deployment.

---

## Features

- ⚡ **Static Generation**: Purely static, ultra-fast pre-rendered Next.js site.
- 🎬 **Cinematic Visuals**: 3D particle background using React Three Fiber, scanlines, and glassmorphism.
- 🔍 **Comprehensive Technical SEO & AEO**: Full OpenGraph, Twitter Cards, native sitemap, and robots.txt.
- 📐 **Linked Structured Data (JSON-LD)**: Connected `@graph` schema (`WebSite`, `Person`, `ProfilePage`).
- 🛡️ **Hardened Security Headers**: Standard HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and CSP.
- ♿ **Accessibility & Semantics**: WCAG compliant semantic hierarchy and ARIA labels.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Prerendering)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion & Three.js / React Three Fiber
- **Icons**: Heroicons & Devicons
- **Fonts**: Chakra Petch & Mulish (`next/font/google`)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Configure any necessary environment variables. (Ensure no sensitive secrets use the `NEXT_PUBLIC_` prefix).

### Installation & Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run type check
npx tsc --noEmit

# Run ESLint
npx eslint src

# Create production static build
npm run build

# Preview production build locally
npm run start
```

---

## License

MIT License
