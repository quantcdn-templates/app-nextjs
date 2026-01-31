# Build stage
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM ghcr.io/quantcdn-templates/app-node:${NODE_VERSION}

WORKDIR /app

# Copy entrypoint scripts
COPY quant/entrypoints/ /quant-entrypoint.d/
RUN find /quant-entrypoint.d -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true

# Copy standalone build output
# Next.js standalone output includes server.js and required node_modules
COPY --from=builder --chown=node:node /build/.next/standalone ./
COPY --from=builder --chown=node:node /build/.next/static ./.next/static
COPY --from=builder --chown=node:node /build/public ./public

# CRITICAL: App port must be 3001 (proxy runs on 3000)
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Expose proxy port
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]
