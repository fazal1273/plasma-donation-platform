# PlasmaLink — Frontend (Connected to Spring Boot @ localhost:8081)

React + Vite + Tailwind + TypeScript frontend wired to the Spring Boot backend via Axios.

## Setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` (or 8080 per `vite.config.ts`) and calls the
Spring Boot backend at **`http://localhost:8081`**.

## Configure backend URL

Edit `.env` at the project root:

```
VITE_API_URL=http://localhost:8081
```

Restart `npm run dev` after changing env vars.

## Backend endpoints used

| Method | Endpoint                | Purpose             |
|--------|-------------------------|---------------------|
| POST   | /auth/signup            | Register user       |
| POST   | /auth/login             | Login → JWT         |
| GET    | /api/donors             | List all donors     |
| POST   | /api/donors             | Add donor (auth)    |
| GET    | /api/donors/search      | ?bloodGroup=&location= |

JWT is stored in `localStorage` and auto-attached as `Authorization: Bearer <token>`.

## Make sure CORS is enabled in Spring Boot

In `SecurityConfig.java`, allow origin `http://localhost:5173` (or `8080`).

## Folder structure

```
src/
  api/           # axios client + endpoint wrappers
    client.ts
    auth.ts
    donors.ts
  store/         # auth + donor state (calls API)
  pages/         # Login, Signup, Dashboard, Donors, AddDonor, ...
  components/    # UI + sidebar/navbar
```
