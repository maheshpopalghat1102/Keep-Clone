# Keep Clone

A full-stack note-taking application inspired by Google Keep, built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Features

- User authentication with JWT (register, login, profile)
- Protected routes for authenticated users
- Create, edit, pin, archive, trash, restore, and permanently delete notes
- Note customization with colors and optional image attachments
- Search notes by title/content
- Separate views for active notes, archived notes, and trash
- Account deletion endpoint (removes user and associated notes)
- Secure backend defaults with CORS, Helmet, and centralized error handling

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs
- Database: MongoDB

## Project Structure

```text
Keep-Clone/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      server.js
  frontend/
    src/
      components/
      pages/
      services/
      App.jsx
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret>
JWT_EXPIRE=30d
CLIENT_URLS=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB Atlas or local MongoDB instance

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Configure environment files

- Create `backend/.env` using the backend variables above.
- Create `frontend/.env` using `frontend/.env.example` as reference.

### 3) Run the app

Use two terminals.

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`  
Backend API: `http://localhost:5000`

## API Overview

### Auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (protected)
- `DELETE /api/auth/account` (protected)

### Note routes (all protected)

- `POST /api/notes`
- `GET /api/notes`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Production Notes

- In production, backend serves `frontend/dist` when available.
- Build frontend with:

```bash
cd frontend
npm run build
```

- Start backend with:

```bash
cd backend
npm start
```
