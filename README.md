# Next.js SSR Template for Quant Cloud

A Next.js 14 server-rendered application template configured for deployment to Quant Cloud.

[![Deploy to Quant Cloud](https://www.quantcdn.io/img/quant-deploy-btn-sml.svg)](https://dashboard.quantcdn.io/cloud-apps/create/starter-kit/app-nextjs)

## Features

- **Next.js 14** - Latest version with App Router
- **Server-Side Rendering** - Full SSR with React Server Components
- **API Routes** - Route Handlers for backend functionality
- **TypeScript** - Full type safety
- **Docker Optimized** - Standalone output for minimal image size
- **Proxy Integration** - Automatic Host header handling

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Docker Development

```bash
# Copy the override file
cp docker-compose.override.yml.example docker-compose.override.yml

# Build and run
docker-compose up --build

# Visit http://localhost:3000
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── build-deploy.yaml   # CI/CD workflow
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout
│       ├── page.tsx            # Home page (SSR)
│       └── api/
│           └── hello/
│               └── route.ts    # API endpoint
├── quant/
│   ├── meta.json               # Template metadata
│   └── entrypoints/            # Custom startup scripts
├── public/                     # Static assets
├── Dockerfile                  # Production build
├── docker-compose.yml          # Production config
├── docker-compose.override.yml.example  # Local dev template
└── next.config.js              # Next.js configuration
```

## Architecture

The application runs behind Quant's proxy layer:

```
Internet → Edge → :3000 (proxy) → :3001 (Next.js)
```

The proxy automatically handles:
- `Quant-Orig-Host` → `Host` header translation
- `X-Forwarded-Proto` for HTTPS detection
- `X-Forwarded-For` for client IP

Your application sees the correct `Host` header without any configuration.

## Deployment

This template uses GitHub Actions for CI/CD:

1. Builds a Docker image with standalone Next.js output
2. Pushes to Quant's container registry
3. Deploys to Quant Cloud

### Required Secrets

- `QUANT_API_KEY` - Your Quant API key
- `QUANT_ORGANIZATION` - Your organization slug

## API Routes

Example API endpoint at `/api/hello`:

```typescript
// GET /api/hello
{
  "message": "Hello from Next.js on Quant Cloud!",
  "host": "your-domain.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Quant Cloud Documentation](https://docs.quantcdn.io/)
