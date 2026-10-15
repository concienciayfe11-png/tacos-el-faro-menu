"use client";

import { useState } from "react";
import QRCode from "qrcode";

type Props = {
  url: string;
  filename: string;
};

export function QrButton({ url, filename }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 1024,
        margin: 2,
        color: { dark: "#1c1917", light: "#ffffff" },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${filename}-qr.png`;
      a.click();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="min-h-11 rounded-md border border-stone-300 px-4 font-medium hover:bg-stone-100 disabled:opacity-50"
    >
      {loading ? "Generando…" : "Descargar QR"}
    </button>
  );
}
