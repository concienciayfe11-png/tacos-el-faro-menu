type Props = {
  lang: "es" | "en";
  onChange: (lang: "es" | "en") => void;
  accentColor?: string;
};

export function LanguageSwitcher({ lang, onChange, accentColor }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-stone-300 p-0.5 text-sm">
      {(["es", "en"] as const).map((option) => {
        const isActive = lang === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`min-h-9 rounded-full px-3 font-medium transition ${
              isActive ? "text-white" : "text-stone-600 hover:bg-stone-100"
            }`}
            style={isActive ? { backgroundColor: accentColor ?? "#C2410C" } : undefined}
            aria-pressed={isActive}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
