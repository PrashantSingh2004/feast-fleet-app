import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MapPin, CreditCard, ShoppingBag, Heart, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
    fetchProfile(session.user.id);
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          full_name: fullName,
          phone: phone,
        });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-slide-up">
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
              <Link to="/orders" className="block">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  My Orders
                </Button>
              </Link>
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
                      Email
                    </label>
                    <Input value={user?.email || ""} disabled />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <Button variant="default" size="lg" onClick={handleSave}>
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

                <Link to="/orders">
                  <div className="p-4 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] cursor-pointer">
                    <Heart className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-card-foreground">My Orders</h3>
                    <p className="text-sm text-muted-foreground">View order history</p>
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
