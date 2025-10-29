// types/menu.ts
export interface MenuOption {
  id: number;
  article_id: number;
  name: string;
  price: number | null;
  position: number | null;
  created_at: string;
  updated_at: string;
}

export interface MenuArticle {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  image_path: string | null;
  price: number | null;
  allergens: string[];
  options: MenuOption[];
  number: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  articles: MenuArticle[];
}

export interface MenuApiResponse {
  categories: MenuCategory[];
  updated_at: string;
}