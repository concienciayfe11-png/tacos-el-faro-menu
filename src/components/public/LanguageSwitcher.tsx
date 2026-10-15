"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  lang: "es" | "en";
  onChange: (lang: "es" | "en") => void;
  accentColor?: string;
};

const OPTIONS = [
  { value: "es", flag: "🇪🇸", label: "Español" },
  { value: "en", flag: "🇺🇸", label: "English" },
] as const;

export function LanguageSwitcher({ lang, onChange, accentColor }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === lang) ?? OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-9 items-center gap-1.5 rounded-full border border-stone-300 px-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.value.toUpperCase()}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-3.5 w-3.5 text-stone-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg"
        >
          {OPTIONS.map((option) => {
            const isActive = option.value === lang;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-stone-700 hover:bg-stone-50"
                  style={isActive ? { backgroundColor: `${accentColor ?? "#C2410C"}1A` } : undefined}
                >
                  <span className="text-lg leading-none">{option.flag}</span>
                  <span>{option.label}</span>
                  {isActive && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={accentColor ?? "#C2410C"}
                      strokeWidth="2.5"
                      className="ml-auto h-4 w-4"
                    >
                      <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
