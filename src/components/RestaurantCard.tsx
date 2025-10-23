import { Restaurant } from "@/types";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] cursor-pointer">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-[var(--transition-smooth)]"
          />
          {restaurant.offers && restaurant.offers[0] && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-sm font-semibold">{restaurant.offers[0]}</p>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-card-foreground">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-card-foreground">{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            
            <span className="text-muted-foreground">₹{restaurant.costForTwo} for two</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
