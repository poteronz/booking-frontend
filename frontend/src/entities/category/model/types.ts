export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  description?: string;
  _count?: {
    listings: number;
  };
}

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  slug?: string;
}
