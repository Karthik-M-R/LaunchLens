# 🚀 LaunchLens

> **AI-powered marketing attribution and campaign analytics platform for indiehackers,
> soloprenuers,entrepreneurs,creators, founders, freelancers, agencies, and small businesses.**

LaunchLens helps users create campaign-specific tracking links, collect
click events, analyze campaign traffic, and turn deterministic analytics
into actionable AI-generated insights.

## 🌐 Live

- **Frontend:** https://launch-lens-beta.vercel.app
- **Backend API:** https://launchlens-backend.onrender.com
- **Repository:** https://github.com/Karthik-M-R/LaunchLens

## ✨ Features

- 🔐 User signup/login with bcrypt, JWT authentication, and HTTP-only
  cookies
- 📁 Project and campaign management
- 🔗 Campaign-specific tracking links
- 📈 Click analytics and timeline visualization
- 👥 Unique visitor analytics
- 💻 Device analytics
- 🌐 Browser analytics using HTTP User-Agent parsing
- 🔎 Referrer/source analytics
- 🤖 AI-powered campaign summaries, insights, and recommendations
- 🔄 Multi-provider AI fallback
- 🐳 Containerized multi-service development with Docker and Docker Compose
- ☁️ Production deployment with Vercel, Render, and Supabase
  PostgreSQL

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     User Browser    │
                    └──────────┬──────────┘
                               │ HTTPS
                               ▼
                    ┌─────────────────────┐
                    │ React + Vite        │
                    │ TypeScript          │
                    └──────────┬──────────┘
                               │ Axios
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │ TypeScript API      │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          Authentication   Analytics      AI Layer
                 │             │             │
                 └─────────────┼─────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Prisma ORM          │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ PostgreSQL          │
                    │ Supabase            │
                    └─────────────────────┘
```

## 🧰 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- bcrypt
- JSON Web Tokens
- cookie-parser
- CORS
- Zod
- ua-parser-js

### AI

- Google Gemini
- Groq
- Mistral
- Provider abstraction and fallback

### Containerization & Deployment

- Docker & Docker Compose --- multi-container local development
- Vercel --- frontend production deployment
- Render --- backend production deployment
- Supabase --- managed PostgreSQL

## 📁 Project Structure

```text
LaunchLens/
├── compose.yaml                        # Multi-container Compose configuration
├── .dockerignore                       # Root Docker build ignore rules
├── backend/
│   ├── Dockerfile                      # Backend Node.js 22 container definition
│   ├── .dockerignore                   # Backend Docker build ignore rules
│   ├── package.json
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── ai/
│   │   ├── app.ts
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── server.ts
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── validation/
│   └── tsconfig.json
├── frontend/
│   ├── Dockerfile                      # Frontend Vite development container
│   ├── .dockerignore                   # Frontend Docker build ignore rules
│   ├── index.html
│   ├── package.json
│   ├── public/
│   ├── README.md
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── validation/
│   ├── tsconfig.json
│   ├── vercel.json
│   └── vite.config.ts
└── README.md
```

## 🗄️ Database Design

LaunchLens uses PostgreSQL through Supabase and Prisma.

The core domain follows:

```text
User
 │
 └──< Project
          │
          └──< Campaign
                  │
                  ├──< TrackingLink
                  └──< ClickEvent
```

### Core models

- **User** --- application users and authentication data
- **Project** --- groups campaigns owned by a user
- **Campaign** --- marketing campaign and destination URL
- **TrackingLink** --- campaign-specific public tracking slug/link
- **ClickEvent** --- individual click and traffic metadata

The authoritative schema is located at:

```text
backend/prisma/schema.prisma
```

## 🔄 Core Data Flow

### Campaign creation

```text
React UI
  ↓
Axios
  ↓
Express route
  ↓
Controller
  ↓
Prisma
  ↓
PostgreSQL
  ↓
Response
  ↓
React UI
```

### Tracking-link click

```text
Visitor
  ↓
GET /r/:slug
  ↓
Express redirect route
  ↓
Find campaign/tracking link
  ↓
Read request metadata
  ↓
Create ClickEvent
  ↓
Redirect to destination URL
```

### Analytics

```text
ClickEvents
  ↓
Analytics service
  ├── Total clicks
  ├── Unique visitors
  ├── Timeline
  ├── Devices
  ├── Browsers
  └── Referrers
  ↓
Analytics API
  ↓
React dashboard
  ↓
Charts + metrics
```

## 🤖 AI Insights Architecture

LaunchLens calculates campaign metrics in the backend first. The AI
layer interprets those trusted analytics.

```text
PostgreSQL
    ↓
Analytics Service
    ↓
Structured Analytics
    ↓
Prompt Builder
    ↓
AI Provider
    ├── Gemini
    ├── Groq
    └── Mistral
    ↓
Structured AI Response
    ↓
Validation / Parsing
    ↓
Frontend
```

The LLM is used for interpretation and recommendations rather than being
trusted to calculate core campaign metrics.

### Provider fallback

```text
Gemini
  ↓ failure
Groq
  ↓ failure
Mistral
  ↓ failure
Controlled error
```

If one provider succeeds, the fallback loop stops and its result is
returned.

## 🌐 Browser Detection

When a visitor clicks a tracking link, the browser sends a `User-Agent`
HTTP request header.

LaunchLens uses `ua-parser-js` to parse that information:

```text
HTTP Request
     ↓
User-Agent header
     ↓
UAParser
     ├── Browser
     └── Device
     ↓
ClickEvent
     ↓
Analytics
```

Browser detection is useful for understanding the technical environment
of campaign visitors. Because it is based on User-Agent information, it
is not perfect; some browsers can identify themselves similarly and may
be classified under another browser family.

## 🔐 Authentication

Authentication follows a JWT-based flow:

```text
Login
  ↓
Validate credentials
  ↓
bcrypt password comparison
  ↓
Create JWT
  ↓
HTTP-only cookie
  ↓
Browser
```

For protected requests:

```text
Browser
  ↓
Cookie
  ↓
Authentication middleware
  ↓
JWT verification
  ↓
req.user
  ↓
Protected controller
```

The backend also performs resource ownership checks so users cannot
access campaigns/projects belonging to other users.

## 🔌 API Communication

The frontend uses Axios with an environment-based API URL.

Local development:

```env
VITE_API_URL=http://localhost:5000
```

Production:

```env
VITE_API_URL=https://launchlens-backend.onrender.com
```

The production request path is:

```text
React
  ↓
Axios
  ↓
https://launchlens-backend.onrender.com/api
  ↓
Express
```

## ⚙️ Local Development

You can run LaunchLens locally using either **Docker Compose** (recommended for zero-dependency consistency) or standard **manual setup** with Node.js and npm.

### Option A: Docker Compose (Recommended)

Docker Compose builds and starts both frontend and backend containers in a single command, ensuring reproducible Node.js 22 runtime environments.

#### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- External PostgreSQL database (e.g. Supabase)

#### 2. Configure Backend Secrets
Create `backend/.env` with your database and API credentials:

```env
DATABASE_URL=your_supabase_postgresql_url
DIRECT_URL=your_supabase_direct_url
JWT_SECRET=your_jwt_secret_key
PORT=5000
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
MISTRAL_API_KEY=your_mistral_key
```

#### 3. Build & Run
Run from the root directory:

```bash
# Build images and start containers in the background
docker compose up --build -d

# Check running status
docker compose ps

# Follow logs in real-time
docker compose logs -f
```

- **Frontend:** Open `http://localhost:5173` in your browser
- **Backend API:** Available at `http://localhost:5000`

#### 4. Stop Services
```bash
docker compose down
```

---

### Option B: Manual Local Setup (Node.js & npm)

#### Prerequisites
- Node.js (v20+ or v22 recommended)
- npm
- PostgreSQL/Supabase database
- Required AI provider API key(s)

#### Clone
```bash
git clone https://github.com/Karthik-M-R/LaunchLens.git
cd LaunchLens
```

#### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Configure backend secrets and environment variables in `backend/.env`.

Typical configuration includes:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
MISTRAL_API_KEY=your_key
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

> Never commit real API keys, JWT secrets, database credentials, or `.env` files.

---

## 🐳 Docker Architecture & Deep Dive

LaunchLens containerizes the application tier using Docker and Docker Compose for consistent development across platforms:

```text
Host Browser
     │
     ├─► http://localhost:5173 ──► Frontend Container (React + Vite, host 0.0.0.0)
     │                                  │
     │                                  │ Browser API requests (Axios)
     │                                  ▼
     └─► http://localhost:5000 ◄── Backend Container (Express + Prisma, tsx watch)
                                        │
                                        │ DATABASE_URL / DIRECT_URL
                                        ▼
                                 Supabase PostgreSQL (Cloud Database)
```

### Container Services

| Service | Dockerfile | Base Image | Host Port | Container Port | Purpose |
|---------|------------|------------|-----------|----------------|---------|
| `backend` | `backend/Dockerfile` | `node:22` | `5000` | `5000` | Express REST API, Prisma ORM, AI attribution service |
| `frontend` | `frontend/Dockerfile` | `node:22` | `5173` | `5173` | Vite dev server with `--host 0.0.0.0` for host browser access |

*Note: PostgreSQL remains hosted on Supabase (cloud DB) to match production parity and avoid local data loss.*

### Key Docker Implementation Details

1. **Layer Caching:** Both Dockerfiles copy `package*.json` and run `npm ci` before copying source code. When source code changes, Docker reuses cached dependency layers for fast rebuilds.
2. **Prisma Generation in Image:** The backend Dockerfile executes `RUN npx prisma generate` after copying source code so the Prisma client engine is generated for the Linux container environment.
3. **Vite Host Binding:** Vite runs with `--host 0.0.0.0` in the frontend container so the host machine can access port 5173 through Docker's bridge network.
4. **Build Context Isolation:** Root `.dockerignore`, `backend/.dockerignore`, and `frontend/.dockerignore` prevent host `node_modules`, build artifacts (`dist`), `.git`, and `.env` secrets from leaking into container images.
5. **Browser-to-Backend Resolution:** The frontend client runs in the host browser, which calls `http://localhost:5000` mapped from the backend container.

### Useful Docker Commands

```bash
# Validate Compose configuration syntax
docker compose config --quiet

# Rebuild and restart only the backend service
docker compose up -d --build backend

# Rebuild and restart only the frontend service
docker compose up -d --build frontend

# View logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend

# View recent 50 log lines
docker compose logs --tail 50

# Execute a shell command inside the backend container
docker compose exec backend npx prisma studio

# Stop containers and remove Compose networks
docker compose down
```

## 🚀 Production Deployment

### Frontend --- Vercel

```text
Root Directory: frontend
Framework: Vite
```

Production variable:

```env
VITE_API_URL=https://launchlens-backend.onrender.com
```

### Backend --- Render

The backend is deployed from the `backend` directory.

Build process:

```bash
npm install
npx prisma generate
npm run build
```

Start command:

```bash
npm start
```

Production configuration includes environment variables such as:

```env
DATABASE_URL=...
JWT_SECRET=...
APP_URL=https://launchlens-backend.onrender.com
FRONTEND_URL=https://launch-lens-beta.vercel.app
GEMINI_API_KEY=...
GROQ_API_KEY=...
MISTRAL_API_KEY=...
```

## 🛡️ Security

Implemented security practices include:

- bcrypt password hashing
- JWT authentication
- HTTP-only authentication cookies
- Rate limiting on sensitive endpoints (e.g. login brute-force prevention with `express-rate-limit`)
- CORS configuration
- environment-based secrets
- user/resource ownership checks
- input validation where implemented
- Prisma-based database access
- HTTPS in production

Potential future improvements:

- Distributed Redis rate limiting across all API endpoints
- Bot detection
- Advanced abuse prevention
- Centralized monitoring/logging
- Stronger CSRF protections where appropriate
- More advanced IP/geo enrichment

## 🧪 Verification

TypeScript can be checked with:

```bash
npx tsc --noEmit
```

The production flow should be verified end-to-end:

```text
Landing Page
    ↓
Signup / Login
    ↓
Dashboard
    ↓
Project
    ↓
Campaign
    ↓
Tracking Link
    ↓
Click Event
    ↓
Analytics
    ↓
AI Insights
```

## 🧩 Engineering Highlights

LaunchLens provided practical experience with:

- Full-stack application architecture
- REST API design
- Authentication and authorization
- PostgreSQL relational modeling
- Prisma ORM
- Docker & Docker Compose containerization
- Multi-container development workflow & port forwarding
- Tracking and redirect pipelines
- HTTP User-Agent parsing
- Analytics aggregation
- AI provider abstraction
- LLM prompt grounding
- Structured AI output
- External API fallback
- Environment configuration
- CORS and credentialed requests
- Vercel/Render deployment
- Production debugging

## 📈 Future Improvements

Possible V2 improvements include:

- UTM management
- Conversion and revenue attribution
- Multi-touch attribution
- Bot detection
- Rate limiting
- Redis caching
- Background job processing
- Higher-volume event ingestion
- Better geo enrichment
- Custom domains
- Team workspaces and RBAC
- Campaign comparison
- Exportable reports
- AI insight evaluation
- Cost-aware AI provider routing

## 🎯 Product Flow

```text
Create Campaign
      ↓
Generate Tracking Link
      ↓
Share Link
      ↓
Collect Click Events
      ↓
Analyze Traffic
      ↓
Understand Campaign Performance
      ↓
Generate AI Insights
      ↓
Take Action
```

## 👨‍💻 Author

**Karthik M R**

Computer Science Engineering student focused on software engineering,
backend development, AI engineering, full-stack development, and DSA.
