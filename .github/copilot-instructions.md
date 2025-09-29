## Quick orientation

This repository is a small microservice monorepo with a Next.js frontend under `frontend/`, an API Gateway in `gateway/`, and multiple Go services under `services/` (notably `user-service`, `calendar-service`, `notification-service`, `workflow-service`). The gateway proxies requests to services and applies JWT middleware for protected routes.

Key files to inspect when making changes

- `gateway/main.go` — gateway bootstrap, JWT middleware, mux wiring (mounts `/auth/` and `/api/`).
- `gateway/proxy.go` — reverse proxy helper and route wiring (env var defaults such as `USER_SERVICE_URL`).
- `services/user-service/cmd/main.go` — user service startup (reads config, connects DB, registers handlers).
- `services/user-service/internal/handlers/routes.go` — HTTP handlers registration (`/signup`, `/login`, `/health`).
- `services/user-service/internal/db/db.go` — DB connection and lightweight migration (creates `users` table if missing).
- `services/user-service/internal/repo/repo.go` — repository interface (`UserRepo`) used by handlers.

Big-picture architecture notes for agents

- Pattern: this is a Go monorepo using small services + a gateway. The gateway reverse-proxies requests to services and applies authentication at the gateway layer for `/api/*` paths; `/auth/*` routes are forwarded without JWT validation.
- Data flow example: frontend -> gateway -> `/auth/signup` -> forwarded to user-service `/signup` -> user-service writes to Postgres and returns a JWT.
- Local DB expectation: `user-service` expects PostgreSQL and defaults to a unix socket (see `services/user-service/README.md`). The service runs a simple migration on startup.

Developer workflows and runnable commands (concrete)

- Frontend (Next.js) dev:

  npm run dev (run from `frontend/`)

- User service (Go) local dev (example shown in `services/user-service/README.md`):

  cd services/user-service
  export DB_USER=user DB_NAME=postgres DB_SOCKET=/tmp DB_PORT=5432 DB_SSLMODE=disable PORT=8080 JWT_SECRET=your_jwt_secret
  go run ./cmd

- Gateway (Go) local dev:

  cd gateway

  # set USER_SERVICE_URL (default uses host.docker.internal:8081) and PORT if needed

  go run main.go

- Quick API smoke tests (examples in `services/user-service/README.md`):

  curl -sS -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"pass123"}' http://localhost:8080/signup

Project-specific conventions and patterns

- Internal package layout: services use `internal/` packages for `auth`, `db`, `handlers`, `repo`, `models`. Handlers register routes in a `RegisterRoutes` function which takes config, a `*sql.DB`, and the jwt secret (see `services/user-service/internal/handlers/routes.go`).
- Repository interfaces: persistence is abstracted behind small interfaces (e.g. `UserRepo`) in `internal/repo` so tests and alternate backends can be implemented easily.
- Lightweight migrations: `db.Connect` runs a `CREATE TABLE IF NOT EXISTS` to ensure the `users` table exists — do not assume an external migration system for this table unless you see otherwise.
- Environment-driven wiring: service endpoints and ports are selected via env vars (examples: `USER_SERVICE_URL`, `PORT`, `DB_SOCKET`, `JWT_SECRET`). Gateway defaults point to host.docker.internal for local Docker interop.

Integration and debugging tips

- Health endpoints:
  - Gateway: `GET /health` (see `gateway/main.go`) — responds with "API Gateway is healthy".
  - User service: `GET /health` (see `services/user-service/internal/handlers/routes.go`) — responds with `ok`.
- To debug proxying behaviour, inspect `gateway/proxy.go` and `gateway/main.go`; the reverse proxy sets the target host/scheme in `Director` — problems often come from incorrect `USER_SERVICE_URL` values (use `http://host.docker.internal:8081` for host <-> container access on macOS).
- JWT handling: gateway applies `jwtMiddleware` around `/api/` prefix (see `gateway/main.go`); `/auth/` is unauthenticated so authentication flows should use `/auth/signup` and `/auth/login` routes.

What to avoid / common pitfalls discovered in the codebase

- Do not assume integer primary keys: early code used text UUIDs — inspect the `repo` implementation for current behavior.
- The DB migration in `db.Connect` creates a `password` column named `password` or `password_hash` depending on revisions; verify the `repo` implementation (`internal/repo`) when changing authentication logic.

Where to look for more context

- `services/user-service/README.md` — env vars and run examples.
- `frontend/README.md` — frontend dev commands.
- `k8s/` and `docker/` — deployment wiring and container defaults (useful when changing env var names or ports).

If anything above is out-of-date or you hit an undocumented workflow, please open a note in the repo or ping maintainers and add a short example to this file so future agents can find it.

Request for feedback

Please tell me which areas were unclear or missing (build steps, env vars, service endpoints, or other internal files to reference) and I'll iterate on this file.
