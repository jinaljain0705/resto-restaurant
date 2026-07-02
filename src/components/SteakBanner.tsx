import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function SteakBanner() {
  const qualities = [
    { title: "Healthy Food Choices", desc: "Low sodium, keto options, and gluten-free variations." },
    { title: "Fresh Seasonal Recipes", desc: "Ingredients harvested and cooked on the very same day." },
    { title: "Premium Imported Ingredients", desc: "A5 Wagyu beef, French truffles, and Italian olive oil." },
    { title: "Highly Trained Friendly Staff", desc: "Professional sommeliers and seasoned silver-service hosts." }
  ];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Steak image with 20% OFF Sticker (Span 5) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-sm aspect-square"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-[-12px] border-4 border-dashed border-rose-200 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />

              {/* Platter Image container */}
              <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                  alt="Mouth-watering grilled prime steak"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* 20% Off Sticker */}
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: -15 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
                className="absolute top-4 left-4 bg-amber-400 text-slate-900 border-4 border-white font-display font-black text-center p-3 rounded-full shadow-lg w-24 h-24 flex flex-col justify-center items-center select-none"
              >
                <span className="text-[10px] leading-none uppercase font-bold text-slate-800">Only</span>
                <span className="text-2xl leading-none font-extrabold">$38</span>
                <span className="text-[9px] leading-none uppercase font-bold text-slate-700">Prime Cut</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Copy & Quality Checklists (Span 7) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
                Premium Selection
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Good Food Steak & <br />Great Restaurant Experience
              </h2>
              <div className="w-12 h-1 bg-rose-600 rounded" />
            </div>

            <p className="font-sans text-base text-slate-500 leading-relaxed">
              We specialize in dry-aged steaks charred over natural white oak logs. Our process seals the premium juices inside, delivering an unmatched sensory indulgence paired with exceptional sides.
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {qualities.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <CheckCircle2 className="w-5.5 h-5.5 text-rose-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-slate-800 leading-tight">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-rose-600/15 hover:shadow-rose-600/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Steak Menu</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
