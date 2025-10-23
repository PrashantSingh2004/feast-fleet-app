import { Restaurant, MenuItem } from "@/types";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
    cuisine: "Italian, Pizza",
    rating: 4.5,
    deliveryTime: "30-35 mins",
    costForTwo: 400,
    offers: ["50% off up to ₹100", "Free delivery"],
    description: "Authentic Italian pizzas with the finest ingredients"
  },
  {
    id: "2",
    name: "Burger Hub",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    cuisine: "American, Burgers",
    rating: 4.3,
    deliveryTime: "25-30 mins",
    costForTwo: 350,
    offers: ["40% off up to ₹80"],
    description: "Juicy burgers and crispy fries"
  },
  {
    id: "3",
    name: "Sushi World",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    cuisine: "Japanese, Sushi",
    rating: 4.7,
    deliveryTime: "40-45 mins",
    costForTwo: 800,
    offers: ["Free delivery on orders above ₹500"],
    description: "Fresh sushi and authentic Japanese cuisine"
  },
  {
    id: "4",
    name: "Spice Kitchen",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    cuisine: "Indian, North Indian",
    rating: 4.4,
    deliveryTime: "35-40 mins",
    costForTwo: 450,
    offers: ["20% off up to ₹50"],
    description: "Aromatic Indian curries and tandoor specialties"
  },
  {
    id: "5",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop",
    cuisine: "Mexican, Tacos",
    rating: 4.2,
    deliveryTime: "30-35 mins",
    costForTwo: 300,
    offers: ["Buy 1 Get 1 on selected items"],
    description: "Authentic Mexican tacos and burritos"
  },
  {
    id: "6",
    name: "Noodle House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
    cuisine: "Chinese, Asian",
    rating: 4.1,
    deliveryTime: "25-30 mins",
    costForTwo: 350,
    offers: ["30% off up to ₹70"],
    description: "Delicious noodles and Chinese favorites"
  }
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: 299,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    category: "Pizza",
    veg: true,
    bestseller: true
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni and cheese",
    price: 399,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "Pizza",
    veg: false,
    bestseller: true
  },
  {
    id: "3",
    name: "Garlic Bread",
    description: "Crispy bread with garlic butter and herbs",
    price: 149,
    image: "https://images.unsplash.com/photo-1573140401552-3a9e6b24e2c4?w=400&h=300&fit=crop",
    category: "Starters",
    veg: true
  },
  {
    id: "4",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 199,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    category: "Salads",
    veg: true
  },
  {
    id: "5",
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with herbs",
    price: 349,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    category: "Pasta",
    veg: true
  }
];

export const cuisineCategories = [
  { name: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop" },
  { name: "Burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop" },
  { name: "Chinese", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=300&fit=crop" },
  { name: "Indian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop" },
  { name: "Sushi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop" },
  { name: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop" }
];
