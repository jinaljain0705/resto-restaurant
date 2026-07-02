import { useState, useEffect } from "react";
import { Star, Clock, AlertCircle, ShoppingBag, RotateCcw, Flame } from "lucide-react";
import { MenuItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  activeSearchFilters: { category: string; location: string; timeSlot: string } | null;
  onClearSearch: () => void;
  onPreOrderDish: (dish: MenuItem) => void;
  preOrderedDishes: MenuItem[];
}

export default function MenuSection({
  activeSearchFilters,
  onClearSearch,
  onPreOrderDish,
  preOrderedDishes
}: MenuSectionProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/menu");
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await res.json();
        setMenuItems(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while loading the menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Update active category when hero search filters are applied
  useEffect(() => {
    if (activeSearchFilters && activeSearchFilters.category !== "all") {
      setActiveCategory(activeSearchFilters.category);
    }
  }, [activeSearchFilters]);

  // Categories definition
  const categories = [
    { key: "all", label: "All Specialties" },
    { key: "breakfast", label: "Breakfast" },
    { key: "lunch", label: "Lunch" },
    { key: "dinner", label: "Dinner" },
    { key: "drinks", label: "Cocktails" },
    { key: "dessert", label: "Dessert" },
  ];

  // Filtering Logic
  const filteredItems = menuItems.filter((item) => {
    // Category check
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
            Delicious Menus
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Explore Our Culinary Masterpieces
          </h2>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded" />
          <p className="font-sans text-sm text-slate-400">
            Handcrafted dishes engineered by culinary design specialists, cooked using raw fire, certified organic ingredients, and high technical passion.
          </p>
        </div>

        {/* Hero Search Notification banner if filters are active */}
        {activeSearchFilters && (
          <div className="mb-10 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-left max-w-3xl mx-auto">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Filter</span>
                <p className="font-sans text-sm text-slate-700">
                  Showing <span className="font-semibold text-rose-600">{activeSearchFilters.category}</span> specialties matching your seating zone and slot.
                </p>
              </div>
            </div>
            <button
              onClick={onClearSearch}
              className="flex items-center space-x-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/15"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading / Error states */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-sans text-sm text-slate-400">Loading master chef dishes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="font-sans text-sm text-red-500 mb-2">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Retry
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl max-w-xl mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <div>
              <p className="font-display font-semibold text-slate-700">No specialties found</p>
              <p className="font-sans text-xs text-slate-400 mt-1">Try resetting the filters or exploring a different category.</p>
            </div>
            <button
              onClick={() => {
                setActiveCategory("all");
                onClearSearch();
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          /* Menu Cards Grid */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isPreOrdered = preOrderedDishes.some((d) => d.id === item.id);
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left"
                  >
                    {/* Image Header with ReferrerPolicy */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Popular / Fire Indicator */}
                      {item.isPopular && (
                        <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1">
                          <Flame className="w-3 h-3 fill-white" />
                          <span>Chef's Choice</span>
                        </div>
                      )}

                      {/* Prep time floating */}
                      {item.prepTime && (
                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.prepTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div className="space-y-2">
                        {/* Title and Rating */}
                        <div className="flex items-start justify-between">
                          <h3 className="font-display font-bold text-base text-slate-800 leading-snug group-hover:text-rose-600 transition-colors">
                            {item.name}
                          </h3>
                        </div>

                        {/* Rating stars if exists */}
                        {item.rating && (
                          <div className="flex items-center space-x-1">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(item.rating || 5)
                                      ? "fill-amber-400"
                                      : "text-slate-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-400">
                              {item.rating}
                            </span>
                          </div>
                        )}

                        <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Price & Booking action */}
                      <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between shrink-0">
                        <span className="font-display font-extrabold text-lg text-slate-900">
                          ${item.price.toFixed(2)}
                        </span>
                        
                        <button
                          onClick={() => onPreOrderDish(item)}
                          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPreOrdered
                              ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/10"
                              : "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isPreOrdered ? "Pre-ordered" : "Pre-order"}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
