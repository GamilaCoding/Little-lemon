import heroImage from "@/assets/hero-restaurant.jpg";
import ReservationForm from "@/components/ReservationForm";
import { MapPin, Phone, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍋</span>
            <h1 className="text-xl font-display font-bold text-primary">Little Lemon</h1>
          </div>
          <nav className="hidden sm:flex gap-6 font-body text-muted-foreground">
            <a href="#reserve" className="hover:text-primary transition-colors">Reserve a Table</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Little Lemon Restaurant - Warm Mediterranean ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-3 animate-fade-in-up">
            Little Lemon
          </h2>
          <p
            className="text-lg md:text-xl text-primary-foreground/90 font-body max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Mediterranean cuisine with an authentic twist
          </p>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-16 md:py-24">
        <div className="container max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
              Reserve Your Table
            </h2>
            <p className="text-muted-foreground font-body">
              Fill in the details below and we'll get the perfect spot ready for you
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-lg">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <p className="font-body text-sm">12 River Street, Chicago, IL</p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Phone className="h-5 w-5 text-secondary" />
              <p className="font-body text-sm">+1 (312) 555-0192</p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <p className="font-body text-sm">Daily 12:00 PM – 10:00 PM</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center">
            <p className="text-sm font-body text-primary-foreground/70">
              © 2026 Little Lemon. All rights reserved 🍋
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
