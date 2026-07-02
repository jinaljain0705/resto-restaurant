import React, { useState } from "react";
import { UtensilsCrossed, Facebook, Twitter, Instagram, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Simulate newsletter API registration
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          subject: "Newsletter Subscription",
          message: `User subscribed to newsletter with email: ${email}`
        })
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error("Failed to subscribe:", err);
    } finally {
      setLoading(false);
    }
  };

  const footerLinks = {
    quickLinks: [
      { name: "Home", href: "#hero" },
      { name: "About Us", href: "#about" },
      { name: "Our Menu", href: "#menu" },
      { name: "Services", href: "#services" }
    ],
    experiences: [
      { name: "Deal of Week", href: "#deals" },
      { name: "Private Dining", href: "#events" },
      { name: "Table Booking", href: "#reservations" },
      { name: "Recent News", href: "#news" }
    ]
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 overflow-hidden relative">
      {/* Visual backgrounds */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Left Block: Pink Logo Card (Span 4) */}
          <div className="lg:col-span-4 bg-rose-600 text-white p-8 rounded-3xl text-left shadow-lg shadow-rose-600/10">
            <a href="#hero" className="flex items-center space-x-2 mb-6">
              <div className="bg-white text-rose-600 p-2 rounded-xl">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Resto.</span>
            </a>
            
            <p className="font-sans text-xs text-rose-100 leading-relaxed mb-6">
              Engineering outstanding gastronomic moments with clean bio-organic ingredients, handcrafted sauces, and absolute professional hospitality.
            </p>

            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-white/10 hover:bg-white text-white hover:text-rose-600 p-2.5 rounded-xl transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle Links columns (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-sans text-xs font-medium text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5">
                Explore
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.experiences.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-sans text-xs font-medium text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Newsletter signup (Span 4) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Subscribe to our monthly food digest. Receive exclusive recipes, table updates, and seasonal tasting cards.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="relative flex items-center bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 p-1"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 focus:ring-0 text-white font-sans text-xs px-4 py-3 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white p-2.5 rounded-xl transition-all mr-1 flex items-center justify-center cursor-pointer shrink-0"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center space-x-3 text-emerald-400 text-xs"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span className="font-sans font-bold">Successfully Subscribed! Thank you.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Credits Block */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium font-sans text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Resto. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
