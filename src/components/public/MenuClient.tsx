"use client";

import { useState } from "react";
import type { Restaurant, CategoryWithItems, Promotion } from "@/types/database";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppButton } from "./WhatsAppButton";
import { PromoBanner } from "./PromoBanner";
import { CategoryNav } from "./CategoryNav";
import { ItemCard } from "./ItemCard";

type Props = {
  restaurant: Restaurant;
  categories: CategoryWithItems[];
  promotions: Promotion[];
};

export function MenuClient({ restaurant, categories, promotions }: Props) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [activeId, setActiveId] = useState<string | null>(categories[0]?.id ?? null);

  function scrollTo(id: string) {
    setActiveId(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between gap-3 border-b border-stone-200 bg-[#FFFDF7]/95 px-4 backdrop-blur">
        <div className="flex items-center gap-2 overflow-hidden">
          {restaurant.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={restaurant.logo_url} alt={restaurant.name} className="h-9 w-9 rounded-full object-cover" />
          )}
          <h1 className="truncate font-serif text-lg font-bold">{restaurant.name}</h1>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} />
      </header>

      <PromoBanner promotions={promotions} lang={lang} />

      <CategoryNav
        categories={categories}
        lang={lang}
        activeId={activeId}
        onSelect={scrollTo}
      />

      <main className="mx-auto max-w-2xl px-4">
        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="py-5">
            <h2 className="mb-2 font-serif text-xl font-bold text-stone-900">
              {lang === "en" && cat.name_en ? cat.name_en : cat.name_es}
            </h2>
            <div className="space-y-1">
              {cat.items.map((item) => (
                <ItemCard key={item.id} item={item} lang={lang} />
              ))}
              {cat.items.length === 0 && (
                <p className="text-sm text-stone-400">
                  {lang === "en" ? "No items yet." : "Sin platos todavía."}
                </p>
              )}
            </div>
          </section>
        ))}
        {categories.length === 0 && (
          <p className="py-10 text-center text-stone-400">
            {lang === "en" ? "Menu coming soon." : "Menú próximamente."}
          </p>
        )}
      </main>

      <footer className="mt-8 border-t border-stone-200 px-4 py-6 text-center text-sm text-stone-500">
        {restaurant.name}
      </footer>

      <WhatsAppButton whatsapp={restaurant.whatsapp} lang={lang} />
    </div>
  );
}
