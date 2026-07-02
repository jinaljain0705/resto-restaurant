import React, { useState } from "react";
import { Search, MapPin, Coffee, Clock } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onSearch: (filters: { category: string; location: string; timeSlot: string }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [filters, setFilters] = useState({
    category: "all",
    location: "all",
    timeSlot: "all"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    const element = document.querySelector("#menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-white pt-28 pb-16 overflow-hidden flex items-center"
    >
      {/* Decorative vectors in background similar to the uploaded image */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-2xl pointer-events-none" />

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Copy and Search Form */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping" />
                <span>Michelin Star Kitchen</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
                Best Food for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-500">
                  Best Restaurants
                </span>
              </h1>
              
              <p className="font-sans text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
                Experience culinary engineering at its finest. From hand-crafted morning brioches to our dry-aged prime beef steaks, every plate is a story of craft, precision, and raw passion.
              </p>
            </motion.div>

            {/* Interactive Search Bar / Filter Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 max-w-2xl"
            >
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Location / Seating Zone */}
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-semibold text-slate-400 space-x-1 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Zone</span>
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-2.5 px-3 rounded-xl cursor-pointer"
                  >
                    <option value="all">Main Hall</option>
                    <option value="patio">Sunny Patio</option>
                    <option value="lounge">Cocktail Lounge</option>
                    <option value="private">Private VIP</option>
                  </select>
                </div>

                {/* Cuisine / Category */}
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-semibold text-slate-400 space-x-1 uppercase tracking-wider">
                    <Coffee className="w-3.5 h-3.5 text-rose-500" />
                    <span>Cuisine</span>
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-2.5 px-3 rounded-xl cursor-pointer"
                  >
                    <option value="all">All Specialties</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                    <option value="drinks">Cocktails</option>
                  </select>
                </div>

                {/* Time Slot */}
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-semibold text-slate-400 space-x-1 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Time</span>
                  </label>
                  <select
                    value={filters.timeSlot}
                    onChange={(e) => setFilters({ ...filters, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-2.5 px-3 rounded-xl cursor-pointer"
                  >
                    <option value="all">Any Hour</option>
                    <option value="brunch">08:00 - 12:00</option>
                    <option value="lunch">12:00 - 17:00</option>
                    <option value="dinner">17:00 - 23:00</option>
                  </select>
                </div>

                {/* Submit button spans 3 cols on small screens */}
                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-600/20 hover:shadow-rose-600/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search specialties</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Elaborate Platter Layout mirroring the image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-square flex items-center justify-center"
            >
              {/* Background Red/Pink shape matching the uploaded image mockup */}
              <div className="absolute inset-0 bg-rose-500 rounded-full scale-[0.85] translate-x-4 translate-y-4 shadow-xl pointer-events-none" />
              
              {/* Main Platter Plate (Spinning / Floating effect) */}
              <div className="absolute w-[85%] aspect-square rounded-full border-[12px] border-white shadow-2xl bg-slate-100 overflow-hidden z-20 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"
                  alt="Delicious Roasted Steak Specialty"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Smaller overlapping plate */}
              <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full border-8 border-white shadow-xl overflow-hidden z-30">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
                  alt="Delicious Gourmet Burger"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Badge/Sticker "100% Fresh & Healthy" floating */}
              <div className="absolute bottom-2 left-[-10px] bg-amber-400 text-slate-900 border-4 border-white font-display font-extrabold text-xs tracking-wider uppercase px-4 py-3 rounded-full shadow-lg z-30 flex flex-col items-center rotate-[-12deg]">
                <span>100% Organic</span>
                <span className="text-[10px] font-bold text-slate-700">Fresh & Healthy</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
