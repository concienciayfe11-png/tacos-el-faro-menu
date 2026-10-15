"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/utils";
import { headingFonts, bodyFonts, headingFontVar, bodyFontVar } from "@/lib/fonts";

type Props = {
  restaurant: Restaurant;
  onUpdated: (next: Restaurant) => void;
};

type BrandPatch = Partial<
  Pick<
    Restaurant,
    | "logo_url"
    | "hero_image_url"
    | "primary_color"
    | "secondary_color"
    | "font_heading"
    | "font_body"
    | "google_maps_url"
    | "instagram_url"
  >
>;

export function BrandSection({ restaurant, onUpdated }: Props) {
  const [draft, setDraft] = useState(restaurant);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  async function save(patch: BrandPatch) {
    const next = { ...draft, ...patch };
    setDraft(next);
    const { error } = await supabase.from("restaurants").update(patch).eq("id", restaurant.id);
    if (!error) {
      onUpdated(next);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  }

  async function uploadImage(file: File, kind: "logo" | "hero") {
    const setUploading = kind === "logo" ? setUploadingLogo : setUploadingHero;
    setUploading(true);
    try {
      const compressed = await compressImage(file, kind === "hero" ? 1600 : 600);
      const path = `${restaurant.slug}/brand-${kind}-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("menu-media")
        .upload(path, compressed, { contentType: "image/jpeg", upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("menu-media").getPublicUrl(path);
      await save(kind === "logo" ? { logo_url: data.publicUrl } : { hero_image_url: data.publicUrl });
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="rounded-xl border border-stone-200 p-4">
      <h2 className="mb-3 font-serif text-lg font-bold">Marca de mi restaurante</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Columna de controles */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <p className="mb-1 text-sm font-medium text-stone-700">Logo</p>
              <div className="flex items-center gap-2">
                {draft.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={draft.logo_url} alt="" className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-stone-100" />
                )}
                <label className="cursor-pointer text-sm text-stone-500 underline">
                  {uploadingLogo ? "Subiendo…" : "Subir logo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingLogo}
                    onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "logo")}
                  />
                </label>
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-1 text-sm font-medium text-stone-700">Foto hero</p>
              <div className="flex items-center gap-2">
                {draft.hero_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={draft.hero_image_url} alt="" className="h-14 w-20 rounded-md object-cover" />
                ) : (
                  <div className="h-14 w-20 rounded-md bg-stone-100" />
                )}
                <label className="cursor-pointer text-sm text-stone-500 underline">
                  {uploadingHero ? "Subiendo…" : "Subir foto"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingHero}
                    onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "hero")}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-stone-700">Color primario</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.primary_color ?? "#C2410C"}
                  onChange={(e) => save({ primary_color: e.target.value })}
                  className="h-11 w-11 cursor-pointer rounded border border-stone-300"
                />
                <span className="text-sm text-stone-500">{draft.primary_color ?? "#C2410C"}</span>
              </div>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-stone-700">Color secundario (fondo)</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.secondary_color ?? "#FFFDF7"}
                  onChange={(e) => save({ secondary_color: e.target.value })}
                  className="h-11 w-11 cursor-pointer rounded border border-stone-300"
                />
                <span className="text-sm text-stone-500">{draft.secondary_color ?? "#FFFDF7"}</span>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-stone-700">Tipografía de títulos</span>
              <select
                value={draft.font_heading ?? headingFonts[0].value}
                onChange={(e) => save({ font_heading: e.target.value })}
                className="min-h-11 w-full rounded-md border border-stone-300 px-2 text-sm"
              >
                {headingFonts.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-stone-700">Tipografía de texto</span>
              <select
                value={draft.font_body ?? bodyFonts[0].value}
                onChange={(e) => save({ font_body: e.target.value })}
                className="min-h-11 w-full rounded-md border border-stone-300 px-2 text-sm"
              >
                {bodyFonts.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">URL de Google Maps (reseñas)</span>
            <input
              defaultValue={draft.google_maps_url ?? ""}
              onBlur={(e) => save({ google_maps_url: e.target.value || null })}
              placeholder="https://maps.app.goo.gl/..."
              className="min-h-11 w-full rounded-md border border-stone-300 px-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">URL de Instagram</span>
            <input
              defaultValue={draft.instagram_url ?? ""}
              onBlur={(e) => save({ instagram_url: e.target.value || null })}
              placeholder="https://instagram.com/..."
              className="min-h-11 w-full rounded-md border border-stone-300 px-2 text-sm"
            />
          </label>

          {saved && <p className="text-sm text-green-600">Marca actualizada ✓</p>}
        </div>

        {/* Vista previa en vivo */}
        <div>
          <p className="mb-1 text-sm font-medium text-stone-700">Vista previa</p>
          <div
            className="overflow-hidden rounded-xl border border-stone-200"
            style={{ backgroundColor: draft.secondary_color ?? "#FFFDF7" }}
          >
            {draft.hero_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.hero_image_url} alt="" className="h-24 w-full object-cover" />
            )}
            <div className="flex items-center gap-2 p-3">
              {draft.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={draft.logo_url} alt="" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-stone-200" />
              )}
              <span
                className="text-lg font-bold text-stone-900"
                style={{ fontFamily: headingFontVar(draft.font_heading) }}
              >
                {restaurant.name}
              </span>
            </div>
            <div className="px-3">
              <span
                className="inline-block rounded-md px-3 py-1 text-sm font-semibold text-white"
                style={{ backgroundColor: draft.primary_color ?? "#C2410C" }}
              >
                20% de descuento
              </span>
            </div>
            <div className="space-y-1 p-3">
              <p
                className="font-semibold text-stone-900"
                style={{ fontFamily: headingFontVar(draft.font_heading) }}
              >
                Taco de Asada
              </p>
              <p className="text-sm text-stone-600" style={{ fontFamily: bodyFontVar(draft.font_body) }}>
                Carne de res a la parrilla, cebolla y cilantro — $4.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
