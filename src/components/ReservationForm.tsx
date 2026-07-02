import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  Calendar,
  Clock3,
  Sparkles,
  Barcode,
  Trash2
} from "lucide-react";
import { MenuItem, Reservation } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ReservationFormProps {
  preOrderedDishes: MenuItem[];
  onRemovePreOrder: (id: string) => void;
  onClearPreOrders: () => void;
}

export default function ReservationForm({
  preOrderedDishes,
  onRemovePreOrder,
  onClearPreOrders
}: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    specialRequests: ""
  });

  const [loading, setLoading] = useState(false);
  const [successReservation, setSuccessReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formattedRequest = {
        ...formData,
        // Append pre-ordered food to special requests for backend context
        specialRequests: preOrderedDishes.length > 0 
          ? `${formData.specialRequests} [Pre-ordered: ${preOrderedDishes.map(d => `${d.name} ($${d.price})`).join(", ")}]`
          : formData.specialRequests
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedRequest)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Reservation failed");
      }

      const confirmedReservation = await res.json();
      setSuccessReservation(confirmedReservation);
      onClearPreOrders(); // Reset pre-ordered selection
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "2",
        date: "",
        time: "",
        specialRequests: ""
      });
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this table booking?")) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Reservation cancelled successfully.");
        setSuccessReservation(null);
      }
    } catch (err) {
      console.error("Failed to cancel", err);
    }
  };

  return (
    <section id="reservations" className="py-24 bg-white relative">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information Cards (Span 5) */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold tracking-widest text-rose-600 uppercase">
                Contact & Timings
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Reservation Table & Enjoy Dining Table
              </h2>
              <div className="w-12 h-1 bg-rose-600 rounded" />
            </div>

            <p className="font-sans text-base text-slate-500 leading-relaxed">
              Plan your morning, lunch, or sunset dining with us. Book in seconds to secure your premium seating zone.
            </p>

            {/* Contact details list */}
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl shrink-0">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800">Our Location</h4>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                    124 Gourmet Boulevard, Michelin District, Manhattan, NY 10013
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl shrink-0">
                  <Phone className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800">Phone & Enquiries</h4>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                    +1 (555) 123-4567 <span className="text-rose-500 font-semibold">(24/7 Hotline)</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl shrink-0">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800">Support Email</h4>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                    dining@resto-gourmet.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl shrink-0">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-800">Opening Hours</h4>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Mon - Fri: 08:00 AM - 11:00 PM <br />
                    Sat - Sun: 07:00 AM - Midnight
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form / Ticket Confirmation (Span 7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!successReservation ? (
                /* Main Interactive Form Card */
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl"
                >
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    {/* Error indicator */}
                    {error && (
                      <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3 text-rose-600">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="font-sans text-xs font-semibold">{error}</span>
                      </div>
                    )}

                    {/* Pre-ordered Food list callout */}
                    {preOrderedDishes.length > 0 && (
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span>Pre-ordered Specialties</span>
                          </span>
                          <button
                            type="button"
                            onClick={onClearPreOrders}
                            className="font-sans text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove All
                          </button>
                        </div>
                        <ul className="space-y-1.5">
                          {preOrderedDishes.map((dish) => (
                            <li key={dish.id} className="flex items-center justify-between text-xs font-medium text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                              <span>{dish.name}</span>
                              <div className="flex items-center space-x-3">
                                <span className="font-mono font-bold">${dish.price.toFixed(2)}</span>
                                <button
                                  type="button"
                                  onClick={() => onRemovePreOrder(dish.id)}
                                  className="text-slate-400 hover:text-rose-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <p className="font-sans text-[10px] text-emerald-700 italic">
                          *These items will be prepared ahead and served upon your arrival!
                        </p>
                      </div>
                    )}

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Jane Doe"
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl placeholder:text-slate-300"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. jane@example.com"
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl placeholder:text-slate-300"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +1 (555) 123-4567"
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl placeholder:text-slate-300"
                        />
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-rose-500" />
                          <span>Number of Guests</span>
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl cursor-pointer"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5 People</option>
                          <option value="6">6+ People (Group)</option>
                        </select>
                      </div>

                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-rose-500" />
                          <span>Date Selection</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl cursor-pointer"
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center space-x-1">
                          <Clock3 className="w-3.5 h-3.5 text-rose-500" />
                          <span>Time Slot</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Special Requests or Food Allergies
                      </label>
                      <textarea
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="e.g. Window seat, food allergy notes, gluten intolerance..."
                        className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-rose-500/20 text-slate-700 text-sm font-semibold py-3 px-4 rounded-xl placeholder:text-slate-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-sans text-sm font-bold py-4 rounded-2xl shadow-xl shadow-rose-600/10 hover:shadow-rose-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Securing Your Table...</span>
                        </>
                      ) : (
                        <span>Confirm Table Booking</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Gorgeous Interactive Ticket Receipt */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl relative max-w-lg mx-auto text-left"
                >
                  {/* Confetti decoration */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-rose-600 to-rose-500" />
                  
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Header receipt status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="bg-emerald-500 text-white p-1.5 rounded-full">
                          <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                        </div>
                        <div>
                          <span className="font-sans text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Confirmed</span>
                          <h3 className="font-display font-black text-lg text-white">Table Reserved</h3>
                        </div>
                      </div>
                      
                      {/* Ticket Close indicator */}
                      <button
                        onClick={() => setSuccessReservation(null)}
                        className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="border-t border-b border-slate-800 py-4 space-y-3.5">
                      {/* Booking Code */}
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs font-semibold text-slate-500 uppercase">Booking Reference</span>
                        <span className="font-mono text-sm font-bold text-amber-400 uppercase">
                          {successReservation.id}
                        </span>
                      </div>

                      {/* Guest Name */}
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs font-semibold text-slate-500 uppercase">Guest Name</span>
                        <span className="font-sans text-xs font-bold text-white">
                          {successReservation.name}
                        </span>
                      </div>

                      {/* Table for */}
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs font-semibold text-slate-500 uppercase">Table For</span>
                        <span className="font-sans text-xs font-bold text-white">
                          {successReservation.guests} {successReservation.guests === 1 ? "Person" : "People"}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs font-semibold text-slate-500 uppercase">Reservation Date</span>
                        <span className="font-sans text-xs font-bold text-white">
                          {successReservation.date}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs font-semibold text-slate-500 uppercase">Arrival Time</span>
                        <span className="font-sans text-xs font-bold text-white">
                          {successReservation.time}
                        </span>
                      </div>
                    </div>

                    {/* Preordered dishes list inside receipt */}
                    {successReservation.specialRequests && (
                      <div className="bg-slate-800 p-4 rounded-2xl space-y-1.5 text-xs text-slate-400">
                        <span className="font-sans font-bold text-slate-200 block">Host notes & Preorders:</span>
                        <p className="font-sans leading-relaxed text-slate-300 italic">
                          {successReservation.specialRequests}
                        </p>
                      </div>
                    )}

                    {/* Barcode representation */}
                    <div className="flex flex-col items-center pt-2 space-y-2">
                      <Barcode className="w-full h-12 text-slate-400" />
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-[4px]">
                        RESTO-TABLE-{successReservation.id}
                      </span>
                    </div>
                  </div>

                  {/* Actions bar at bottom of ticket */}
                  <div className="bg-slate-950 p-4 sm:px-8 flex justify-between gap-4">
                    <button
                      onClick={() => handleCancelReservation(successReservation.id)}
                      className="bg-transparent hover:bg-rose-500/10 text-rose-500 font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Cancel Table
                    </button>
                    
                    <button
                      onClick={() => setSuccessReservation(null)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
