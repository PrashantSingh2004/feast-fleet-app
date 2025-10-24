-- Fix security definer view warnings by explicitly setting security invoker
-- and adding proper access control

-- Drop existing views
DROP VIEW IF EXISTS public.popular_items;
DROP VIEW IF EXISTS public.popular_restaurants;

-- Recreate views with explicit SECURITY INVOKER
-- This ensures views run with the permissions of the calling user (respecting RLS)
CREATE VIEW public.popular_items
WITH (security_invoker = true) AS
SELECT 
  oi.item_name,
  oi.category,
  COUNT(*) as order_count,
  SUM(oi.quantity) as total_quantity,
  AVG(oi.price) as avg_price,
  o.restaurant_name,
  o.restaurant_id
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
GROUP BY oi.item_name, oi.category, o.restaurant_name, o.restaurant_id
ORDER BY order_count DESC;

CREATE VIEW public.popular_restaurants
WITH (security_invoker = true) AS
SELECT 
  restaurant_id,
  restaurant_name,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_order_value,
  AVG(rating) as avg_rating
FROM orders
WHERE status = 'delivered'
GROUP BY restaurant_id, restaurant_name
ORDER BY total_orders DESC;