import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RestaurantCard from "@/components/RestaurantCard";
import { mockRestaurants, cuisineCategories } from "@/data/mockData";
import heroImage from "@/assets/hero-food.jpg";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background animate-slide-up">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Order Your Favorite Food
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Get delicious meals delivered to your doorstep in minutes
          </p>
          
          <div className="flex gap-2 max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl">
            <Input
              placeholder="Search for restaurants or dishes..."
              className="border-0 focus-visible:ring-0 text-base"
            />
            <Button variant="hero" size="lg" className="rounded-full px-8">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Cuisine Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Explore Cuisines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuisineCategories.map((cuisine) => (
            <div
              key={cuisine.name}
              className="group cursor-pointer text-center"
            >
              <div className="relative overflow-hidden rounded-full aspect-square mb-3 border-2 border-border hover:border-primary transition-[var(--transition-smooth)]">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-[var(--transition-smooth)]"
                />
              </div>
              <p className="font-medium text-foreground">{cuisine.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Top Restaurants</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FoodExpress
              </h3>
              <p className="text-muted-foreground text-sm">
                Delivering happiness, one meal at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Team</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help & Support</li>
                <li>Partner with us</li>
                <li>Ride with us</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 FoodExpress. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
