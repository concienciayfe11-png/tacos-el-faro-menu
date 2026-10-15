"use client";

import { useState } from "react";
import type { Restaurant, CategoryWithItems, Promotion } from "@/types/database";
import { headingFontVar, bodyFontVar } from "@/lib/fonts";
import { hexToRgba } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppButton } from "./WhatsAppButton";
import { SocialFloatingButton } from "./SocialFloatingButton";
import { PromoBanner } from "./PromoBanner";
import { FeaturedSection } from "./FeaturedSection";
import { CategoryNav } from "./CategoryNav";
import { ItemCard } from "./ItemCard";
import { Reveal } from "./Reveal";
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
  const headingFont = headingFontVar(restaurant.font_heading);
  const featuredItems = categories.flatMap((cat) => cat.items).filter((item) => item.featured);

  function scrollTo(id: string) {
    setActiveId(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openPhoto(src: string, alt: string) {
    setLightbox({ src, alt });
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
          <h1 className="truncate text-lg font-bold" style={{ fontFamily: headingFont }}>
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
        headingFont={headingFont}
      />

      <FeaturedSection items={featuredItems} lang={lang} headingFont={headingFont} onOpenPhoto={openPhoto} />

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
            <h2 className="mb-2 text-xl font-bold text-stone-900" style={{ fontFamily: headingFont }}>
              {lang === "en" && cat.name_en ? cat.name_en : cat.name_es}
            </h2>
            <div className="space-y-1">
              {cat.items.map((item) => (
                <Reveal key={item.id}>
                  <ItemCard item={item} lang={lang} headingFont={headingFont} onOpenPhoto={openPhoto} />
                </Reveal>
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

      <footer className="mt-8 border-t border-stone-200 px-4 py-6 text-sm text-stone-500">
        {restaurant.address && (
          <iframe
            title="Mapa"
            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
            className="mb-4 h-48 w-full rounded-lg border-0"
            loading="lazy"
          />
        )}
        <div className="text-center">
          <p className="font-semibold text-stone-700">{restaurant.name}</p>
          {restaurant.address && <p>{restaurant.address}</p>}
          {restaurant.hours && <p>{restaurant.hours}</p>}
          {restaurant.phone && <p>{restaurant.phone}</p>}
          {restaurant.google_maps_url && (
            <a
              href={restaurant.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block underline"
              style={{ color: primaryColor }}
            >
              {lang === "en" ? "Leave us a review" : "Déjanos tu reseña"}
            </a>
          )}
        </div>
      </footer>

      <SocialFloatingButton
        instagramUrl={restaurant.instagram_url}
        facebookUrl={restaurant.facebook_url}
        tiktokUrl={restaurant.tiktok_url}
        googleMapsUrl={restaurant.google_maps_url}
        accentColor={primaryColor}
        lang={lang}
      />
      <WhatsAppButton whatsapp={restaurant.whatsapp} lang={lang} />

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
