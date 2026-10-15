import type { Category } from "@/types/database";

type Props = {
  categories: Category[];
  lang: "es" | "en";
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function CategoryNav({ categories, lang, activeId, onSelect }: Props) {
  return (
    <nav className="sticky top-[60px] z-30 flex gap-2 overflow-x-auto bg-[#FFFDF7]/95 px-4 py-2 backdrop-blur border-b border-stone-200">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`min-h-9 shrink-0 rounded-full px-4 text-sm font-medium transition ${
            activeId === cat.id
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          {lang === "en" && cat.name_en ? cat.name_en : cat.name_es}
        </button>
      ))}
    </nav>
  );
}
