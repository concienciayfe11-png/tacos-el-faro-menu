import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminPanel } from "@/components/admin/AdminPanel";
import type { CategoryWithItems } from "@/types/database";

export default async function AdminRestaurantPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/admin");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", restaurantId)
    .maybeSingle();

  if (!restaurant) notFound();

  const [{ data: categories }, { data: items }, { data: promotions }] = await Promise.all([
    supabase.from("categories").select("*").eq("restaurant_id", restaurant.id).order("position"),
    supabase
      .from("items")
      .select("*, categories!inner(restaurant_id)")
      .eq("categories.restaurant_id", restaurant.id)
      .order("position"),
    supabase.from("promotions").select("*").eq("restaurant_id", restaurant.id),
  ]);

  const categoriesWithItems: CategoryWithItems[] = (categories ?? []).map((cat) => ({
    ...cat,
    items: (items ?? []).filter((item) => item.category_id === cat.id),
  }));

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${protocol}://${host}`;

  return (
    <AdminPanel
      restaurant={restaurant}
      initialCategories={categoriesWithItems}
      initialPromotions={promotions ?? []}
      siteUrl={siteUrl}
    />
  );
}
