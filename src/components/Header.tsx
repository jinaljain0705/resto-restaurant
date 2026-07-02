import React, { useState, useEffect } from "react";
import { Phone, Menu, X, UtensilsCrossed, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigateToReservations: () => void;
}

export default function Header({ onNavigateToReservations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Services", href: "#services" },
    { name: "Deal", href: "#deals" },
    { name: "Events", href: "#events" },
    { name: "News", href: "#news" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2 group">
            <div className="bg-rose-600 text-white p-2 rounded-xl shadow-lg shadow-rose-500/20 group-hover:bg-rose-700 transition-colors">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
              Resto<span className="text-rose-600">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-rose-600 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+15551234567"
              className="flex items-center text-slate-700 hover:text-rose-600 font-sans text-sm font-semibold transition-colors"
            >
              <div className="bg-slate-100 p-2 rounded-full mr-2 group-hover:bg-rose-50 transition-colors">
                <Phone className="w-4 h-4 text-rose-600" />
              </div>
              <span>+1 (555) 123-4567</span>
            </a>
            <button
              onClick={onNavigateToReservations}
              className="bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-600/10 hover:shadow-rose-600/20 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Book A Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:text-rose-600 hover:bg-rose-50/50 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center px-3 py-2 text-slate-700 hover:text-rose-600 font-semibold"
                >
                  <Phone className="w-4 h-4 text-rose-600 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigateToReservations();
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md text-center transition-all flex items-center justify-center space-x-2"
                >
                  <span>Book A Table</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
