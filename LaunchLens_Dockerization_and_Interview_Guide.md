# LaunchLens Dockerization & Interview Guide

**Status:** Frontend and backend images built, containers started,
backend dependency issue fixed, and the user confirmed LaunchLens works
locally in the browser.

> This documents the development-oriented setup we implemented. It is
> not yet a production-hardened deployment. Do not store or commit real
> credentials in this file.

## 1. Dockerization in simple words

Dockerization packages an application and its runtime dependencies into
an image so it can run consistently in a container.

For LaunchLens we containerized: - **Frontend:** React + TypeScript +
Vite - **Backend:** Node.js + Express + TypeScript + Prisma

The PostgreSQL database remains hosted on **Supabase**; it was not moved
into Docker.

  -------------------------------------------------------------------------------
  Term                    Simple meaning          LaunchLens example
  ----------------------- ----------------------- -------------------------------
  Dockerfile              Instructions to build   `frontend/Dockerfile`,
                          an image                `backend/Dockerfile`

  Image                   Packaged template       `launchlens-frontend:latest`,
                                                  `launchlens-backend:latest`

  Container               Running instance of an  `launchlens-frontend-1`,
                          image                   `launchlens-backend-1`

  Docker Compose          Defines and runs        `compose.yaml`
                          multiple services       
                          together                

  Build context           Files Docker can access `./frontend`, `./backend`
                          for a build             

  `.dockerignore`         Excludes files from the Excludes `node_modules`,
                          build context           `.env`, logs

  Port mapping            Connects host port to   `5173:5173`, `5000:5000`
                          container port          

  Registry                Stores and distributes  Docker Hub or private registry;
                          images                  not used for this local setup
  -------------------------------------------------------------------------------

Analogy: Dockerfile = recipe; image = packaged template; container =
running instance.

## 2. LaunchLens architecture

``` text
Browser
  | http://localhost:5173
  v
Frontend container (React + Vite, port 5173)
  |
  | Browser API calls to http://localhost:5000/api/...
  v
Backend container (Node.js + Express + Prisma, port 5000)
  |
  | DATABASE_URL / DIRECT_URL
  v
Supabase PostgreSQL (external hosted database)
```

The browser uses the host-published API URL. `localhost` inside a
container refers to that same container. Container-to-container calls
normally use the Compose service name, such as `backend`, on the Docker
network.

What we did **not** containerize: Supabase PostgreSQL, a production web
server for frontend assets, or a CI/CD pipeline.

## 3. Files created or changed

``` text
LaunchLens/
├── compose.yaml
├── .dockerignore
├── frontend-package-lock.backup.json   # temporary backup created during troubleshooting
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package-lock.json               # regenerated with Node.js 22 npm
└── backend/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json                    # added express-rate-limit
    └── package-lock.json               # updated dependency lockfile
```

### `.dockerignore`

The root `.dockerignore` applies to builds whose context is the
repository root. Since Compose uses `./frontend` and `./backend` as
separate build contexts, each directory also needs its own
`.dockerignore`.

Both service-level files contain rules equivalent to:

``` text
node_modules
dist
coverage
.env
.env.*
!.env.example
.git
*.log
```

These prevent local dependencies, build output, Git metadata, logs, and
actual environment files from entering the build context.
`!.env.example` preserves an example template.

**Security note:** `.dockerignore` only filters the build context. It
does not delete secrets, rotate credentials, or protect secrets injected
into a running container. Credentials exposed in terminal output during
troubleshooting should be rotated. Never share resolved Compose output
containing secrets.

## 4. Backend Dockerfile

The development-oriented Dockerfile:

``` dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

-   `FROM node:22`: selects the Node.js base image.
-   `WORKDIR /app`: sets the working directory inside the image.
-   `COPY package*.json ./`: copies the manifest and lockfile first.
-   `RUN npm ci`: clean, lockfile-based dependency installation.
-   `COPY . .`: copies backend source into the image.
-   `RUN npx prisma generate`: generates Prisma Client from the schema.
-   `EXPOSE 5000`: documents the expected container port; it does not
    publish it.
-   `CMD [...]`: starts the backend development script using
    `tsx watch src/server.ts`.

Copying package files before source code helps Docker cache the
dependency layer when only application source changes.

## 5. Frontend Dockerfile

``` dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

This installs frontend dependencies and starts Vite. `--host 0.0.0.0`
allows Vite to accept connections through the container network
interface so the published port can reach it.

This is a **development server** setup. A production setup would build
static frontend assets and serve them through a production web server or
static hosting.

## 6. Docker Compose

The relevant structure of the Compose file is:

``` yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    environment:
      NODE_ENV: development
      PORT: "5000"
      APP_URL: http://localhost:5000
      FRONTEND_URL: http://localhost:5173

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:5000
    depends_on:
      - backend
```

This is a structural example; retain any other required settings in the
actual file. Do not put real secrets in YAML.

-   `build.context`: files made available for a build.
-   `ports`: `HOST_PORT:CONTAINER_PORT`.
-   `env_file`: injects local environment variables at runtime.
-   `environment`: sets or overrides environment variables.
-   `depends_on`: controls startup order, but does not guarantee the
    backend is ready to accept requests.

The frontend uses `VITE_API_URL=http://localhost:5000` because
browser-side Axios calls the host-published backend port. The browser
cannot normally resolve the Compose service name `backend`.

## 7. Issues encountered and how they were fixed

### A. Docker Hub timeout

Docker initially timed out fetching metadata for `node:22`. Running
`docker pull node:22` succeeded; a subsequent build could use the local
base image.

**Lesson:** A base-image pull failure may be a registry/network/proxy
issue, not an application-code error.

### B. Frontend lockfile mismatch

`npm ci` reported that `@emnapi/runtime` was missing from the lockfile.
We backed up the original lockfile, regenerated it using Node.js 22 in a
temporary container, removed the generated frontend `node_modules`
folder, and successfully ran `npm ci` in Node.js 22.

**Lesson:** `npm ci` expects the manifest and lockfile to be consistent.
It is useful for reproducible clean installations.

### C. Backend missing dependency

The backend crashed with `Cannot find module 'express-rate-limit'` from
`src/middleware/loginLimiter.ts`. The package was missing from the
backend dependency list. We ran:

``` powershell
cd backend
npm install express-rate-limit
```

This updated the package manifest and lockfile. We rebuilt/restarted the
backend, and its logs showed the server running on port 5000.

**Lesson:** A successful TypeScript build does not guarantee every
runtime dependency is installed. Check startup logs as well as compile
results.

### D. `ENOTEMPTY` during npm cleanup

A `npm ci` run inside a Linux container mounted to the Windows frontend
directory hit a filesystem cleanup error in `node_modules`. Removing the
generated frontend `node_modules` directory and rerunning `npm ci` in
the Node 22 container succeeded.

**Lesson:** A bind mount can make a container operate on host files.
Diagnose the mount and generated dependency folder before changing
application code.

## 8. Commands to remember

Run from the project root unless stated otherwise.

``` powershell
# Validate Compose syntax/config
docker compose config --quiet

# Build both images
docker compose build

# Start services in background
docker compose up -d

# Show container status
docker compose ps

# View logs
docker compose logs --tail 50
docker compose logs --tail 50 backend
docker compose logs --tail 50 frontend

# Rebuild/recreate only the backend
docker compose up -d --build backend

# Stop and remove Compose containers/network
docker compose down
```

Open the frontend at `http://localhost:5173`. The backend is published
on port 5000; a request to `/` may return 404 if no root route exists,
so test an actual API route.

## 9. Current status and limitations

At the end of this walkthrough: - Both frontend and backend images built
successfully. - Both containers started. - Backend logs confirmed
Express started on port 5000. - Vite reported ready on port 5173. - The
missing `express-rate-limit` dependency was installed and the backend
image rebuilt. - The user confirmed LaunchLens worked in the browser.

Still distinguish these facts: 1. This is a development-oriented setup
using Vite and `tsx watch`, not a production-hardened deployment. 2.
Supabase remains external; database access depends on valid environment
variables and network connectivity. 3. Rotate any credentials that were
exposed in terminal output. 4. npm reported vulnerabilities during
installs. Review with `npm audit`; avoid blindly running
`npm audit fix --force`. 5. The frontend build warned about a large
JavaScript chunk. It was a warning, not a build failure. 6. Production
improvements could include multi-stage builds, production frontend
serving, production-only backend dependencies, non-root runtime user,
health checks, managed secrets, image scanning, and CI/CD.

------------------------------------------------------------------------

# 10. Interview questions and answers

### Q1. What is Docker, and why did you use it in LaunchLens?

**Answer:** Docker packages an application and its runtime dependencies
into an image that runs as a container. I used it to containerize the
React/Vite frontend and Node/Express backend so they run in consistent
environments. Docker Compose manages both services together. PostgreSQL
remains hosted on Supabase.

### Q2. Explain your architecture.

**Answer:** LaunchLens has a frontend container running Vite on port
5173 and a backend container running Express on port 5000. The browser
loads the frontend and sends API requests to the backend through the
host-published port. The backend uses Prisma to connect to Supabase
PostgreSQL.

### Q3. Image vs container?

**Answer:** An image is the packaged template; a container is a running
instance of that image. I built separate frontend and backend images and
used Compose to run containers from them.

### Q4. Why separate Dockerfiles?

**Answer:** The frontend and backend have different dependencies,
startup commands, and ports. Separate Dockerfiles let me build and
update each service independently.

### Q5. What is Docker Compose?

**Answer:** Compose defines related services in a YAML file. In
LaunchLens it specifies the build contexts, ports, environment
configuration, and startup dependency for the frontend and backend.

### Q6. What does `5000:5000` mean?

**Answer:** It maps host port 5000 to container port 5000, making the
backend reachable through `http://localhost:5000` on the host.

### Q7. Why `npm ci` instead of `npm install` in Docker?

**Answer:** `npm ci` performs a clean installation based on the lockfile
and fails if the manifest and lockfile are inconsistent. It supports
repeatable builds. We had to regenerate the frontend lockfile before the
image build succeeded.

### Q8. Why copy package files before source code?

**Answer:** Docker can cache the dependency-installation layer. If
source changes but package manifests do not, Docker can reuse that layer
and avoid reinstalling dependencies.

### Q9. What is `.dockerignore`?

**Answer:** It filters files out of the build context. I excluded local
dependencies, build output, Git metadata, logs, and `.env` files. Each
service has its own ignore file because it has its own build context.

### Q10. Does `EXPOSE 5000` publish the port?

**Answer:** No. `EXPOSE` documents the expected container port. The
Compose `ports` mapping publishes it on the host.

### Q11. Why `--host 0.0.0.0` for Vite?

**Answer:** It makes Vite listen on the container network interface,
allowing connections through the published Docker port rather than only
the container's loopback interface.

### Q12. Why `npx prisma generate`?

**Answer:** The backend uses Prisma. This command generates Prisma
Client from the schema so the backend can use the generated client for
database operations.

### Q13. What runtime issue did you solve?

**Answer:** The backend crashed because `express-rate-limit`, imported
by the login rate-limiting middleware, was missing from its
dependencies. I installed it, which updated the manifest and lockfile,
then rebuilt and restarted the backend. The logs confirmed Express
started on port 5000.

### Q14. Why can TypeScript compile when a runtime dependency is missing?

**Answer:** Compilation does not guarantee every package needed at
runtime is installed in the final environment. The backend compiled but
failed when Node loaded the missing package. That is why I verify both
compilation and container startup logs.

### Q15. Why leave PostgreSQL on Supabase?

**Answer:** LaunchLens already uses hosted Supabase PostgreSQL. The
initial goal was to containerize the frontend and backend without
changing the database architecture or migrating data.

### Q16. `localhost` on the host vs inside a container?

**Answer:** `localhost` refers to the environment where the process
runs. The browser's `localhost:5000` reaches the host-published backend
port. Inside the frontend container, `localhost` means the frontend
container itself. Container-to-container communication usually uses the
Compose service name, such as `backend`.

### Q17. Does `depends_on` guarantee readiness?

**Answer:** No. It controls startup order but does not ensure that the
backend is ready to serve requests. Health checks and readiness-aware
retries are useful improvements.

### Q18. How do you debug a container that exits?

**Answer:** I run `docker compose ps` and inspect the service logs with
`docker compose logs --tail 50 backend`. I look for missing modules,
configuration errors, port conflicts, or database connection failures,
fix the cause, then rebuild if required.

### Q19. How would you make it production-ready?

**Answer:** I would use multi-stage builds, compile TypeScript and run
the backend's compiled JavaScript, serve the built frontend assets with
a production web server, reduce image contents, run as a non-root user,
configure health checks and managed secrets, scan images, and add CI/CD.
I would test production configuration separately.

### Q20. What did you learn?

**Answer:** I learned to package separate frontend and backend services,
coordinate them with Compose, manage build contexts and environment
variables, and debug real dependency and startup issues. I learned that
a successful local build does not guarantee a container will start;
runtime dependencies, configuration, networking, and logs must also be
checked.

## 11. A 30-second interview pitch

> "I containerized my LaunchLens full-stack application using Docker and
> Docker Compose. I created separate Dockerfiles for the React/Vite
> frontend and Node.js/Express backend, configured port mappings and
> runtime environment variables, and used `.dockerignore` files to keep
> local dependencies and environment files out of the build context. The
> backend uses Prisma to connect to the existing Supabase PostgreSQL
> database. During testing, I resolved a frontend lockfile inconsistency
> and a missing backend dependency, rebuilt the images, and verified
> that the application worked locally. The current setup is
> development-oriented; production hardening would be the next step."

## 12. Resume bullet

**Dockerized LaunchLens** by creating separate Docker images for the
React/Vite frontend and Node.js/Express backend, orchestrating both
services with Docker Compose, configuring ports and runtime environment
variables, and troubleshooting dependency and container startup issues
while retaining the existing Supabase PostgreSQL database.

## Final checklist

-   [x] Frontend Dockerfile created
-   [x] Backend Dockerfile created
-   [x] Root and service-specific `.dockerignore` files created
-   [x] Compose configuration validated
-   [x] Both images built
-   [x] Containers started
-   [x] Missing backend runtime dependency fixed
-   [x] User confirmed the app works locally
-   [ ] Production-optimized Dockerfiles
-   [ ] Health checks and production security hardening
-   [ ] CI/CD and registry workflow

**Interview accuracy:** Say you containerized and tested the application
locally with a development setup. Do not claim PostgreSQL was
containerized or that the architecture is production-hardened.
