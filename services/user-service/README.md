# User Service

This is a small user service. It expects a PostgreSQL instance reachable via a unix domain socket by default.

Defaults (can be overridden with env vars):

- DB_USER / POSTGRES_USER: pankaj
- DB_NAME / POSTGRES_DB: postgres
- DB_SOCKET: /tmp
- DB_PORT: 5432
- DB_SSLMODE: disable
- PORT: 8080

Example run (macOS / local postgres listening on unix socket /tmp):

```bash
export DB_USER=pankaj
export DB_NAME=postgres
export DB_SOCKET=/tmp
export DB_PORT=5432
export DB_SSLMODE=disable
export PORT=8080

cd services/user-service
go run ./cmd
```

Visit http://localhost:8080/health to check the service.
