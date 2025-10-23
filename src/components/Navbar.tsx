import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, User, MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FoodExpress
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">Location</span>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden md:inline">Cart</span>
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
