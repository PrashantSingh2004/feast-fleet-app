import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MapPin, CreditCard, ShoppingBag, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-3">
                <User className="h-5 w-5" />
                Account Details
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <ShoppingBag className="h-5 w-5" />
                My Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Heart className="h-5 w-5" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <MapPin className="h-5 w-5" />
                Addresses
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </Button>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6 text-card-foreground">
                  Account Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input placeholder="John Doe" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div className="pt-4">
                    <Button variant="default" size="lg">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Link to="/cart">
                  <div className="p-4 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] cursor-pointer">
                    <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-card-foreground">View Cart</h3>
                    <p className="text-sm text-muted-foreground">Check your items</p>
                  </div>
                </Link>

                <Link to="/">
                  <div className="p-4 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] cursor-pointer">
                    <Heart className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-card-foreground">Favorites</h3>
                    <p className="text-sm text-muted-foreground">Your loved meals</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
