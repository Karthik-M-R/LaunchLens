# LaunchLens: Key Project Issues & Solutions

This document outlines the major challenges faced during the development and deployment of the LaunchLens platform and the technical solutions implemented to resolve them. This is intended as a quick reference for technical interviews and architecture discussions.

---

## 1. Production Login Session Persistence Issue
**The Problem:**
In the local development environment, user login worked perfectly. However, after deploying the application (frontend on Vercel, backend on Render), users were unable to maintain their logged-in session. The `GET /api/auth/me` request was returning a 401 Unauthorized error because the authentication cookie was not being sent by the browser.

**The Cause:**
The backend API was setting the authentication cookie with `SameSite=Lax`. While this works locally, modern browsers block `Lax` cookies from being sent in cross-site requests (where the frontend and backend are hosted on different domains).

**The Solution:**
* **Dynamic Cookie Configuration:** Updated the backend authentication controllers (login/logout) to dynamically detect the environment (`NODE_ENV` or an HTTPS `FRONTEND_URL`).
* **Cross-Site Cookie Attributes:** In production, the HTTP-only auth token is now set with `Secure: true` (requires HTTPS) and `SameSite: 'none'` (allows cross-site delivery). 
* **Frontend Configuration:** Ensured that Axios interceptors on the frontend were configured with `withCredentials: true` to properly attach the cookie to cross-origin requests.

---

## 2. Cross-Origin Resource Sharing (CORS) Blockages
**The Problem:**
During the initial deployment phase, the frontend could not communicate with the backend. The browser's console threw strict CORS policy errors, preventing API requests from executing.

**The Cause:**
The backend Express server's CORS middleware was either not configured or strictly bound to `localhost`. When the frontend was deployed to its production URL, the backend rejected the unrecognized origin.

**The Solution:**
* **Origin Allow-listing:** Updated the backend CORS configuration to accept requests specifically from the deployed frontend URL (passed via environment variables).
* **Credentials Support:** Explicitly enabled `credentials: true` in the backend CORS settings to allow cookies and authorization headers to pass through securely.

---

## 3. Frontend SPA Routing on Vercel
**The Problem:**
After deploying the React frontend to Vercel, navigating directly to a route (e.g., `/dashboard` or `/projects`) or refreshing the page resulted in a 404 Not Found error.

**The Cause:**
LaunchLens is a Single Page Application (SPA). Vercel's default static server expects a physical file for every route. When a user requests `/dashboard`, the server looks for a `dashboard.html` file, which doesn't exist (only `index.html` does).

**The Solution:**
* **Vercel Rewrites:** Added a `vercel.json` configuration file to the frontend root.
* **Catch-All Routing:** Configured a rewrite rule `"source": "/(.*)", "destination": "/index.html"` to ensure all requests fall back to `index.html`, allowing React Router to handle the client-side navigation.

---

## 4. Redirect Engine Tracking Integrity
**The Problem:**
The application needed to track unique visitors interacting with the campaign links, but relying purely on IP addresses was inaccurate and raised privacy concerns. 

**The Cause:**
Standard tracking implementations often fail to differentiate between users on the same network or fail to persist tracking across sessions without heavy fingerprinting.

**The Solution:**
* **UUID Implementation:** Re-architected the redirect engine to generate and store a unique UUID for each visitor.
* **Database Schema Update:** Modified the Prisma schema to accommodate precise analytics tracking, ensuring that link clicks and unique visitors are accurately incremented without violating user privacy.

---

## 5. AI Campaign Insights Hallucination
**The Problem:**
The AI Campaign Insights feature was generating completely unrelated, hallucinated data (e.g., random campaign names like "Summer Sale 2024", fictional click counts, and fake timelines) instead of analyzing the actual campaign analytics.

**The Cause:**
A syntax error existed in the prompt builder logic (`buildUserPrompt`). The template literal variables (e.g., `\${context.campaignName}`) were accidentally escaped with backslashes. As a result, the AI provider received the literal placeholder strings instead of the actual data from the database. Lacking any real numbers but instructed to analyze the data, the LLM hallucinated generic metrics.

**The Solution:**
* **Template Syntax Fix:** Removed the escaping backslashes from the AI prompt template so that analytics data correctly interpolates into the prompt.
* **Prompt Engineering:** Updated the system instructions to command the AI to return a specific `data_quality` insight when provided with insufficient data.
* **Backend Grounding Safeguard:** Implemented lightweight validation in the insight service. If a campaign has zero clicks, the backend overrides any hallucinated trends or traffic insights and strictly defaults to returning an "Insufficient Data" insight.
