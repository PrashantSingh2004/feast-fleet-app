import { useParams } from "react-router-dom";
import { Star, Clock, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { mockRestaurants, mockMenuItems } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = mockRestaurants.find((r) => r.id === id);
  const [cart, setCart] = useState<string[]>([]);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const handleAddToCart = (itemName: string) => {
    setCart([...cart, itemName]);
    toast.success(`${itemName} added to cart!`);
  };

  const categories = Array.from(new Set(mockMenuItems.map((item) => item.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Restaurant Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6">
          <h1 className="text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
          <p className="text-white/90 text-lg mb-3">{restaurant.cuisine}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-white" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>₹{restaurant.costForTwo} for two</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers */}
      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-3 overflow-x-auto">
              {restaurant.offers.map((offer, index) => (
                <Badge key={index} variant="secondary" className="whitespace-nowrap">
                  {offer}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Menu</h2>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">{category}</h3>
            
            <div className="space-y-4">
              {mockMenuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-lg text-card-foreground">
                              {item.name}
                            </h4>
                            {item.bestseller && (
                              <Badge variant="secondary" className="text-xs">
                                Bestseller
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          <p className="font-semibold text-primary">₹{item.price}</p>
                        </div>
                        
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAddToCart(item.name)}
                          className="shrink-0"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
