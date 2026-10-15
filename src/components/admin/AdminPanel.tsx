"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { Restaurant, CategoryWithItems, Promotion } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { CategorySection } from "./CategorySection";
import { PromotionSection } from "./PromotionSection";
import { QrButton } from "./QrButton";
import { ChangePassword } from "./ChangePassword";

type Props = {
  restaurant: Restaurant;
  initialCategories: CategoryWithItems[];
  initialPromotions: Promotion[];
  siteUrl: string;
};

export function AdminPanel({ restaurant, initialCategories, initialPromotions, siteUrl }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [promotions, setPromotions] = useState(initialPromotions);
  const supabase = createClient();

  const refresh = useCallback(async () => {
    const [{ data: cats }, { data: items }, { data: promos }] = await Promise.all([
      supabase.from("categories").select("*").eq("restaurant_id", restaurant.id).order("position"),
      supabase
        .from("items")
        .select("*, categories!inner(restaurant_id)")
        .eq("categories.restaurant_id", restaurant.id)
        .order("position"),
      supabase.from("promotions").select("*").eq("restaurant_id", restaurant.id),
    ]);

    setCategories(
      (cats ?? []).map((cat) => ({
        ...cat,
        items: (items ?? []).filter((item) => item.category_id === cat.id),
      }))
    );
    setPromotions(promos ?? []);
  }, [restaurant.id, supabase]);

  async function addCategory() {
    await supabase.from("categories").insert({
      restaurant_id: restaurant.id,
      name_es: "Nueva categoría",
      position: categories.length,
    });
    refresh();
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  }

  const menuUrl = `${siteUrl}/${restaurant.slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-stone-500 underline">
            ← Mis restaurantes
          </Link>
          <h1 className="font-serif text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-sm text-stone-500">{menuUrl}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/${restaurant.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 rounded-md border border-stone-300 px-4 font-medium hover:bg-stone-100"
          >
            Ver mi menú
          </a>
          <QrButton url={menuUrl} filename={restaurant.slug} />
          <ChangePassword />
          <button onClick={logout} className="text-sm text-stone-500 underline">
            Salir
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <CategorySection
            key={cat.id}
            category={cat}
            restaurantSlug={restaurant.slug}
            onChanged={refresh}
            isFirst={i === 0}
            isLast={i === categories.length - 1}
          />
        ))}
      </div>

      <button
        onClick={addCategory}
        className="mt-4 min-h-11 w-full rounded-md border border-dashed border-stone-400 px-4 font-medium text-stone-600 hover:bg-stone-50"
      >
        + Agregar categoría
      </button>

      <div className="mt-8">
        <PromotionSection restaurantId={restaurant.id} promotions={promotions} onChanged={refresh} />
      </div>
    </div>
  );
}
