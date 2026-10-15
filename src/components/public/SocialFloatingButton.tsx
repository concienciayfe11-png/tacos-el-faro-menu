"use client";

import { useState } from "react";

type Props = {
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  googleMapsUrl: string | null;
  accentColor: string;
  lang: "es" | "en";
};

function IconLink({
  href,
  label,
  accentColor,
  children,
}: {
  href: string;
  label: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition hover:opacity-90"
      style={{ backgroundColor: accentColor }}
    >
      {children}
    </a>
  );
}

export function SocialFloatingButton({ instagramUrl, facebookUrl, tiktokUrl, googleMapsUrl, accentColor, lang }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    instagramUrl && {
      href: instagramUrl,
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    facebookUrl && {
      href: facebookUrl,
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.4c0-.9.3-1.5 1.6-1.5h1.7V4.2C16.5 4.1 15.4 4 14.2 4c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4v3h2.6V21h3.5Z" />
        </svg>
      ),
    },
    tiktokUrl && {
      href: tiktokUrl,
      label: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M16.6 3c.3 1.9 1.5 3.5 3.4 3.9v2.6c-1.3 0-2.5-.4-3.4-1.1v6.3a5.3 5.3 0 1 1-5.3-5.3c.3 0 .5 0 .8.1v2.7a2.7 2.7 0 1 0 1.9 2.6V3h2.6Z" />
        </svg>
      ),
    },
    googleMapsUrl && {
      href: googleMapsUrl,
      label: "Google Reviews",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
      ),
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  if (links.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col-reverse items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={lang === "en" ? "Follow us" : "Síguenos"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition"
        style={{ backgroundColor: accentColor }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-6 w-6 transition-transform ${open ? "rotate-45" : ""}`}
        >
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
      {open &&
        links.map((link) => (
          <IconLink key={link.label} href={link.href} label={link.label} accentColor={accentColor}>
            {link.icon}
          </IconLink>
        ))}
    </div>
  );
}
