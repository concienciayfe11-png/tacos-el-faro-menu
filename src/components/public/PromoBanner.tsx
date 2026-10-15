import type { Promotion } from "@/types/database";
import { isPromotionActive } from "@/lib/utils";

type Props = {
  promotions: Promotion[];
  lang: "es" | "en";
};

export function PromoBanner({ promotions, lang }: Props) {
  const active = promotions.filter(isPromotionActive);
  if (active.length === 0) return null;

  return (
    <section className="mx-4 mt-3 space-y-2">
      {active.map((promo) => (
        <div
          key={promo.id}
          className="rounded-xl bg-orange-700 px-4 py-3 text-white shadow-sm"
        >
          <p className="font-serif text-lg font-semibold">
            {lang === "en" && promo.title_en ? promo.title_en : promo.title_es}
            {promo.discount_pct ? ` — ${promo.discount_pct}% ${lang === "en" ? "off" : "de descuento"}` : ""}
          </p>
          {promo.description_es && (
            <p className="text-sm text-orange-50">{promo.description_es}</p>
          )}
        </div>
      ))}
    </section>
  );
}
