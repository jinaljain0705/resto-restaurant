import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import SteakBanner from "./components/SteakBanner";
import MenuSection from "./components/MenuSection";
import Services from "./components/Services";
import DealOfWeek from "./components/DealOfWeek";
import PrivateEvents from "./components/PrivateEvents";
import ExperienceBanner from "./components/ExperienceBanner";
import RecentNews from "./components/RecentNews";
import ReservationForm from "./components/ReservationForm";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import { MenuItem } from "./types";

export default function App() {
  const [activeSearchFilters, setActiveSearchFilters] = useState<{
    category: string;
    location: string;
    timeSlot: string;
  } | null>(null);

  const [preOrderedDishes, setPreOrderedDishes] = useState<MenuItem[]>([]);

  const handleHeroSearch = (filters: { category: string; location: string; timeSlot: string }) => {
    setActiveSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setActiveSearchFilters(null);
  };

  const handlePreOrderDish = (dish: MenuItem) => {
    setPreOrderedDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        // Remove from selection
        return prev.filter((d) => d.id !== dish.id);
      } else {
        // Add to selection
        return [...prev, dish];
      }
    });
  };

  const handleRemovePreOrder = (id: string) => {
    setPreOrderedDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearPreOrders = () => {
    setPreOrderedDishes([]);
  };

  const handleNavigateToReservations = () => {
    const element = document.querySelector("#reservations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-white text-slate-700 antialiased min-h-screen selection:bg-rose-600 selection:text-white">
      {/* Sticky Header */}
      <Header onNavigateToReservations={handleNavigateToReservations} />

      {/* Main Sections flow */}
      <main>
        {/* Hero Banner with search filter triggers */}
        <Hero onSearch={handleHeroSearch} />

        {/* Detailed culinary about history */}
        <About />

        {/* Highlight steak platter card */}
        <SteakBanner />

        {/* Interactive Menu Section */}
        <MenuSection
          activeSearchFilters={activeSearchFilters}
          onClearSearch={handleClearSearch}
          onPreOrderDish={handlePreOrderDish}
          preOrderedDishes={preOrderedDishes}
        />

        {/* Yellow circle service card grids */}
        <Services />

        {/* Spotlight Weekly Deal with countdown */}
        <DealOfWeek onPreOrderDish={handlePreOrderDish} />

        {/* Private Dining layout */}
        <PrivateEvents />

        {/* Red Experience statistics Banner */}
        <ExperienceBanner />

        {/* Culinary blogs & Modal reader */}
        <RecentNews />

        {/* Form and Contact summary */}
        <ReservationForm
          preOrderedDishes={preOrderedDishes}
          onRemovePreOrder={handleRemovePreOrder}
          onClearPreOrders={handleClearPreOrders}
        />
      </main>

      {/* Structured Footer with subscription form */}
      <Footer />

      {/* Floating Inquiry Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
