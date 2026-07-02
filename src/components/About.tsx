import { Star, Award, Sparkles, ChefHat } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Chef Image grid similar to image structure */}
          <div className="relative">
            {/* Ambient gold blur backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-2 gap-4">
              {/* Primary Chef Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-slate-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                  alt="Our Culinary Chefs cooking"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </motion.div>

              {/* Cooking Action 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80"
                  alt="Plating fine dining dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Cooking Action 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80"
                  alt="Fresh organic food basket"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Micro Floating Chef Info Badge */}
                <div className="absolute inset-0 bg-rose-900/10 hover:bg-transparent transition-colors duration-300" />
              </motion.div>
            </div>

            {/* Float Badge 15+ years experience */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="absolute bottom-[-20px] right-4 sm:right-[-20px] bg-rose-600 text-white p-5 rounded-3xl shadow-xl shadow-rose-600/20 max-w-[180px] border-4 border-white text-center"
            >
              <div className="flex justify-center mb-1">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <span className="font-display font-extrabold text-2xl">100%</span>
              <p className="font-sans text-[10px] uppercase tracking-wider text-rose-100 font-semibold leading-tight">
                Authentic Homemade Recipes
              </p>
            </motion.div>
          </div>

          {/* Right Side: Copy block */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
                A Journey of Taste
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Feel The Taste <br />
                Of Authentic Foods
              </h2>
              <div className="w-12 h-1 bg-rose-600 rounded" />
            </div>

            <div className="space-y-4 text-slate-500 font-sans leading-relaxed">
              <p>
                Founded on the pillars of gastronomic excellence, Resto has redefined fine dining by merging local heritage with contemporary culinary sciences. Our executive chef handpicks fresh organic herbs and premium cuts to construct true edible masterpieces.
              </p>
              <p>
                Every plate is engineered with precise cooking temperatures, seasonal balances, and delicate sauce reductions, ensuring that every bite triggers a symphony of memorable flavor notes.
              </p>
            </div>

            {/* Feature lists with gorgeous icons */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                  <Star className="w-5 h-5 fill-rose-600" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">Elite Standards</h4>
                  <p className="font-sans text-xs text-slate-400">Guaranteed culinary perfection</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <Award className="w-5 h-5 fill-amber-500 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">Awarded Bistro</h4>
                  <p className="font-sans text-xs text-slate-400">Voted Top 10 regional diners</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">Fresh Produce</h4>
                  <p className="font-sans text-xs text-slate-400">100% bio-organic farm supply</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <ChefHat className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">Expert Chefs</h4>
                  <p className="font-sans text-xs text-slate-400">Culinary arts specialists</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
