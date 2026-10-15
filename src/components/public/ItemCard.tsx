"use client";

import { useState } from "react";
import type { Item } from "@/types/database";
import { formatPrice } from "@/lib/utils";

type Props = {
  item: Item;
  lang: "es" | "en";
  headingFont?: string;
  onOpenPhoto: (src: string, alt: string) => void;
};

export function ItemCard({ item, lang, headingFont, onOpenPhoto }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const name = lang === "en" && item.name_en ? item.name_en : item.name_es;
  const description = lang === "en" && item.description_en ? item.description_en : item.description_es;
  const showPhoto = !!item.photo_url && !imageFailed;

  return (
    <div className={`flex gap-3 rounded-lg p-2 ${!item.available ? "opacity-50" : ""}`}>
      {showPhoto && (
        <button
          type="button"
          onClick={() => onOpenPhoto(item.photo_url!, name)}
          aria-label={`Ampliar foto de ${name}`}
          className="h-20 w-20 shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.photo_url!}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-20 w-20 rounded-lg object-cover"
          />
        </button>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base font-semibold leading-tight"
            style={headingFont ? { fontFamily: headingFont } : undefined}
          >
            {name}
          </h3>
          <span className="shrink-0 text-base font-semibold text-stone-800">
            {formatPrice(item.price)}
          </span>
        </div>
        {description && <p className="mt-0.5 text-sm text-stone-600 line-clamp-2">{description}</p>}
        {!item.available && (
          <span className="mt-1 inline-block rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            {lang === "en" ? "Sold out" : "Agotado"}
          </span>
        )}
      </div>
    </div>
  );
}
