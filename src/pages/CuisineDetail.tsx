import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { mockRestaurants, mockMenuItems } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CuisineDetail = () => {
  const { cuisine } = useParams<{ cuisine: string }>();
  const cuisineName = cuisine?.charAt(0).toUpperCase() + cuisine?.slice(1) || "";
  const { addToCart } = useCart();

  const restaurants = mockRestaurants.filter(
    (r) => r.cuisine.toLowerCase() === cuisine?.toLowerCase()
  );

  const menuItems = mockMenuItems.filter(
    (item) => item.category.toLowerCase().includes(cuisine?.toLowerCase() || "")
  );

  const handleAddToCart = (item: typeof mockMenuItems[0]) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {cuisineName} Cuisine
          </h1>
          <p className="text-white/90 mt-2 text-lg">
            Discover the best {cuisineName.toLowerCase()} restaurants and dishes
          </p>
        </div>
      </div>

      {/* Restaurants Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Top {cuisineName} Restaurants
        </h2>
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-[var(--transition-smooth)]">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-[var(--transition-smooth)]"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span>{restaurant.deliveryTime}</span>
                      <span>₹{restaurant.costForTwo} for two</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No restaurants found for this cuisine.
          </p>
        )}
      </section>

      {/* Popular Dishes Section */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Popular {cuisineName} Dishes
        </h2>
        {menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-[var(--transition-smooth)]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.bestseller && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Bestseller
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <Badge variant={item.veg ? "outline" : "destructive"}>
                      {item.veg ? "VEG" : "NON-VEG"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">₹{item.price}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No dishes found for this cuisine.
          </p>
        )}
      </section>
    </div>
  );
};

export default CuisineDetail;
