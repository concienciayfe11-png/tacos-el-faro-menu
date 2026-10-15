"use client";

import type { Promotion } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

type Props = {
  restaurantId: string;
  promotions: Promotion[];
  onChanged: () => void;
};

function toInputDate(value: string | null) {
  if (!value) return "";
  return value.slice(0, 16);
}

export function PromotionSection({ restaurantId, promotions, onChanged }: Props) {
  const supabase = createClient();

  async function addPromo() {
    await supabase.from("promotions").insert({
      restaurant_id: restaurantId,
      title_es: "Nueva promoción",
      active: true,
    });
    onChanged();
  }

  async function update(id: string, patch: Partial<Promotion>) {
    await supabase.from("promotions").update(patch).eq("id", id);
    onChanged();
  }

  async function remove(id: string) {
    if (!confirm("¿Borrar esta promoción?")) return;
    await supabase.from("promotions").delete().eq("id", id);
    onChanged();
  }

  return (
    <section className="rounded-xl border border-stone-200 p-4">
      <h2 className="mb-3 font-serif text-lg font-bold">Promociones</h2>
      <div className="space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="rounded-lg border border-stone-200 p-3">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                defaultValue={promo.title_es}
                onBlur={(e) => update(promo.id, { title_es: e.target.value })}
                placeholder="Título (ES)"
                className="min-h-11 rounded-md border border-stone-300 px-2 text-sm"
              />
              <input
                defaultValue={promo.title_en ?? ""}
                onBlur={(e) => update(promo.id, { title_en: e.target.value })}
                placeholder="Título (EN)"
                className="min-h-11 rounded-md border border-stone-300 px-2 text-sm"
              />
            </div>
            <textarea
              defaultValue={promo.description_es ?? ""}
              onBlur={(e) => update(promo.id, { description_es: e.target.value })}
              placeholder="Descripción"
              className="mt-2 min-h-11 w-full rounded-md border border-stone-300 px-2 py-1 text-sm"
            />
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-1">
                % descuento
                <input
                  type="number"
                  defaultValue={promo.discount_pct ?? 0}
                  onBlur={(e) => update(promo.id, { discount_pct: Number(e.target.value) })}
                  className="min-h-11 w-20 rounded-md border border-stone-300 px-2"
                />
              </label>
              <label className="flex items-center gap-1">
                Desde
                <input
                  type="datetime-local"
                  defaultValue={toInputDate(promo.starts_at)}
                  onBlur={(e) =>
                    update(promo.id, { starts_at: e.target.value ? new Date(e.target.value).toISOString() : null })
                  }
                  className="min-h-11 rounded-md border border-stone-300 px-2"
                />
              </label>
              <label className="flex items-center gap-1">
                Hasta
                <input
                  type="datetime-local"
                  defaultValue={toInputDate(promo.ends_at)}
                  onBlur={(e) =>
                    update(promo.id, { ends_at: e.target.value ? new Date(e.target.value).toISOString() : null })
                  }
                  className="min-h-11 rounded-md border border-stone-300 px-2"
                />
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={promo.active}
                  onChange={(e) => update(promo.id, { active: e.target.checked })}
                />
                Activa
              </label>
              <button
                onClick={() => remove(promo.id)}
                className="ml-auto min-h-9 rounded border border-red-300 px-2 text-red-600"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addPromo}
        className="mt-3 min-h-11 rounded-md border border-dashed border-stone-400 px-4 text-sm font-medium text-stone-600 hover:bg-stone-50"
      >
        + Agregar promoción
      </button>
    </section>
  );
}
