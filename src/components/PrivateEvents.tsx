import { CalendarRange, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function PrivateEvents() {
  const images = [
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e3a5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <section id="events" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Photo Grid (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {images.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`overflow-hidden rounded-2xl shadow-md border border-white aspect-square ${
                  i === 1 ? "translate-y-4" : i === 2 ? "-translate-y-4" : ""
                }`}
              >
                <img
                  src={url}
                  alt={`Private dining event venue setup ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Right Side: Copy Block & Booking CTA (Span 7) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
                Exclusive Experiences
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Private Dining and <br />Custom Events
              </h2>
              <div className="w-12 h-1 bg-rose-600 rounded" />
            </div>

            <p className="font-sans text-base text-slate-500 leading-relaxed">
              Celebrate your milestone occasions with customized gastronomic menus. From romantic private chambers, cocktail garden mixers, to corporate presentation assemblies, our culinary hosts tailor every detail to perfection.
            </p>

            {/* Event features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="bg-rose-100/50 p-2 rounded-xl text-rose-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 leading-tight">
                    Customized Seasonal Menus
                  </h4>
                  <p className="font-sans text-xs text-slate-400">
                    Hand-tailored tasting cards paired with exclusive vintage labels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="bg-rose-100/50 p-2 rounded-xl text-rose-600 shrink-0">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800 leading-tight">
                    Full Atmospheric Management
                  </h4>
                  <p className="font-sans text-xs text-slate-400">
                    Bespoke acoustic programming, visual presentation grids, and custom flower installations.
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll action CTA */}
            <div className="pt-2">
              <a
                href="#reservations"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#reservations")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-rose-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Inquire About Space</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
