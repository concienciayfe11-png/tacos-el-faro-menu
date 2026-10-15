import type { Promotion } from "@/types/database";
import { isPromotionActive } from "@/lib/utils";

type Props = {
  promotions: Promotion[];
  lang: "es" | "en";
  accentColor: string;
  headingFont?: string;
};

export function PromoBanner({ promotions, lang, accentColor, headingFont }: Props) {
  const active = promotions.filter(isPromotionActive);
  if (active.length === 0) return null;

  return (
    <section className="mx-4 mt-3 space-y-2">
      {active.map((promo) => (
        <div
          key={promo.id}
          className="rounded-xl px-4 py-3 text-white shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          <p className="text-lg font-semibold" style={headingFont ? { fontFamily: headingFont } : undefined}>
            {lang === "en" && promo.title_en ? promo.title_en : promo.title_es}
            {promo.discount_pct ? ` — ${promo.discount_pct}% ${lang === "en" ? "off" : "de descuento"}` : ""}
          </p>
          {(lang === "en" && promo.description_en ? promo.description_en : promo.description_es) && (
            <p className="text-sm text-white/90">
              {lang === "en" && promo.description_en ? promo.description_en : promo.description_es}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
