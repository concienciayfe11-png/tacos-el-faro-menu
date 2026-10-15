"use client";

import { useState } from "react";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M9.4 5.3A10.6 10.6 0 0 1 12 5c7 0 11 7 11 7a13.6 13.6 0 0 1-3.4 4.1M6.6 6.6C3.8 8.3 2 11.1 2 12s4 7 11 7a10.4 10.4 0 0 0 3.4-.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  id?: string;
};

export function PasswordInput({ value, onChange, placeholder, required, minLength, className, id }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className ?? "min-h-11 rounded-md border border-stone-300 py-2 pl-2 pr-10 text-sm"}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute inset-y-0 right-1 flex min-w-9 items-center justify-center text-stone-500 hover:text-stone-800"
      >
        <EyeIcon open={visible} />
      </button>
    </div>
  );
}
