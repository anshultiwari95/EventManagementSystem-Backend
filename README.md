# Event Management System – Backend

Node.js + Express + MongoDB backend for the Event Management System, handling profiles, events, and event history logs.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Other**: CORS, dotenv

## Repositories & Live URLs

- **Frontend repo**: `https://github.com/anshultiwari95/EventManagementSystem-Frontend`
- **Backend repo**: `https://github.com/anshultiwari95/EventManagementSystem-Backend`
- **Deployed backend (Render)**: `https://eventmanagementsystem-backend-v8xv.onrender.com/`
- **Deployed frontend (Vercel)**: `https://event-management-system-frontend-sigma.vercel.app/`

## Getting Started (Local)

1. **Clone and install**

   ```bash
   git clone https://github.com/anshultiwari95/EventManagementSystem-Backend.git
   cd EventManagementSystem-Backend
   npm install
   ```

2. **Environment variables**

   Create a `.env` file in the project root:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=8080 # optional, defaults to 8080
   ```

3. **Run the server**

   ```bash
   # development (with nodemon)
   npm run dev

   # production
   npm start
   ```

   By default the API will be available at `http://localhost:8080`.

## API Overview

Base URL (local): `http://localhost:8080`  
Base URL (production): `https://eventmanagementsystem-backend-v8xv.onrender.com/`

### Profiles

- **Create profile**
  - `POST /api/profiles`
  - Body:
    ```json
    {
      "name": "John Doe"
    }
    ```

- **Get all profiles**
  - `GET /api/profiles`

### Events

- **Create event**
  - `POST /api/events`
  - Example body:
    ```json
    {
      "profiles": ["<profileId1>", "<profileId2>"],
      "eventTimezone": "IST",
      "startTimeUTC": "2025-02-28T10:00:00.000Z",
      "endTimeUTC": "2025-02-28T11:00:00.000Z"
    }
    ```

- **Get events**
  - `GET /api/events`
  - Returns events populated with their `profiles`.

- **Update event (with logging)**
  - `PUT /api/events/:id`
  - Example body:
    ```json
    {
      "startTimeUTC": "2025-02-28T12:00:00.000Z",
      "endTimeUTC": "2025-02-28T13:00:00.000Z",
      "profiles": ["<profileId1>"]
    }
    ```
  - The previous and new values are stored in the `logs` array for each event.

## Deployment Notes

- Ensure `MONGO_URI` is configured in your hosting provider’s environment settings.
- The server listens on `process.env.PORT || 8080`, which most platforms (e.g. Render) will override automatically.

