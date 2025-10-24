import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Store, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

interface PopularItem {
  item_name: string;
  category: string;
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
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [popularRestaurants, setPopularRestaurants] = useState<PopularRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (rolesError) {
        console.error("Error checking admin role:", rolesError);
        toast.error("Failed to verify admin access");
        navigate("/");
        return;
      }

      if (!roles) {
        toast.error("Access denied: Admin privileges required");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchAnalytics();
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Fetch popular items
      const { data: items, error: itemsError } = await supabase
        .from("popular_items")
        .select("*")
        .limit(10);

      if (itemsError) throw itemsError;
      setPopularItems(items || []);

      // Fetch popular restaurants
      const { data: restaurants, error: restaurantsError } = await supabase
        .from("popular_restaurants")
        .select("*")
        .limit(10);

      if (restaurantsError) throw restaurantsError;
      setPopularRestaurants(restaurants || []);
    } catch (error: any) {
      console.error("Analytics fetch error:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-background animate-slide-up">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        {/* Popular Items Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Most Popular Items</CardTitle>
            </div>
            <CardDescription>
              Top ordered items across all restaurants
            </CardDescription>
          </CardHeader>
          <CardContent>
            {popularItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No order data available yet.</p>
                <p className="text-sm mt-2">Data will appear once users place orders.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Total Qty</TableHead>
                    <TableHead className="text-right">Avg Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularItems.map((item, index) => (
                    <TableRow key={`${item.item_name}-${item.restaurant_id}-${index}`}>
                      <TableCell className="font-medium">{item.item_name}</TableCell>
                      <TableCell>{item.restaurant_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category || "Uncategorized"}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{item.order_count}</TableCell>
                      <TableCell className="text-right">{item.total_quantity}</TableCell>
                      <TableCell className="text-right">₹{Number(item.avg_price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Popular Restaurants Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>Top Performing Restaurants</CardTitle>
            </div>
            <CardDescription>
              Restaurant performance metrics and ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {popularRestaurants.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No restaurant data available yet.</p>
                <p className="text-sm mt-2">Data will appear once orders are delivered.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Revenue</TableHead>
                    <TableHead className="text-right">Avg Order Value</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularRestaurants.map((restaurant) => (
                    <TableRow key={restaurant.restaurant_id}>
                      <TableCell className="font-medium">{restaurant.restaurant_name}</TableCell>
                      <TableCell className="text-right">{restaurant.total_orders}</TableCell>
                      <TableCell className="text-right">₹{Number(restaurant.total_revenue).toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹{Number(restaurant.avg_order_value).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {restaurant.avg_rating ? (
                          <Badge variant="secondary">
                            ⭐ {Number(restaurant.avg_rating).toFixed(1)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
