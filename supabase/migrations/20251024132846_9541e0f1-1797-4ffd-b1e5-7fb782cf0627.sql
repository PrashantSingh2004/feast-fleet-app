-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create analytics view for popular items
CREATE OR REPLACE VIEW public.popular_items AS
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

-- Create view for restaurant popularity
CREATE OR REPLACE VIEW public.popular_restaurants AS
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

-- Grant access to views for admins
GRANT SELECT ON public.popular_items TO authenticated;
GRANT SELECT ON public.popular_restaurants TO authenticated;