"use client";

import { useState } from "react";
import type { Item } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { compressImage, formatPrice } from "@/lib/utils";

type Props = {
  item: Item;
  restaurantSlug: string;
  onChanged: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function ItemRow({ item, restaurantSlug, onChanged, isFirst, isLast }: Props) {
  const [draft, setDraft] = useState(item);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  async function save(patch: Partial<Item>) {
    const next = { ...draft, ...patch };
    setDraft(next);
    const { error } = await supabase
      .from("items")
      .update({
        name_es: next.name_es,
        name_en: next.name_en,
        description_es: next.description_es,
        description_en: next.description_en,
        price: next.price,
        available: next.available,
        position: next.position,
        photo_url: next.photo_url,
        video_url: next.video_url,
      })
      .eq("id", item.id);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      onChanged();
    }
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const path = `${restaurantSlug}/${item.id}-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("menu-media")
        .upload(path, compressed, { contentType: "image/jpeg", upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("menu-media").getPublicUrl(path);
      await save({ photo_url: data.publicUrl });
    } finally {
      setUploading(false);
    }
  }

  async function remove() {
    if (!confirm(`¿Borrar "${item.name_es}"?`)) return;
    await supabase.from("items").delete().eq("id", item.id);
    onChanged();
  }

  async function move(direction: -1 | 1) {
    await save({ position: draft.position + direction });
  }

  return (
    <div className="rounded-lg border border-stone-200 p-3">
      <div className="flex gap-3">
        <div className="shrink-0">
          {draft.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.photo_url} alt="" className="h-16 w-16 rounded object-cover" />
          ) : (
            <div className="h-16 w-16 rounded bg-stone-100" />
          )}
          <label className="mt-1 block cursor-pointer text-center text-xs text-stone-500 underline">
            {uploading ? "Subiendo…" : "Subir foto"}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} disabled={uploading} />
          </label>
        </div>

        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              value={draft.name_es}
              onChange={(e) => setDraft({ ...draft, name_es: e.target.value })}
              onBlur={() => save({ name_es: draft.name_es })}
              placeholder="Nombre (ES)"
              className="min-h-11 rounded-md border border-stone-300 px-2 text-sm"
            />
            <input
              value={draft.name_en ?? ""}
              onChange={(e) => setDraft({ ...draft, name_en: e.target.value })}
              onBlur={() => save({ name_en: draft.name_en })}
              placeholder="Nombre (EN)"
              className="min-h-11 rounded-md border border-stone-300 px-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <textarea
              value={draft.description_es ?? ""}
              onChange={(e) => setDraft({ ...draft, description_es: e.target.value })}
              onBlur={() => save({ description_es: draft.description_es })}
              placeholder="Descripción (ES)"
              className="min-h-11 rounded-md border border-stone-300 px-2 py-1 text-sm"
            />
            <textarea
              value={draft.description_en ?? ""}
              onChange={(e) => setDraft({ ...draft, description_en: e.target.value })}
              onBlur={() => save({ description_en: draft.description_en })}
              placeholder="Description (EN)"
              className="min-h-11 rounded-md border border-stone-300 px-2 py-1 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1 text-sm">
              Precio
              <input
                type="number"
                step="0.01"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                onBlur={() => save({ price: draft.price })}
                className="min-h-11 w-24 rounded-md border border-stone-300 px-2"
              />
            </label>
            <span className="text-sm text-stone-400">{formatPrice(draft.price)}</span>

            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={!draft.available}
                onChange={(e) => save({ available: !e.target.checked })}
              />
              Agotado
            </label>

            <div className="ml-auto flex items-center gap-1">
              <button onClick={() => move(-1)} disabled={isFirst} className="min-h-9 rounded border px-2 disabled:opacity-30">
                ↑
              </button>
              <button onClick={() => move(1)} disabled={isLast} className="min-h-9 rounded border px-2 disabled:opacity-30">
                ↓
              </button>
              <button onClick={remove} className="min-h-9 rounded border border-red-300 px-2 text-red-600">
                Borrar
              </button>
            </div>
          </div>
          {saved && <p className="text-xs text-green-600">Guardado ✓</p>}
        </div>
      </div>
    </div>
  );
}
