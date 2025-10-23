import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = userData.user.id;

    // Get user's order history
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      return new Response(JSON.stringify({ error: "Failed to fetch order history" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get favorite items
    const { data: favorites, error: favError } = await supabase
      .from("favorite_items")
      .select("*")
      .eq("user_id", userId)
      .order("order_count", { ascending: false })
      .limit(10);

    if (favError) {
      console.error("Error fetching favorites:", favError);
    }

    // Build context for AI
    const orderSummary = orders?.map((order: any) => ({
      restaurant: order.restaurant_name,
      items: order.order_items?.map((item: any) => item.item_name),
      date: order.created_at,
    })) || [];

    const favoriteSummary = favorites?.map((fav: any) => ({
      restaurant: fav.restaurant_name,
      item: fav.item_name,
      orderCount: fav.order_count,
    })) || [];

    const currentHour = new Date().getHours();
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const systemPrompt = `You are a personalized food recommendation AI for a food delivery app. Analyze the user's order history and provide intelligent recommendations.

Current context:
- Current time: ${currentHour}:00 (${currentDay})
- User's recent orders: ${JSON.stringify(orderSummary)}
- User's favorite items: ${JSON.stringify(favoriteSummary)}

Provide 3-5 specific, personalized recommendations based on:
1. Their ordering patterns (time of day, day of week)
2. Their favorite cuisines and restaurants
3. Items they order frequently
4. Complementary items they might enjoy

Format your response as a JSON array with this structure:
[
  {
    "title": "Recommendation title",
    "reason": "Why this recommendation",
    "restaurant": "Restaurant name",
    "items": ["item1", "item2"]
  }
]

Be specific, friendly, and insightful. Mention patterns like "You love pizza on Fridays" or "It's dinner time - how about your favorite curry?"`;

    // Call Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Give me personalized food recommendations based on my order history." }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service unavailable. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("AI API error:", aiResponse.status, await aiResponse.text());
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const recommendationsText = aiData.choices[0].message.content;

    // Parse AI response
    let recommendations = [];
    try {
      const jsonMatch = recommendationsText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse AI recommendations:", e);
      recommendations = [{
        title: "Try something new!",
        reason: "Based on your order history, we think you'll love exploring new cuisines.",
        restaurant: "Popular nearby",
        items: ["Top rated dishes"]
      }];
    }

    return new Response(
      JSON.stringify({
        recommendations,
        orderCount: orders?.length || 0,
        favoriteCount: favorites?.length || 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ai-recommendations function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
