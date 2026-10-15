import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MenuClient } from "@/components/public/MenuClient";
import type { CategoryWithItems } from "@/types/database";

export const revalidate = 0;

export default async function RestaurantMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!restaurant) notFound();

  const [{ data: categories }, { data: items }, { data: promotions }] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("position"),
    supabase
      .from("items")
      .select("*, categories!inner(restaurant_id)")
      .eq("categories.restaurant_id", restaurant.id)
      .order("position"),
    supabase
      .from("promotions")
      .select("*")
      .eq("restaurant_id", restaurant.id),
  ]);

  const categoriesWithItems: CategoryWithItems[] = (categories ?? []).map((cat) => ({
    ...cat,
    items: (items ?? []).filter((item) => item.category_id === cat.id),
  }));

  return (
    <MenuClient
      restaurant={restaurant}
      categories={categoriesWithItems}
      promotions={promotions ?? []}
    />
  );
}
