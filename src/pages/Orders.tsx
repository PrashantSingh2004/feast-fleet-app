import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Sparkles, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  restaurant_name: string;
  restaurant_image: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: Array<{
    item_name: string;
    quantity: number;
    price: number;
  }>;
}

interface AIRecommendation {
  title: string;
  reason: string;
  restaurant: string;
  items: string[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
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
    fetchOrders();
    fetchAIRecommendations();
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAIRecommendations = async () => {
    setAiLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke("ai-recommendations", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setRecommendations(data.recommendations || []);
    } catch (error: any) {
      console.error("AI recommendations error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      preparing: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      out_for_delivery: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      delivered: "bg-green-500/10 text-green-600 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return colors[status] || colors.pending;
  };

  const formatStatus = (status: string) => {
    return status.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
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
        <h1 className="text-3xl font-bold mb-8 text-foreground">My Orders</h1>

        {/* AI-Powered Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                AI Recommendations Just For You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-card-foreground">
                      {rec.title}
                    </h3>
                    <TrendingUp className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{rec.restaurant}</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {aiLoading && (
              <div className="text-center mt-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary inline-block" />
                <p className="text-sm text-muted-foreground mt-2">
                  Analyzing your preferences...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Order History */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center py-16 rounded-xl border border-border bg-card">
              <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start ordering to see your history here!
              </p>
              <Button variant="hero" onClick={() => navigate("/")}>
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {order.restaurant_image && (
                      <img
                        src={order.restaurant_image}
                        alt={order.restaurant_name}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-card-foreground mb-1">
                            {order.restaurant_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.order_items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm text-muted-foreground"
                          >
                            <span>
                              {item.item_name} x {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="font-semibold text-lg text-primary">
                          Total: ₹{order.total_amount.toFixed(2)}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                          {order.status === "delivered" && (
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4 mr-1" />
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
