# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Creating New Templates

Use the custom skills for building Quant Cloud templates:
- **`quant-ssg-template`** - For static site generators (build & deploy to CDN)
- **`quant-app-template`** - For server-rendered apps (run in containers)

These skills contain checklists, port architecture, proxy configuration, and CI/CD patterns.

## Overview

This is a Next.js 14 SSR template for Quant Cloud. It uses App Router with React Server Components and deploys as a Docker container.

## Commands

```bash
npm run dev      # Development server on http://localhost:3000
npm run build    # Production build (standalone output)
npm run start    # Start production server
npm run lint     # Run ESLint
```

Docker:
```bash
cp docker-compose.override.yml.example docker-compose.override.yml
docker-compose up --build
```

## Architecture

### Proxy Layer

The app runs behind Quant's proxy (base image `ghcr.io/quantcdn-templates/app-node`):

```
Internet → Edge → :3000 (proxy) → :3001 (Next.js)
```

**Critical:** App must use `PORT=3001` (set in Dockerfile). The proxy handles:
- `Quant-Orig-Host` → `Host` header translation
- `X-Forwarded-Proto` for HTTPS detection
- Auto-restart on crash

### Build Output

Next.js is configured with `output: 'standalone'` in `next.config.js`. This creates a minimal production build in `.next/standalone` that includes only necessary dependencies.

### Deployment

GitHub Actions workflow (`.github/workflows/build-deploy.yaml`) builds the Docker image and deploys to Quant Cloud on push to main. Requires `QUANT_API_KEY` and `QUANT_ORGANIZATION` secrets.

## Key Files

- `next.config.js` - Must keep `output: 'standalone'`
- `Dockerfile` - Multi-stage build; `PORT=3001` is critical
- `quant/meta.json` - Template metadata for Quant dashboard
