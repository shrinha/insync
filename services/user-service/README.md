# User Service

This is a small user service. It expects a PostgreSQL instance reachable via a unix domain socket by default.

Defaults (can be overridden with env vars):

- DB_USER / POSTGRES_USER: user
- DB_NAME / POSTGRES_DB: postgres
- DB_SOCKET: /tmp
- DB_PORT: 5432
- DB_SSLMODE: disable
- PORT: 8080

Example run (macOS / local postgres listening on unix socket /tmp):

```bash
export DB_USER=user
export DB_NAME=postgres
export DB_SOCKET=/tmp
export DB_PORT=5432
export DB_SSLMODE=disable
export PORT=8080

cd services/user-service
go run ./cmd
```

Visit http://localhost:8080/health to check the service.

## Local development

If you're running PostgreSQL locally (the service defaults to using a unix socket at `/tmp`), you may need to create a database role and ensure it has ownership or the necessary privileges on the `users` table.

Example psql commands (run as a superuser or the Postgres admin user):

```sql
-- create role (if it doesn't exist)
CREATE ROLE "user" WITH LOGIN PASSWORD ''; -- replace with secure password or use your existing role

-- make sure the database exists
CREATE DATABASE postgres; -- skip if already present

-- connect to the DB and make the user the owner of the users table
\c postgres

-- If the users table already exists and is owned by another role, make this role the owner
ALTER TABLE users OWNER TO "user";

-- Or grant the minimal privileges needed for the service
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO "user";
```

If you don't yet have the `users` table, the service's DB connector will create it automatically on startup (it runs a simple migration). If you prefer to create it yourself, here's the create statement the service uses:

```sql
CREATE TABLE IF NOT EXISTS users (
	id TEXT PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL
);
```

Note: If your local Postgres uses integer serial ids (common), you may already have a different schema; the service code has been updated to use the integer id returned by Postgres and to write/read the `password_hash` column. Make sure the `users` table has a `password_hash` column and that the DB user has INSERT/SELECT privileges.

## Environment variables

You can set these environment variables before running the service (example):

```bash
export DB_USER=user
export DB_NAME=postgres
export DB_SOCKET=/tmp
export DB_PORT=5432
export DB_SSLMODE=disable
export PORT=8080
export JWT_SECRET=your_jwt_secret_here
```

## Run and test

Start the service from the repo root:

```bash
cd services/user-service
go run ./cmd
```

Signup example (returns JSON token):

```bash
curl -sS -X POST -H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"pass123"}' \
	http://localhost:8080/signup
```

Login example (returns JSON token):

```bash
curl -sS -X POST -H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"pass123"}' \
	http://localhost:8080/login
```
