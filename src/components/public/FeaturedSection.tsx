"use client";

import { useState } from "react";
import type { Item } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { Reveal } from "./Reveal";

type Props = {
  items: Item[];
  lang: "es" | "en";
  headingFont?: string;
  onOpenPhoto: (src: string, alt: string) => void;
};

function FeaturedCard({ item, lang, headingFont, onOpenPhoto }: Omit<Props, "items"> & { item: Item }) {
  const [imageFailed, setImageFailed] = useState(false);
  const name = lang === "en" && item.name_en ? item.name_en : item.name_es;
  const showPhoto = !!item.photo_url && !imageFailed;

  return (
    <div className="w-44 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-white/40">
      {showPhoto ? (
        <button
          type="button"
          onClick={() => onOpenPhoto(item.photo_url!, name)}
          aria-label={`Ampliar foto de ${name}`}
          className="block h-32 w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.photo_url!}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-32 w-full object-cover"
          />
        </button>
      ) : (
        <div className="h-32 w-full bg-stone-100" />
      )}
      <div className="p-2">
        <p className="truncate font-semibold" style={headingFont ? { fontFamily: headingFont } : undefined}>
          {name}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <StarRating rating={item.rating} />
          <span className="text-sm font-semibold text-stone-800">{formatPrice(item.price)}</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedSection({ items, lang, headingFont, onOpenPhoto }: Props) {
  if (items.length === 0) return null;

  return (
    <Reveal className="mx-4 mt-3">
      <h2 className="mb-2 text-lg font-bold text-stone-900" style={headingFont ? { fontFamily: headingFont } : undefined}>
        {lang === "en" ? "Favorites" : "Los favoritos"}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <FeaturedCard key={item.id} item={item} lang={lang} headingFont={headingFont} onOpenPhoto={onOpenPhoto} />
        ))}
      </div>
    </Reveal>
  );
}
