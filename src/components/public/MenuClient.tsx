"use client";

import { useState } from "react";
import type { Restaurant, CategoryWithItems, Promotion } from "@/types/database";
import { headingFontVar, bodyFontVar } from "@/lib/fonts";
import { hexToRgba } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppButton } from "./WhatsAppButton";
import { PromoBanner } from "./PromoBanner";
import { CategoryNav } from "./CategoryNav";
import { ItemCard } from "./ItemCard";
import { Lightbox } from "./Lightbox";

type Props = {
  restaurant: Restaurant;
  categories: CategoryWithItems[];
  promotions: Promotion[];
};

export function MenuClient({ restaurant, categories, promotions }: Props) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [activeId, setActiveId] = useState<string | null>(categories[0]?.id ?? null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const primaryColor = restaurant.primary_color ?? "#C2410C";
  const secondaryColor = restaurant.secondary_color ?? "#FFFDF7";
  const headerBg = hexToRgba(secondaryColor, 0.95);

  function scrollTo(id: string) {
    setActiveId(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="min-h-screen pb-24"
      style={
        {
          backgroundColor: secondaryColor,
          fontFamily: bodyFontVar(restaurant.font_body),
          "--brand-primary": primaryColor,
        } as React.CSSProperties
      }
    >
      <header
        className="sticky top-0 z-40 flex h-[60px] items-center justify-between gap-3 border-b border-stone-200 px-4 backdrop-blur"
        style={{ backgroundColor: headerBg }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {restaurant.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={restaurant.logo_url} alt={restaurant.name} className="h-9 w-9 rounded-full object-cover" />
          )}
          <h1
            className="truncate text-lg font-bold"
            style={{ fontFamily: headingFontVar(restaurant.font_heading) }}
          >
            {restaurant.name}
          </h1>
        </div>
        <LanguageSwitcher lang={lang} onChange={setLang} accentColor={primaryColor} />
      </header>

      {restaurant.hero_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={restaurant.hero_image_url}
          alt={restaurant.name}
          className="h-[30vh] max-h-56 w-full object-cover"
        />
      )}

      <PromoBanner
        promotions={promotions}
        lang={lang}
        accentColor={primaryColor}
        headingFont={headingFontVar(restaurant.font_heading)}
      />

      <CategoryNav
        categories={categories}
        lang={lang}
        activeId={activeId}
        onSelect={scrollTo}
        accentColor={primaryColor}
        bgColor={headerBg}
      />

      <main className="mx-auto max-w-2xl px-4">
        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="py-5">
            <h2
              className="mb-2 text-xl font-bold text-stone-900"
              style={{ fontFamily: headingFontVar(restaurant.font_heading) }}
            >
              {lang === "en" && cat.name_en ? cat.name_en : cat.name_es}
            </h2>
            <div className="space-y-1">
              {cat.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  headingFont={headingFontVar(restaurant.font_heading)}
                  onOpenPhoto={(src, alt) => setLightbox({ src, alt })}
                />
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
        <p>{restaurant.name}</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          {restaurant.google_maps_url && (
            <a
              href={restaurant.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: primaryColor }}
            >
              {lang === "en" ? "Leave us a review" : "Déjanos tu reseña"}
            </a>
          )}
          {restaurant.instagram_url && (
            <a
              href={restaurant.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: primaryColor }}
            >
              Instagram
            </a>
          )}
        </div>
      </footer>

      <WhatsAppButton whatsapp={restaurant.whatsapp} lang={lang} />

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
