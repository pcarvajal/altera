# altera-interview-project

pnpm monorepo with a NestJS API and a Next.js frontend, following a DDD / hexagonal architecture.

## Requirements

- Node.js 20+
- pnpm 9+
- Docker

## Setup

```bash
# Install dependencies
pnpm install

# Build the shared package (required before running the API)
pnpm --filter shared build
```

## Environment

Create `apps/api/.env` from the example below:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cobros
DATABASE_USER=cobros
DATABASE_PASSWORD=cobros_dev
SERVER_PORT=3000
JWT_SECRET=change-me
JWT_EXPIRES_IN=24h
```

## Running locally

```bash
# Start the database
docker compose up postgres -d

# Start all apps in watch mode
pnpm dev
```

| App     | URL                       |
| ------- | ------------------------- |
| API     | http://localhost:3001     |
| Swagger | http://localhost:3001/api |
| Web     | http://localhost:3000     |

## Tests

```bash
# Domain unit tests
pnpm --filter api test

# Watch mode
pnpm --filter api test:watch
```

## Production deployment

The docker-compose.yml builds and runs all three services (postgres, api, web).

Set the required secrets before starting:

```bash
# In docker-compose.yml, replace these values before deploying
JWT_SECRET=change-me          # api service
POSTGRES_PASSWORD=cobros_dev  # postgres service
```

Then build and start:

```bash
docker compose up -d --build
```

| Service | URL                       |
| ------- | ------------------------- |
| Web     | http://localhost:3000     |
| API     | http://localhost:3001     |
| Swagger | http://localhost:3001/api |

To stop:

```bash
docker compose down
```

To stop and remove the database volume:

```bash
docker compose down -v
```

## Other commands

```bash
pnpm build       # build all workspaces
pnpm lint        # lint all workspaces
pnpm clean       # remove all dist/ directories

pnpm --filter api db:seed   # seed the database
pnpm --filter api db:clean  # wipe the database
```
