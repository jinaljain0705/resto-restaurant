import { useState, useEffect } from "react";
import { Star, ShieldCheck, ShoppingCart } from "lucide-react";
import { MenuItem } from "../types";
import { motion } from "motion/react";

interface DealOfWeekProps {
  onPreOrderDish: (dish: MenuItem) => void;
}

export default function DealOfWeek({ onPreOrderDish }: DealOfWeekProps) {
  const [deal, setDeal] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch("/api/deal");
        if (res.ok) {
          const data = await res.json();
          setDeal(data);
        }
      } catch (err) {
        console.error("Error fetching deal:", err);
      }
    };
    fetchDeal();
  }, []);

  useEffect(() => {
    if (!deal || !deal.expiresAt) return;

    const interval = setInterval(() => {
      const difference = +new Date(deal.expiresAt) - +new Date();
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deal]);

  if (!deal) return null;

  const handleClaimDeal = () => {
    const menuItemRepresentation: MenuItem = {
      id: deal.id,
      name: deal.name,
      description: deal.description,
      price: deal.dealPrice,
      category: "lunch",
      image: deal.image,
      isPopular: true
    };
    onPreOrderDish(menuItemRepresentation);
    // Scroll to reservations
    document.querySelector("#reservations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="deals" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Product Copy & Live Countdown (Span 7) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
                Deal of the Week
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                {deal.name}
              </h2>
              <div className="w-12 h-1 bg-rose-600 rounded" />
            </div>

            {/* Price section with old/new pricing */}
            <div className="flex items-center space-x-4">
              <span className="font-display font-extrabold text-3xl text-rose-600">
                ${deal.dealPrice.toFixed(2)}
              </span>
              <span className="font-sans text-lg text-slate-300 line-through">
                ${deal.originalPrice.toFixed(2)}
              </span>
              <span className="bg-emerald-500 text-white font-sans text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Save ${(deal.originalPrice - deal.dealPrice).toFixed(2)}
              </span>
            </div>

            <p className="font-sans text-base text-slate-500 leading-relaxed">
              {deal.description}
            </p>

            {/* Bullet list of features */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deal.bullets?.map((bullet: string, i: number) => (
                <li key={i} className="flex items-center space-x-2 text-slate-600 font-sans text-sm">
                  <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Countdown timer components exact to mockup style */}
            <div className="space-y-3">
              <span className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-widest block">
                Offer Expiring In:
              </span>
              <div className="flex space-x-3 sm:space-x-4">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Min" },
                  { value: timeLeft.seconds, label: "Sec" }
                ].map((col, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-inner">
                      <span className="font-display font-bold text-lg sm:text-xl text-slate-800">
                        {String(col.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      {col.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA claim button */}
            <div className="pt-2">
              <button
                onClick={handleClaimDeal}
                className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-rose-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Claim Deal & Book Table</span>
              </button>
            </div>
          </div>

          {/* Right Side: Product image with ratings (Span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm aspect-square bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-xl"
            >
              <img
                src={deal.image}
                alt={deal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-100 px-3.5 py-2 rounded-2xl shadow-md flex items-center space-x-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-display font-extrabold text-sm text-slate-800">
                  {deal.rating}
                </span>
                <span className="font-sans text-[10px] text-slate-400">
                  (Voted #1)
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
