# =============================================================================
# Physiowerk Bodensee – Produktions-Image (Self-Hosting, z. B. Coolify)
# Mehrstufiger Build: Abhängigkeiten und Build getrennt vom Laufzeit-Image.
# =============================================================================

FROM node:22-alpine AS builder

WORKDIR /app

# pnpm über corepack in der im Projekt festgelegten Version bereitstellen
RUN corepack enable

# Abhängigkeiten zuerst kopieren, damit der Docker-Layer-Cache greift
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

# Restliche Quellen kopieren und Produktionsbuild erzeugen
COPY . .
RUN pnpm build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

RUN corepack enable

# Nur Produktionsabhängigkeiten installieren
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod

# Build-Artefakte und Migrationsdateien übernehmen
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
COPY drizzle.config.ts ./

EXPOSE 3000

# Health-Check des Express-Servers (siehe server/_core/index.ts)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/index.js"]
