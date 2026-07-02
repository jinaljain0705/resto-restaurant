import { Coffee, Bike, GlassWater, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const serviceItems = [
    {
      id: "srv-1",
      icon: Coffee,
      title: "Afternoon Tea",
      description: "Exceptional loose-leaf tea selections paired with freshly baked fruit scones, clotted creams, and masterfully crafted mini-sandwiches."
    },
    {
      id: "srv-2",
      icon: Bike,
      title: "Takeaway & Delivery",
      description: "Get gourmet culinary creations sealed with high temperature packaging delivered straight to your residence or private workspace."
    },
    {
      id: "srv-3",
      icon: GlassWater,
      title: "Wine & Cocktails",
      description: "Award-winning mixology program and a cellar housing over 400 prestigious vintage selections curated by master sommeliers."
    },
    {
      id: "srv-4",
      icon: Sun,
      title: "Alfresco Dining",
      description: "Enjoy dining on our beautiful sun-lit garden patio terrace framed by soothing waterfalls and fresh outdoor aromatic herbs."
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
          <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
            Service Excellence
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            We Provide Best Services
          </h2>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded" />
          <p className="font-sans text-sm text-slate-400">
            Beyond engineering pristine dishes, we deliver complete atmospheric hospitality. Choose from any of our premier dining services.
          </p>
        </div>

        {/* 4 Cards Grid mimicking the uploaded mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100/80 shadow-sm hover:shadow-xl hover:translate-y-[-6px] transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Yellow circle illustration exact to image */}
                <div className="w-20 h-20 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center mb-6 shadow-md shadow-amber-400/10 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-9 h-9" />
                </div>

                <h3 className="font-display font-bold text-lg text-slate-800 mb-3">
                  {item.title}
                </h3>
                
                <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-[220px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
