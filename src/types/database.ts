export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  whatsapp: string | null;
  created_at: string;
  primary_color: string | null;
  secondary_color: string | null;
  font_heading: string | null;
  font_body: string | null;
  hero_image_url: string | null;
  google_maps_url: string | null;
  instagram_url: string | null;
};

export type Category = {
  id: string;
  restaurant_id: string;
  name_es: string;
  name_en: string | null;
  position: number;
};

export type Item = {
  id: string;
  category_id: string;
  name_es: string;
  name_en: string | null;
  description_es: string | null;
  description_en: string | null;
  price: number;
  photo_url: string | null;
  video_url: string | null;
  available: boolean;
  position: number;
};

export type Promotion = {
  id: string;
  restaurant_id: string;
  title_es: string;
  title_en: string | null;
  description_es: string | null;
  description_en: string | null;
  discount_pct: number | null;
  starts_at: string | null;
  ends_at: string | null;
  active: boolean;
};

export type CategoryWithItems = Category & { items: Item[] };
