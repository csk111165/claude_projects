import { Deal } from "@/lib/types";

// Deals use product references - we'll create standalone deal data
// endTime is set to future dates so the countdown always works
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(23, 59, 59, 0);

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
dayAfterTomorrow.setHours(23, 59, 59, 0);

const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
nextWeek.setHours(23, 59, 59, 0);

export const deals: Deal[] = [
  {
    id: "deal-1",
    product: {
      id: "prod-1",
      name: 'ProVision 4K Ultra HD Smart TV 55"',
      slug: "provision-4k-smart-tv-55",
      description: "Experience stunning 4K clarity with HDR10+ support, built-in streaming apps, and voice control.",
      price: 449.99,
      originalPrice: 699.99,
      discount: 36,
      images: [
        "https://picsum.photos/seed/tv1/640/480",
        "https://picsum.photos/seed/tv2/640/480",
        "https://picsum.photos/seed/tv3/640/480",
      ],
      category: "electronics",
      subcategory: "smart-home",
      brand: "ProVision",
      rating: 4.5,
      reviewCount: 1247,
      inStock: true,
      specs: { "Screen Size": '55"', Resolution: "3840x2160", HDR: "HDR10+", "Refresh Rate": "120Hz" },
      features: ["4K Ultra HD", "HDR10+ Support", "Built-in Alexa", "3 HDMI ports"],
      tags: ["tv", "4k", "smart tv", "electronics"],
    },
    endTime: tomorrow.toISOString(),
    originalPrice: 699.99,
    dealPrice: 449.99,
  },
  {
    id: "deal-2",
    product: {
      id: "prod-5",
      name: "SoundWave Pro Wireless Headphones",
      slug: "soundwave-pro-wireless-headphones",
      description: "Premium noise-cancelling headphones with 40-hour battery life and hi-res audio support.",
      price: 179.99,
      originalPrice: 299.99,
      discount: 40,
      images: [
        "https://picsum.photos/seed/headphones1/640/480",
        "https://picsum.photos/seed/headphones2/640/480",
        "https://picsum.photos/seed/headphones3/640/480",
      ],
      category: "electronics",
      subcategory: "headphones",
      brand: "SoundWave",
      rating: 4.7,
      reviewCount: 892,
      inStock: true,
      specs: { "Battery Life": "40 hours", "Driver Size": "40mm", "Noise Cancellation": "Active", Weight: "250g" },
      features: ["Active Noise Cancellation", "Hi-Res Audio", "40hr Battery", "Foldable Design"],
      tags: ["headphones", "wireless", "noise cancelling", "audio"],
    },
    endTime: tomorrow.toISOString(),
    originalPrice: 299.99,
    dealPrice: 179.99,
  },
  {
    id: "deal-3",
    product: {
      id: "prod-22",
      name: "BrewMaster Elite Coffee Machine",
      slug: "brewmaster-elite-coffee-machine",
      description: "Professional-grade espresso machine with built-in grinder and milk frother.",
      price: 249.99,
      originalPrice: 399.99,
      discount: 38,
      images: [
        "https://picsum.photos/seed/coffee1/640/480",
        "https://picsum.photos/seed/coffee2/640/480",
        "https://picsum.photos/seed/coffee3/640/480",
      ],
      category: "home-kitchen",
      subcategory: "kitchen-appliances",
      brand: "BrewMaster",
      rating: 4.6,
      reviewCount: 534,
      inStock: true,
      specs: { "Pump Pressure": "15 bar", "Water Tank": "2L", "Grinder": "Built-in Burr", Power: "1450W" },
      features: ["Built-in Grinder", "Milk Frother", "Programmable", "Self-Cleaning"],
      tags: ["coffee", "espresso", "kitchen", "appliance"],
    },
    endTime: dayAfterTomorrow.toISOString(),
    originalPrice: 399.99,
    dealPrice: 249.99,
  },
  {
    id: "deal-4",
    product: {
      id: "prod-35",
      name: "FitPro Smart Fitness Watch",
      slug: "fitpro-smart-fitness-watch",
      description: "Advanced fitness tracker with GPS, heart rate monitor, and 7-day battery life.",
      price: 149.99,
      originalPrice: 249.99,
      discount: 40,
      images: [
        "https://picsum.photos/seed/watch1/640/480",
        "https://picsum.photos/seed/watch2/640/480",
        "https://picsum.photos/seed/watch3/640/480",
      ],
      category: "sports-outdoors",
      subcategory: "exercise-equipment",
      brand: "FitPro",
      rating: 4.4,
      reviewCount: 2103,
      inStock: true,
      specs: { Display: "1.4\" AMOLED", Battery: "7 days", "Water Resistance": "5ATM", GPS: "Built-in" },
      features: ["GPS Tracking", "Heart Rate Monitor", "Sleep Tracking", "50m Water Resistant"],
      tags: ["smartwatch", "fitness", "tracker", "sports"],
    },
    endTime: nextWeek.toISOString(),
    originalPrice: 249.99,
    dealPrice: 149.99,
  },
];
