# Plasma Donation Platform — Spring Boot Backend

Backend for the **PlasmaLink** application. Pairs with the React frontend.

## Stack
- Spring Boot 3.3 (Java 17)
- Spring Web, Spring Data JPA, Spring Security
- JWT authentication (jjwt 0.12)
- MySQL 8
- Lombok

## Project Structure
```
src/main/java/com/plasma/
├── PlasmaBackendApplication.java
├── config/SecurityConfig.java
├── controller/{AuthController, DonorController}.java
├── dto/{AuthDtos, DonorDto}.java
├── entity/{User, Donor}.java
├── repository/{UserRepository, DonorRepository}.java
├── security/{JwtUtil, JwtFilter}.java
└── service/{AuthService, DonorService}.java
```

## Setup

### 1. Prerequisites
- Java 17+
- Maven 3.9+
- MySQL 8+

### 2. Database
```bash
mysql -u root -p < schema.sql
```
Or let JPA auto-create (`spring.jpa.hibernate.ddl-auto=update` in `application.properties`).

### 3. Configure
Edit `src/main/resources/application.properties` with your MySQL credentials.

### 4. Run
```bash
mvn spring-boot:run
```
Server starts on `http://localhost:8080`.

## API Endpoints

### Auth
| Method | Path | Body |
|--------|------|------|
| POST | `/auth/signup` | `{ "name", "email", "password" }` |
| POST | `/auth/login`  | `{ "email", "password" }` |

Returns: `{ "token", "name", "email" }`

### Donors
| Method | Path | Description |
|--------|------|-------------|
| GET  | `/api/donors` | List all donors |
| POST | `/api/donors` | Add donor |
| GET  | `/api/donors/search?bloodGroup=O+&location=Mumbai` | Filter |

## Postman Examples

**Signup**
```
POST http://localhost:8080/auth/signup
Content-Type: application/json

{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```

**Login**
```
POST http://localhost:8080/auth/login
Content-Type: application/json

{ "email": "jane@example.com", "password": "secret123" }
```

**Add Donor**
```
POST http://localhost:8080/api/donors
Content-Type: application/json

{
  "name": "Rahul K.",
  "bloodGroup": "O+",
  "location": "Mumbai",
  "contact": "+91 99887 76655",
  "lastDonationDate": "2025-03-12"
}
```

**Search**
```
GET http://localhost:8080/api/donors/search?bloodGroup=O%2B&location=Mumbai
```

## Connecting the React Frontend

In your React app, create `src/api/client.ts`:
```ts
import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:8080" });
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
export default api;
```

Then replace mock store calls with:
- `api.post("/auth/signup", {...})`
- `api.post("/auth/login", {...})`
- `api.get("/api/donors")`
- `api.post("/api/donors", {...})`
- `api.get("/api/donors/search", { params: { bloodGroup, location } })`

## Notes
- CORS is open by default for development; restrict origins in production.
- `/api/donors` is public for demo simplicity; switch to `.authenticated()` in `SecurityConfig` for production and send the JWT.
- Replace `app.jwt.secret` with a strong base64-encoded key (>= 32 bytes).
