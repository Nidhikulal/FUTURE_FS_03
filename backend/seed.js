// Run once (or whenever you want to reset the catalog back to defaults):
//   node seed.js
import "dotenv/config";
import { connectDB } from "./db.js";
import Catalog from "./models/Catalog.js";

const catalogData = {
  catering: {
    "South Indian Breakfast": [
      { id: "idli-vada", name: "Idli & Vada", unit: "person", price: 90, veg: true },
      { id: "dosa", name: "Dosa", unit: "person", price: 110, veg: true },
      { id: "poori", name: "Poori Masala", unit: "person", price: 100, veg: true },
      { id: "upma", name: "Upma", unit: "person", price: 80, veg: true },
      { id: "coffee", name: "Tea / Coffee", unit: "person", price: 35, veg: true }
    ],
    "Lunch & Dinner": [
      { id: "veg-meal", name: "Traditional Veg Meal", unit: "person", price: 220, veg: true },
      { id: "special-meal", name: "Special Veg Meal", unit: "person", price: 320, veg: true },
      { id: "paneer", name: "Paneer Curry", unit: "person", price: 80, veg: true },
      { id: "veg-biryani", name: "Veg Biryani", unit: "person", price: 150, veg: true },
      { id: "dal-tadka", name: "Dal Tadka", unit: "person", price: 70, veg: true },
      { id: "raita", name: "Raita", unit: "person", price: 40, veg: true },
      { id: "papad", name: "Papad", unit: "person", price: 20, veg: true },
      { id: "chicken", name: "Chicken Main Course", unit: "person", price: 130, veg: false },
      { id: "chicken-biryani", name: "Chicken Biryani", unit: "person", price: 180, veg: false },
      { id: "mutton-curry", name: "Mutton Curry", unit: "person", price: 220, veg: false },
      { id: "egg-curry", name: "Egg Curry", unit: "person", price: 90, veg: false },
      { id: "fish", name: "Fish Main Course", unit: "person", price: 160, veg: false },
      { id: "dessert", name: "Dessert", unit: "person", price: 60, veg: true }
    ],
    "Extras": [
      { id: "welcome-drink", name: "Welcome Drink", unit: "person", price: 45, veg: true },
      { id: "mocktail", name: "Mocktail", unit: "person", price: 65, veg: true },
      { id: "ice-cream", name: "Ice Cream", unit: "person", price: 55, veg: true },
      { id: "gulab-jamun", name: "Gulab Jamun", unit: "person", price: 40, veg: true },
      { id: "salad", name: "Fresh Salad", unit: "person", price: 30, veg: true },
      { id: "sweet", name: "Sweet", unit: "person", price: 35, veg: true }
    ]
  },
  djSound: {
    setups: [
      { id: "basic", name: "Basic Sound", description: "Compact setup for small functions", price: 2500 },
      { id: "standard", name: "DJ + Sound", description: "DJ console with balanced sound", price: 5000 },
      { id: "premium", name: "Premium DJ Setup", description: "Full DJ and high-output event setup", price: 8500 }
    ],
    speakerPrice: 900,
    micPrice: 350,
    extras: [
      { id: "dj-console", name: "DJ Console", price: 1800 },
      { id: "subwoofer", name: "Subwoofer", price: 1400 },
      { id: "stage-monitor", name: "Stage Monitor", price: 900 }
    ]
  },
  lighting: {
    packages: [
      { id: "warm", name: "Warm Decorative Lights", description: "Elegant warm lighting for stages and entrances", price: 3000 },
      { id: "fairy", name: "Fairy Light Setup", description: "Dense fairy lights for a festive look", price: 4500 },
      { id: "premium", name: "Premium Event Lighting", description: "Stage + ambience + highlight lighting", price: 7500 }
    ]
  },
  decoration: [
    { id: "dec1", category: "Wedding", range: "Premium", name: "Royal Floral Wedding Stage", price: 28000, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec2", category: "Wedding", range: "Standard", name: "Classic Floral Stage", price: 18000, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec3", category: "Wedding", range: "Budget", name: "Elegant Minimal Stage", price: 12000, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec4", category: "Mehndi", range: "Premium", name: "Colorful Mehndi Garden", price: 22000, image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec5", category: "Mehndi", range: "Standard", name: "Boho Mehndi Setup", price: 14000, image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec6", category: "Birthday", range: "Standard", name: "Birthday Balloon Stage", price: 9000, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec7", category: "Reception", range: "Premium", name: "Grand Reception Stage", price: 30000, image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80" },
    { id: "dec8", category: "Engagement", range: "Standard", name: "Pastel Engagement Decor", price: 16000, image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80" }
  ]
};

async function seed() {
  await connectDB();

  await Catalog.findOneAndUpdate(
    { key: "main" },
    { key: "main", ...catalogData },
    { upsert: true, new: true }
  );

  console.log("Catalog seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
