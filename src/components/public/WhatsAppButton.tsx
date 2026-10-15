type Props = {
  whatsapp: string | null;
  lang: "es" | "en";
};

export function WhatsAppButton({ whatsapp, lang }: Props) {
  if (!whatsapp) return null;

  const digits = whatsapp.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${digits}`;
  const label = lang === "es" ? "Pedir por WhatsApp" : "Order on WhatsApp";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white shadow-lg transition hover:bg-green-700 min-h-11"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.3-.3.498-.4.198-.1.347-.1.5.149.148.248.49 1.064.59 1.287.1.223.173.248.347.051.173-.198.767-1.119.767-1.119s.148-.173.03-.396c-.117-.223-.5-1.164-.698-1.56-.198-.396-.396-.347-.544-.347h-.471c-.148 0-.396.05-.594.248-.198.198-.767.767-.767 1.807 0 1.04.767 2.04.867 2.188.1.148 1.436 2.287 3.59 3.213 2.154.925 2.154.62 2.544.58.39-.04 1.264-.519 1.44-1.02.174-.5.174-.93.123-1.02-.05-.09-.173-.14-.346-.248z" />
        <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.89.52 3.655 1.42 5.172L2 22l4.95-1.398a9.95 9.95 0 0 0 5.054 1.372c5.518 0 10.004-4.486 10.004-10.004S17.522 2 12.004 2zm0 18.062a8.03 8.03 0 0 1-4.1-1.126l-.294-.175-2.937.83.818-2.978-.19-.306a8.034 8.034 0 1 1 6.703 3.755z" />
      </svg>
      {label}
    </a>
  );
}
