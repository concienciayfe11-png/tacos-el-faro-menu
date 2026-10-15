export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function isPromotionActive(promo: {
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
}) {
  if (!promo.active) return false;
  const now = Date.now();
  if (promo.starts_at && now < new Date(promo.starts_at).getTime()) return false;
  if (promo.ends_at && now > new Date(promo.ends_at).getTime()) return false;
  return true;
}

/** Comprime una imagen en el navegador antes de subirla: máx 1200px de ancho, calidad 80. */
export function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No se pudo procesar la imagen"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo comprimir la imagen"))),
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
