import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { MenuItem, Reservation, ContactMessage, Review, NewsPost } from "./src/types.js";

// Import types safely for JS/TS context
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory Database state
const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: "b1",
    name: "Classic Eggs Benedict",
    description: "Two poached farm eggs, Canadian bacon, toasted English muffin, silky house hollandaise, served with breakfast potatoes.",
    price: 14.50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    rating: 4.8,
    prepTime: "15 min"
  },
  {
    id: "b2",
    name: "Smoked Salmon Avocado Toast",
    description: "Sourdough batard, smashed Hass avocado, premium cold-smoked salmon, pickled red onions, capers, microgreens, and lemon zest.",
    price: 16.00,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    prepTime: "12 min"
  },
  {
    id: "b3",
    name: "Fluffy Brioche French Toast",
    description: "Thick-cut brioche soaked in rich vanilla-cinnamon custard, topped with fresh seasonal berries, powdered sugar, and warm Vermont maple syrup.",
    price: 13.00,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    prepTime: "18 min"
  },
  {
    id: "b4",
    name: "Garden Herb Frittata",
    description: "Three-egg open-faced omelette loaded with fresh spinach, goat cheese, heirloom cherry tomatoes, wild mushrooms, and fresh garden chives.",
    price: 12.50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    prepTime: "14 min"
  },

  // Lunch Items
  {
    id: "l1",
    name: "Gourmet Angus Truffle Burger",
    description: "Half-pound dry-aged prime Angus beef, Swiss Gruyère, house black truffle aioli, caramelized balsamic onions, and wild arugula on a toasted brioche bun. Served with truffle fries.",
    price: 19.50,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    rating: 4.9,
    prepTime: "20 min"
  },
  {
    id: "l2",
    name: "Tuscan Grilled Chicken Salad",
    description: "Herb-marinated free-range chicken breast, organic baby greens, roasted bell peppers, Kalamata olives, toasted pine nuts, shaved Parmesan, tossed in a sun-dried tomato vinaigrette.",
    price: 17.00,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    prepTime: "15 min"
  },
  {
    id: "l3",
    name: "Creamy Truffle Carbonara",
    description: "Artisanal spaghetti, crispy pancetta, wild mushroom blend, velvety egg yolk sauce, aged pecorino, cracked black pepper, topped with a drizzle of white truffle oil.",
    price: 21.00,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    prepTime: "15 min"
  },
  {
    id: "l4",
    name: "Pan-Seared Salmon Bowl",
    description: "Glazed Atlantic salmon, organic quinoa, steamed broccolini, edamame, pickled cucumber ribbons, avocado, drizzled with ginger-soy reduction.",
    price: 22.50,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    prepTime: "17 min"
  },

  // Dinner Items
  {
    id: "d1",
    name: "Premium Filet Mignon Steak",
    description: "8oz center-cut prime tenderloin, red wine bordelaise reduction, roasted garlic mashed potatoes, butter-glazed baby carrots, and asparagus.",
    price: 38.00,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    rating: 5.0,
    prepTime: "25 min"
  },
  {
    id: "d2",
    name: "Chilean Sea Bass",
    description: "Pan-roasted sea bass served over wild mushroom risotto, baby spinach, finished with a delicate citrus saffron beurre blanc.",
    price: 34.00,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    prepTime: "22 min"
  },
  {
    id: "d3",
    name: "Slow-Roasted Herb Lamb Shank",
    description: "New Zealand lamb shank braised for 12 hours with fresh rosemary and red wine, served over creamy polenta, roasted root vegetables, and natural braising jus.",
    price: 29.50,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    prepTime: "25 min"
  },
  {
    id: "d4",
    name: "Artisanal Lobster Ravioli",
    description: "Handcrafted ravioli stuffed with sweet Maine lobster meat, served in a rich pink cognac cream sauce, topped with microgreens and edible gold leaf.",
    price: 28.00,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    prepTime: "18 min"
  },

  // Drinks & Desserts
  {
    id: "dr1",
    name: "Smoked Rosemary Old Fashioned",
    description: "Premium Kentucky bourbon, Angostura bitters, orange peel, charred rosemary sprig, served under a smoke dome.",
    price: 15.00,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    prepTime: "5 min"
  },
  {
    id: "de1",
    name: "Molten Lava Chocolate Cake",
    description: "Decadent dark chocolate cake with a rich liquid truffle center, served warm with Madagascar vanilla bean gelato and fresh raspberry coulis.",
    price: 11.00,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    prepTime: "10 min"
  }
];

const initialReservations: Reservation[] = [
  {
    id: "res-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    guests: 4,
    date: "2026-07-15",
    time: "19:30",
    specialRequests: "Window seat if possible, celebrating an anniversary.",
    status: "confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "res-2",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    guests: 2,
    date: "2026-07-18",
    time: "18:00",
    specialRequests: "Gluten-free menu option needed.",
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];

const initialReviews: Review[] = [
  {
    id: "rev-1",
    name: "Alexander Mercer",
    role: "Gourmet Food Critic",
    rating: 5,
    comment: "The Filet Mignon is easily the finest in town. Seamless service, phenomenal presentation, and a beautifully curated wine selection. A masterful culinary destination.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    createdAt: "2026-06-28"
  },
  {
    id: "rev-2",
    name: "Sophia Martinez",
    role: "Local Food Blogger",
    rating: 5,
    comment: "From the Truffle Burger to the Smoked Rosemary Old Fashioned, Resto delivers an unmatched gastronomic experience. Absolute perfection in every single bite!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    createdAt: "2026-06-30"
  },
  {
    id: "rev-3",
    name: "Marcus Vance",
    role: "Culinary Enthusiast",
    rating: 5,
    comment: "Their weekend brunch is to die for. The eggs benedict were cooked to absolute perfection and the hollandaise was incredibly velvety. Will definitely return!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    createdAt: "2026-07-01"
  }
];

const newsPosts: NewsPost[] = [
  {
    id: "news-1",
    title: "Unveiling Our New Autumn-Winter Seasonal Menu",
    excerpt: "We are thrilled to present our newly engineered culinary creations for the upcoming cold season, featuring local organic root vegetables and premium wild game.",
    content: "Our culinary masterminds have spent weeks collaborating with local growers, organic farmers, and boutique wine estates to design an autumn-winter menu that encapsulates comforting warmth and sophisticated tastes. Starting next week, experience new highlight dishes including our Braised Wild Boar Shoulder, Honey-Glazed Heirloom Squashes, and Spiced Winter Pear Tarts. We have also updated our reserve wine card with handpicked red blends from Tuscany and Napa Valley.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    category: "Culinary Experience",
    author: {
      name: "Chef Liam Sterling",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80"
    },
    date: "July 01, 2026",
    readTime: "4 min read"
  },
  {
    id: "news-2",
    title: "Crafting the Perfect Smoked Old Fashioned",
    excerpt: "Behind the bar with our Lead Mixologist, exploring the exquisite smoke infusion techniques and flavor notes that define our signature cocktails.",
    content: "Mixology at Resto is treated as both a high art and a precise science. Our signature Smoked Rosemary Old Fashioned is built around small-batch single barrel bourbon, house-spiced orange bitters, and a touch of raw organic honey. The critical difference is our oak wood smoke dome, which infuses the glass with gentle wood notes, paired with a freshly torched rosemary sprig. Discover the details of our craft and how we balance bold spirits with herbal botanicals.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    category: "Mixology",
    author: {
      name: "Clara Reynolds",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    date: "June 25, 2026",
    readTime: "3 min read"
  },
  {
    id: "news-3",
    title: "Supporting Sustainable Farming & Clean Produce",
    excerpt: "Discover our farm-to-table ethos. We are proud to source 100% of our organic greens and free-range meats from certified regional pastures.",
    content: "Great food begins at the source. At Resto, we believe that premium dining should respect both the palate and the ecosystem. We have strengthened our alliance with regional bio-farms to ensure that every vegetable, herb, and grain served on our plates is fully organic and pesticide-free. Our beef is 100% grass-fed and finished, while our seafood is sustainably caught. Learn how this commitment to clean food enhances nutrition, maximizes flavor profiles, and supports local agricultural families.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    category: "Our Ethos",
    author: {
      name: "David Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    date: "June 18, 2026",
    readTime: "5 min read"
  }
];

let reservations: Reservation[] = [...initialReservations];
let contactMessages: ContactMessage[] = [];
let reviews: Review[] = [...initialReviews];

// API Routes
app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

app.post("/api/reservations", (req, res) => {
  const { name, email, phone, guests, date, time, specialRequests } = req.body;

  if (!name || !email || !phone || !guests || !date || !time) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  const newReservation: Reservation = {
    id: `res-${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    phone,
    guests: parseInt(guests, 10),
    date,
    time,
    specialRequests: specialRequests || "",
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  reservations.unshift(newReservation);
  res.status(201).json(newReservation);
});

app.delete("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    reservations[index].status = "cancelled";
    return res.json({ success: true, message: "Reservation cancelled successfully." });
  }
  res.status(404).json({ error: "Reservation not found." });
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const newMessage: ContactMessage = {
    id: `msg-${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    subject: subject || "No Subject",
    message,
    createdAt: new Date().toISOString()
  };

  contactMessages.unshift(newMessage);
  res.status(201).json({ success: true, message: "Thank you! Your message has been sent successfully." });
});

app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  const { name, role, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({ error: "Name, rating and review comment are required." });
  }

  const newReview: Review = {
    id: `rev-${Math.random().toString(36).substr(2, 9)}`,
    name,
    role: role || "Gourmet Diner",
    rating: parseInt(rating, 10),
    comment,
    image: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? "1534528741775-53994a69daeb" : "1507003211169-0a1dd7228f2d"}?auto=format&fit=crop&w=120&q=80`,
    createdAt: new Date().toISOString().split('T')[0]
  };

  reviews.unshift(newReview);
  res.status(201).json(newReview);
});

app.get("/api/news", (req, res) => {
  res.json(newsPosts);
});

// "Deal of the Week" dynamic calculation API
app.get("/api/deal", (req, res) => {
  // Let's deliver a burger deal that has a countdown expiring in 3 days 4 hours
  res.json({
    id: "deal-1",
    name: "Shroom Bean Burger",
    originalPrice: 14.50,
    dealPrice: 9.76,
    rating: 4.9,
    description: "Premium handcrafted shiitake & black bean patty, smothered in caramelized onions, creamy house special herb sauce, wild rocket greens, served on our freshly baked artisan brioche bun.",
    bullets: [
      "100% Organic Ingredients",
      "Handcrafted House Recipe",
      "Delicious Gluten-free Option",
      "Glazed with Truffle Reduction"
    ],
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString() // 3 days 4 hours from now
  });
});

// Vite / static routes serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
