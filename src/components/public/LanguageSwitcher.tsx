type Props = {
  lang: "es" | "en";
  onChange: (lang: "es" | "en") => void;
};

export function LanguageSwitcher({ lang, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-stone-300 p-0.5 text-sm">
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`min-h-9 rounded-full px-3 font-medium transition ${
            lang === option ? "bg-orange-700 text-white" : "text-stone-600 hover:bg-stone-100"
          }`}
          aria-pressed={lang === option}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
