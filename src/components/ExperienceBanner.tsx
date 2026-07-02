import { Star } from "lucide-react";
import { motion } from "motion/react";

export default function ExperienceBanner() {
  const plates = [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
  ];

  return (
    <section className="relative bg-rose-600 py-20 text-white overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block (Span 7) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="font-sans text-xs font-bold tracking-widest text-rose-200 uppercase">
              Awarded Gastronomy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Highlighting Its Unique <br />Features & Culinary Experiences
            </h2>
            
            <div className="flex flex-wrap gap-6 items-center pt-2">
              {/* Stars badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col items-center">
                <span className="font-display font-black text-3xl text-amber-300">10+</span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-rose-100 mt-1">
                  Years Experience
                </span>
                <div className="flex text-amber-300 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                  ))}
                </div>
              </div>

              {/* Verified review score */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="font-display font-black text-3xl text-white">4.9/5</span>
                <p className="font-sans text-[10px] uppercase font-bold tracking-wider text-rose-100 mt-1">
                  Customer Rating
                </p>
                <span className="font-sans text-[10px] text-rose-200 block mt-1">
                  Based on 2,500+ verified food reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Three circular overlapping images (Span 5) */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[220px]">
            {plates.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`absolute w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white ${
                  index === 0
                    ? "left-[10%] z-10 scale-[0.9] -translate-x-4"
                    : index === 1
                    ? "left-1/2 -translate-x-1/2 z-20 scale-[1.1]"
                    : "right-[10%] z-10 scale-[0.9] translate-x-4"
                }`}
              >
                <img
                  src={url}
                  alt={`Vibrant culinary dish plates ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
