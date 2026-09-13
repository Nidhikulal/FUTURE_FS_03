# Pooja Arrangers & Caterers — Full Stack Website

A complete full-stack demo for a local event-services business.

## Features

- Catering configurator: guest count, menu categories/items, live price calculation, cart-style summary.
- DJ & Sound configurator: choose setup, speakers/boxes, microphones and extras.
- Lighting booking: choose lighting package and quantity.
- Decoration catalog: choose event category and budget range; matching decoration photos/cards are displayed.
- Decoration booking with event date, venue and customer details.
- Unified cart/order summary.
- Checkout form that sends the order to the Express backend.
- Backend stores orders in a local JSON file, so no database setup is required.
- Responsive/mobile-friendly UI.
- WhatsApp-style contact CTA.

## Requirements

- Node.js 18+ recommended
- npm

## Run

Open two terminals.

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the URL shown by Vite, normally `http://localhost:5173`.

If you deploy the frontend separately, create `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

## Notes

The product prices and business contact details are sample/demo data. Replace them with the actual Pooja Arrangers & Caterers information before presenting it to the business.

Decoration images currently use remote Unsplash image URLs for the demo. Replace them with the business's real photos for a client-ready version.
