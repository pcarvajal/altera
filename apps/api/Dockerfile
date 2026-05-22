FROM node:22-alpine AS base
RUN npm install -g pnpm@11.1.3
WORKDIR /app

# --- deps: instala dependencias usando el lock file del monorepo ---
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

# --- build: compila la API ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN pnpm --filter shared build && pnpm --filter api build

# --- deploy: crea un directorio autocontenido sin symlinks ---
FROM base AS deploy
COPY --from=build /app .
RUN pnpm deploy --filter api --prod /deploy

# --- runner: imagen mínima de producción ---
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deploy /deploy .
EXPOSE 3001
CMD ["node", "dist/main.js"]