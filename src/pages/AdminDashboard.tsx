import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Star, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface PopularItem {
  item_name: string;
  category: string | null;
  order_count: number;
  total_quantity: number;
  avg_price: number;
  restaurant_name: string;
  restaurant_id: string;
}

interface PopularRestaurant {
  restaurant_id: string;
  restaurant_name: string;
  total_orders: number;
  total_revenue: number;
  avg_order_value: number;
  avg_rating: number;
}

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [popularRestaurants, setPopularRestaurants] = useState<PopularRestaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchAnalytics();
    } catch (error: any) {
      console.error("Admin access check error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Fetch popular items
      const { data: itemsData, error: itemsError } = await supabase
        .from("popular_items")
        .select("*")
        .limit(10);

      if (itemsError) throw itemsError;
      setPopularItems(itemsData || []);

      // Fetch popular restaurants
      const { data: restaurantsData, error: restaurantsError } = await supabase
        .from("popular_restaurants")
        .select("*")
        .limit(10);

      if (restaurantsError) throw restaurantsError;
      setPopularRestaurants(restaurantsData || []);
    } catch (error: any) {
      toast.error("Failed to load analytics");
      console.error(error);
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

  if (!isAdmin) {
    return null;
  }

  const totalOrders = popularRestaurants.reduce((sum, r) => sum + r.total_orders, 0);
  const totalRevenue = popularRestaurants.reduce((sum, r) => sum + r.total_revenue, 0);
  const avgRating = popularRestaurants.length > 0
    ? popularRestaurants.reduce((sum, r) => sum + (r.avg_rating || 0), 0) / popularRestaurants.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">Delivered orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From all orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Customer satisfaction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popular Items</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{popularItems.length}</div>
              <p className="text-xs text-muted-foreground">Unique menu items</p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Most Popular Items</CardTitle>
            <CardDescription>Top menu items by order count</CardDescription>
          </CardHeader>
          <CardContent>
            {popularItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders yet. Start by signing up and placing orders to see analytics.
              </div>
            ) : (
              <div className="space-y-4">
                {popularItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-card-foreground">{item.item_name}</h3>
                        {item.category && (
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.restaurant_name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{item.order_count} orders</div>
                      <div className="text-sm text-muted-foreground">
                        {item.total_quantity} items • ₹{item.avg_price.toFixed(2)} avg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Restaurants</CardTitle>
            <CardDescription>Restaurants ranked by total orders</CardDescription>
          </CardHeader>
          <CardContent>
            {popularRestaurants.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No restaurant data yet. Orders will appear here once customers start ordering.
              </div>
            ) : (
              <div className="space-y-4">
                {popularRestaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                        <h3 className="font-semibold text-card-foreground">{restaurant.restaurant_name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{restaurant.total_orders} orders</span>
                        <span>₹{restaurant.avg_order_value.toFixed(2)} avg order</span>
                        {restaurant.avg_rating && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {restaurant.avg_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{restaurant.total_revenue.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
