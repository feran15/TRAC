# TRAC

A lightweight Transaction Tracker (TRAC) API built with Node.js, Express, and MongoDB (Mongoose). The app provides user authentication, POS account management (CRUD), and calculation routes for transaction operations.

---

## Quick start ✅

### Requirements
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas) or Docker

### Setup (local)
1. Clone the repo and change to project directory
   ```bash
   git clone <repo-url>
   cd TRAC
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with at least the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/tracdb
   PORT=5000
   JWT_SECRET=replace_with_a_strong_random_secret
   ```

   Tip: generate a strong secret with Node.js:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. Start the server:
   - Dev (auto-reload): `npm run dev`
   - Prod: `npm start`

Server will run on `http://localhost:5000` by default.

### Run with Docker 🐳
If you prefer Docker, start the services (app + mongo):
```bash
docker-compose up --build
```
The API will be available at `http://localhost:5000` and MongoDB at `mongodb://localhost:27017`.

---

## Testing the API 🔧
You can test endpoints with curl, Postman, or any REST client.

Example: register a user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Secret123"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"Secret123"}'
```

Use the returned token as `Authorization: Bearer <token>` for protected routes.

---

## Swagger API docs (OpenAPI)

- Install new deps (if you haven't already):
  ```bash
  npm install swagger-jsdoc swagger-ui-express
  ```
- Start the server and open: `http://localhost:5000/api/docs`

The Swagger setup scans `./routes/*.js` and `./Controllers/*.js` for JSDoc annotations — add `@openapi`/JSDoc comments in route files to expand the docs.

---

## Notes & suggestions 💡
- The test script in `package.json` is a placeholder. Consider adding automated tests with Jest + Supertest.
- On Linux/CI be careful with filename casing (e.g., `controllers` vs `Controllers`).

---

If you'd like, I can:
- Add a couple of JSDoc comments to a few endpoints so the Swagger UI shows example endpoints, or
- Add a `README` section with example Postman collection exports.
 
