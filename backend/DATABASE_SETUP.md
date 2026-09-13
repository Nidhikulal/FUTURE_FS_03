# Setting up MongoDB Atlas (free tier)

1. **Create an account** at https://www.mongodb.com/cloud/atlas/register (free, no card needed for the free tier).

2. **Create a free cluster**
   - Click "Build a Database" → choose the **M0 Free** tier.
   - Pick any cloud provider/region close to you.
   - Name the cluster anything (e.g. `pooja-arrangers`).

3. **Create a database user**
   - Under "Database Access", add a new user with a username and password.
   - Save these — you'll need them in the connection string.

4. **Allow network access**
   - Under "Network Access", add an IP entry.
   - For quick testing, "Allow access from anywhere" (0.0.0.0/0) is easiest. Restrict this later for production.

5. **Get your connection string**
   - Go to "Database" → "Connect" → "Drivers" → select Node.js.
   - Copy the string, it looks like:
     `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with the user you created.
   - Add a database name before the `?`, e.g. `.../pooja-arrangers?retryWrites=true...`

6. **Configure the backend**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Paste your connection string into `.env` as `MONGODB_URI=...`

7. **Install dependencies and seed the catalog**
   ```bash
   npm install
   node seed.js
   ```
   This loads the catering/decoration/lighting/DJ catalog into your database once. Re-run it any time you want to reset the catalog back to its defaults.

8. **Run the backend**
   ```bash
   npm run dev
   ```
   You should see `Connected to MongoDB` followed by the server starting on port 5000.

## Notes
- Orders submitted through the website are now saved in the `orders` collection in MongoDB — you can view them in the Atlas UI under "Browse Collections", or by calling `GET /api/orders`.
- The catalog (menu items, prices, decoration packages) lives in the `catalogs` collection as a single document. To edit prices or add items later without touching code, you (or I) can build a small admin page, or you can edit the document directly in the Atlas UI.
- `backend/data/orders.json` is no longer used and can be deleted.
