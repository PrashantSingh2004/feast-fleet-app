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
  // Pizza Items
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
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken with BBQ sauce and onions",
    price: 449,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "Pizza",
    veg: false,
    bestseller: false
  },
  {
    id: "4",
    name: "Veggie Supreme Pizza",
    description: "Loaded with bell peppers, onions, olives, and mushrooms",
    price: 379,
    image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
    category: "Pizza",
    veg: true,
    bestseller: false
  },

  // Burger Items
  {
    id: "5",
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 249,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Burgers",
    veg: false,
    bestseller: true
  },
  {
    id: "6",
    name: "Chicken Burger",
    description: "Crispy fried chicken with mayo and pickles",
    price: 229,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop",
    category: "Burgers",
    veg: false,
    bestseller: true
  },
  {
    id: "7",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 199,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop",
    category: "Burgers",
    veg: true,
    bestseller: false
  },
  {
    id: "8",
    name: "Cheese Burger",
    description: "Double cheese with beef patty and caramelized onions",
    price: 279,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
    category: "Burgers",
    veg: false,
    bestseller: false
  },

  // Chinese Items
  {
    id: "9",
    name: "Hakka Noodles",
    description: "Stir-fried noodles with vegetables and soy sauce",
    price: 199,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    category: "Chinese",
    veg: true,
    bestseller: true
  },
  {
    id: "10",
    name: "Chicken Manchurian",
    description: "Crispy chicken in spicy Manchurian sauce",
    price: 299,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
    category: "Chinese",
    veg: false,
    bestseller: true
  },
  {
    id: "11",
    name: "Fried Rice",
    description: "Egg fried rice with mixed vegetables",
    price: 179,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    category: "Chinese",
    veg: true,
    bestseller: false
  },
  {
    id: "12",
    name: "Spring Rolls",
    description: "Crispy vegetable spring rolls with sweet chili sauce",
    price: 149,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop",
    category: "Chinese",
    veg: true,
    bestseller: false
  },

  // Indian Items
  {
    id: "13",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken",
    price: 349,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
    category: "Indian",
    veg: false,
    bestseller: true
  },
  {
    id: "14",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich spicy gravy",
    price: 299,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    category: "Indian",
    veg: true,
    bestseller: true
  },
  {
    id: "15",
    name: "Biryani",
    description: "Aromatic rice with spices and meat",
    price: 329,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    category: "Indian",
    veg: false,
    bestseller: true
  },
  {
    id: "16",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked overnight",
    price: 249,
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop",
    category: "Indian",
    veg: true,
    bestseller: false
  },
  {
    id: "17",
    name: "Tandoori Chicken",
    description: "Chicken marinated in yogurt and spices, grilled in tandoor",
    price: 379,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    category: "Indian",
    veg: false,
    bestseller: false
  },

  // Sushi Items
  {
    id: "18",
    name: "California Roll",
    description: "Crab, avocado, and cucumber wrapped in rice",
    price: 399,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    category: "Sushi",
    veg: false,
    bestseller: true
  },
  {
    id: "19",
    name: "Salmon Nigiri",
    description: "Fresh salmon over pressed rice",
    price: 449,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop",
    category: "Sushi",
    veg: false,
    bestseller: true
  },
  {
    id: "20",
    name: "Vegetable Tempura Roll",
    description: "Crispy tempura vegetables with avocado",
    price: 349,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    category: "Sushi",
    veg: true,
    bestseller: false
  },
  {
    id: "21",
    name: "Spicy Tuna Roll",
    description: "Tuna with spicy mayo and cucumber",
    price: 429,
    image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&h=300&fit=crop",
    category: "Sushi",
    veg: false,
    bestseller: false
  },

  // Mexican Items
  {
    id: "22",
    name: "Chicken Tacos",
    description: "Soft tacos with grilled chicken, salsa, and guacamole",
    price: 249,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    category: "Mexican",
    veg: false,
    bestseller: true
  },
  {
    id: "23",
    name: "Beef Burrito",
    description: "Large flour tortilla with beef, beans, rice, and cheese",
    price: 299,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
    category: "Mexican",
    veg: false,
    bestseller: true
  },
  {
    id: "24",
    name: "Vegetarian Quesadilla",
    description: "Grilled tortilla with cheese, peppers, and onions",
    price: 219,
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop",
    category: "Mexican",
    veg: true,
    bestseller: false
  },
  {
    id: "25",
    name: "Nachos Supreme",
    description: "Tortilla chips with cheese, jalapeños, sour cream",
    price: 279,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop",
    category: "Mexican",
    veg: true,
    bestseller: false
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
