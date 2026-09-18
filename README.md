# Pooja Arrangers & Caterers

A full-stack event booking website for a catering, decoration, lighting and DJ/sound business based in Haleyangady, Mangaluru.

Customers can browse services, build a custom event package (catering menu, DJ/sound setup, lighting, decoration design), see a live price estimate, and submit a booking request — all saved to a cloud database.

**Live site:**https://future-fs-03-j29j.vercel.app/
---

## Features

- **Catering configurator** — guest count, menu categories split into **Veg** and **Non-Veg** (with colour-coded indicator dots), live price calculation.
- **DJ & Sound configurator** — choose setup tier, speakers/boxes, microphones, and extras.
- **Lighting booking** — choose a lighting package and quantity.
- **Decoration catalog** — browse designs by event category (Wedding, Mehndi, Reception, Engagement, Birthday) in a horizontally scrollable, swipeable carousel, with a click-to-enlarge lightbox view for each photo.
- **Decoration booking** — capture event date, venue, and guest details per design.
- **Unified event plan / cart** with a running total and a single checkout form.
- **Booking submission** — saved directly to MongoDB, with a generated order ID and confirmation.
- **Photo gallery** section with real event photos.
- **Embedded Google Maps** location in the footer.
- **Custom branding** — business logo in the navbar and browser favicon.
- **Fully responsive** — compact 2×2 service grid and swipeable carousels on mobile.
- **WhatsApp / call-to-action buttons** for quick enquiries.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React + Vite                         |
| Backend   | Node.js + Express                    |
| Database  | MongoDB Atlas (via Mongoose)         |
| Hosting   | Vercel (frontend + backend as two services in one project) |

---

## Project Structure

```
business-website/
├── backend/
│   ├── api/
│   │   └── index.js        # Serverless entry point used by Vercel
│   ├── models/
│   │   ├── Order.js         # Booking/order schema
│   │   └── Catalog.js       # Catalog schema (menu, DJ, lighting, decoration)
│   ├── server.js            # Express app for local development (npm run dev)
│   ├── db.js                # MongoDB connection helper (local dev)
│   ├── seed.js               # One-time script to load catalog data into MongoDB
│   ├── vercel.json           # Vercel serverless config
│   ├── .env.example
│   └── DATABASE_SETUP.md     # Step-by-step MongoDB Atlas setup guide
└── frontend/
    ├── index.html
    ├── public/
    │   ├── logo.png
    │   └── images/
    │       ├── decoration/    # Decoration catalog photos
    │       └── gallery/       # Homepage gallery photos
    └── src/
        ├── main.jsx           # All React components
        └── styles.css
```

---

## Local Development Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pooja-arrangers?retryWrites=true&w=majority
PORT=5000
```

> New to MongoDB Atlas? Follow `backend/DATABASE_SETUP.md` for a full step-by-step guide to creating a free cluster.

Load the catalog into your database (run once, or any time you want to reset it to defaults):

```bash
node seed.js
```

Start the backend:

```bash
npm run dev
```

Runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` (or the port Vite prints).

If your backend isn't on `localhost:5000` — for example, when testing on your phone over WiFi — create `frontend/.env`:

```env
VITE_API_URL=http://<your-computer-local-ip>:5000/api
```

To browse the site from your phone during development, run `npm run dev -- --host` and open your computer's local network address on your phone (both devices must be on the same WiFi).

---

## Deployment (Vercel)

This project deploys as **two services inside one Vercel project** — a Vite frontend and an Express backend — sharing the same domain, with backend routes mounted under `/api`.

1. Push the repository to GitHub.
2. In Vercel, import the repo. It should auto-detect both services:
   - `frontend` → Vite → served at `/`
   - `backend` → Express → served at `/api`
3. Add environment variables:
   - **Backend service:** `MONGODB_URI` = your MongoDB Atlas connection string
   - **Frontend service:** `VITE_API_URL` = `/api`
4. In MongoDB Atlas → Network Access, allow `0.0.0.0/0` (required since serverless functions run on dynamic IPs).
5. Deploy. Vercel gives you a single live URL for the whole site.

---

## API Endpoints

| Method | Endpoint         | Description                    |
|--------|------------------|----------------------------------|
| GET    | `/api/health`    | Health check                     |
| GET    | `/api/catalog`   | Returns the full catalog          |
| POST   | `/api/orders`    | Submits a new booking             |
| GET    | `/api/orders`    | Lists all submitted orders        |

---

## Notes

- **Never commit `.env`** — it contains live database credentials. Confirm it's listed in `.gitignore`.
- To change menu items, prices, DJ/lighting packages, or decoration designs, edit the `catalogData` object in `backend/seed.js` and re-run `node seed.js` to push the update into MongoDB.
- Decoration and gallery photos live in `frontend/public/images/` — replace or add files there and update the matching paths in `seed.js` (decoration) or `main.jsx` (gallery).
- Double-check the business phone number and address shown in the footer/contact sections are accurate before going live.
