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
    { id: "wed1", category: "Wedding", range: "Premium", name: "Wedding Stage Design 1", price: 28000, image: "/images/decoration/wedding1.jpeg" },
    { id: "wed2", category: "Wedding", range: "Standard", name: "Wedding Stage Design 2", price: 20000, image: "/images/decoration/wedding2.jpeg" },
    { id: "wed3", category: "Wedding", range: "Standard", name: "Wedding Stage Design 3", price: 18000, image: "/images/decoration/wedding3.jpeg" },
    { id: "wed4", category: "Wedding", range: "Budget", name: "Wedding Stage Design 4", price: 12000, image: "/images/decoration/wedding4.jpeg" },

    { id: "meh1", category: "Mehndi", range: "Premium", name: "Mehndi Setup 1", price: 22000, image: "/images/decoration/mehendi1.jpeg" },
    { id: "meh2", category: "Mehndi", range: "Standard", name: "Mehndi Setup 2", price: 16000, image: "/images/decoration/mehandi2.jpeg" },
    { id: "meh3", category: "Mehndi", range: "Standard", name: "Mehndi Setup 3", price: 14000, image: "/images/decoration/mehandi3.jpeg" },
    { id: "meh4", category: "Mehndi", range: "Budget", name: "Mehndi Setup 4", price: 9000, image: "/images/decoration/mehandi4.jpeg" },

    { id: "bday1", category: "Birthday", range: "Premium", name: "Birthday Decor 1", price: 15000, image: "/images/decoration/brdy1.jpeg" },
    { id: "bday2", category: "Birthday", range: "Standard", name: "Birthday Decor 2", price: 10000, image: "/images/decoration/brdy2.jpeg" },
    { id: "bday3", category: "Birthday", range: "Standard", name: "Birthday Decor 3", price: 9000, image: "/images/decoration/brdy3.jpeg" },
    { id: "bday4", category: "Birthday", range: "Budget", name: "Birthday Decor 4", price: 6000, image: "/images/decoration/brdy4.jpeg" },

    { id: "recp1", category: "Reception", range: "Premium", name: "Reception Stage 1", price: 30000, image: "/images/decoration/rec1.jpeg" },
    { id: "recp2", category: "Reception", range: "Standard", name: "Reception Stage 2", price: 20000, image: "/images/decoration/rec2.jpeg" },
    { id: "recp3", category: "Reception", range: "Budget", name: "Reception Stage 3", price: 14000, image: "/images/decoration/rec3.jpeg" },

    { id: "eng1", category: "Engagement", range: "Premium", name: "Engagement Decor 1", price: 18000, image: "/images/decoration/eng1.jpeg" },
    { id: "eng2", category: "Engagement", range: "Standard", name: "Engagement Decor 2", price: 14000, image: "/images/decoration/eng2.jpeg" },
    { id: "eng3", category: "Engagement", range: "Budget", name: "Engagement Decor 3", price: 10000, image: "/images/decoration/eng3.jpeg" }
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
