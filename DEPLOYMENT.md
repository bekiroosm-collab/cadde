# Deployment Guide

## Backend (Render / Railway)

1.  **Create a new Web Service** on Render or Railway.
2.  **Connect your GitHub repository**.
3.  **Root Directory:** `backend`
4.  **Build Command:** `npm install`
5.  **Start Command:** `npm start`
6.  **Environment Variables:**
    *   `NODE_ENV`: production
    *   `MONGO_URI`: Your MongoDB Atlas Connection String
    *   `JWT_SECRET`: A strong secret key
    *   `PORT`: 5000 (or let Render assign one)

## Frontend (Vercel)

1.  **Create a new Project** on Vercel.
2.  **Connect your GitHub repository**.
3.  **Root Directory:** `frontend`
4.  **Framework Preset:** Vite
5.  **Build Command:** `npm run build`
6.  **Output Directory:** `dist`
7.  **Environment Variables:**
    *   `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://my-backend.onrender.com/api`)
    *   Note: You will need to update `frontend/src/context/AuthContext.jsx` and `frontend/src/components/Chat.jsx` to use this ENV variable instead of hardcoded `localhost:5000`.

## MongoDB Atlas

1.  Create a cluster.
2.  Create a database user.
3.  Get the connection string (Driver: Node.js) and add it to Backend Environment Variables.
