import React from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppFloatingButton() {
  // Use the premium restaurant hotline number format (digits only with country code)
  const phoneNumber = "15551234567";
  const templateMessage = "Hello Resto! I would like to inquire about booking a large group event for our party. Please share package options and availability.";
  const encodedMessage = encodeURIComponent(templateMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end group"
    >
      {/* Floating explanatory tooltip / bubble */}
      <div className="absolute right-0 bottom-16 mb-2 bg-slate-900 text-white text-[11px] font-bold px-3.5 py-2 rounded-2xl shadow-lg border border-slate-800 opacity-0 scale-95 origin-bottom-right group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap flex items-center space-x-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Inquire about Large Groups</span>
      </div>

      {/* Main Pulse Anchor Ring */}
      <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping" />

      {/* Interactive WhatsApp link button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        title="Inquire about large group bookings on WhatsApp"
        id="whatsapp-floating-button"
      >
        <MessageCircle className="w-6.5 h-6.5 fill-white text-emerald-500" />
        
        {/* Micro Notification indicator badge */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-pulse" />
        </span>
      </a>
    </motion.div>
  );
}
