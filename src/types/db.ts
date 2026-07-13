export type PortfolioSection =
  | "esperienza"
  | "formazione"
  | "certificazione"
  | "percorso_personale"
  | "progetto";

export interface PortfolioItem {
  id: string;
  section: PortfolioSection;
  title_it: string;
  title_en: string;
  title_es: string;
  subtitle: string | null;
  period: string | null;
  description_it: string | null;
  description_en: string | null;
  description_es: string | null;
  image_url: string | null;
  external_url: string | null;
  sort_order: number;
  created_at: string;
}

export type PortfolioItemInput = Omit<PortfolioItem, "id" | "created_at">;

export type ShopCategory = "vino" | "abbigliamento";
export type ShopStatus = "disponibile" | "venduto";

export interface ShopListing {
  id: string;
  title: string;
  description: string | null;
  price_cents: number;
  category: ShopCategory;
  images: string[];
  status: ShopStatus;
  stripe_session_id: string | null;
  created_at: string;
}

export type ShopListingInput = Omit<
  ShopListing,
  "id" | "created_at" | "stripe_session_id"
>;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export type ContactMessageInput = Omit<ContactMessage, "id" | "created_at">;
