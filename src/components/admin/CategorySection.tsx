"use client";

import { useState } from "react";
import type { CategoryWithItems } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { ItemRow } from "./ItemRow";

type Props = {
  category: CategoryWithItems;
  restaurantSlug: string;
  onChanged: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function CategorySection({ category, restaurantSlug, onChanged, isFirst, isLast }: Props) {
  const [nameEs, setNameEs] = useState(category.name_es);
  const [nameEn, setNameEn] = useState(category.name_en ?? "");
  const supabase = createClient();

  async function renameEs() {
    if (nameEs === category.name_es) return;
    await supabase.from("categories").update({ name_es: nameEs }).eq("id", category.id);
    onChanged();
  }

  async function renameEn() {
    if (nameEn === (category.name_en ?? "")) return;
    await supabase.from("categories").update({ name_en: nameEn }).eq("id", category.id);
    onChanged();
  }

  async function move(direction: -1 | 1) {
    await supabase
      .from("categories")
      .update({ position: category.position + direction })
      .eq("id", category.id);
    onChanged();
  }

  async function remove() {
    if (!confirm(`¿Borrar la categoría "${category.name_es}" y todos sus platos?`)) return;
    await supabase.from("categories").delete().eq("id", category.id);
    onChanged();
  }

  async function addItem() {
    await supabase.from("items").insert({
      category_id: category.id,
      name_es: "Nuevo plato",
      price: 0,
      position: category.items.length,
    });
    onChanged();
  }

  return (
    <section className="rounded-xl border border-stone-200 p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          value={nameEs}
          onChange={(e) => setNameEs(e.target.value)}
          onBlur={renameEs}
          className="min-h-11 flex-1 rounded-md border border-stone-300 px-2 font-serif text-lg font-semibold"
        />
        <input
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          onBlur={renameEn}
          placeholder="Nombre en inglés"
          className="min-h-11 flex-1 rounded-md border border-stone-300 px-2 text-sm"
        />
        <button onClick={() => move(-1)} disabled={isFirst} className="min-h-9 rounded border px-2 disabled:opacity-30">
          ↑
        </button>
        <button onClick={() => move(1)} disabled={isLast} className="min-h-9 rounded border px-2 disabled:opacity-30">
          ↓
        </button>
        <button onClick={remove} className="min-h-9 rounded border border-red-300 px-2 text-red-600">
          Borrar categoría
        </button>
      </div>

      <div className="space-y-2">
        {category.items.map((item, i) => (
          <ItemRow
            key={item.id}
            item={item}
            restaurantSlug={restaurantSlug}
            onChanged={onChanged}
            isFirst={i === 0}
            isLast={i === category.items.length - 1}
          />
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-3 min-h-11 rounded-md border border-dashed border-stone-400 px-4 text-sm font-medium text-stone-600 hover:bg-stone-50"
      >
        + Agregar plato
      </button>
    </section>
  );
}
