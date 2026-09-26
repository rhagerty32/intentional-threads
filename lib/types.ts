export type Category = "apparel" | "jewelry";

export type Swatch = {
  name: string;
  hex: string;
  image: string;
  imageAlt: string;
};

export type CatalogImage = {
  file: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: Category;
  collection: string;
  price: number;
  featured: boolean;
  note?: string;
  description: string;
  details: string[];
  optionLabel: "Color" | "Metal";
  options: Swatch[];
  sizes: string[];
  images: CatalogImage[];
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  banner: string;
  bannerAlt: string;
};

export type CardProduct = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  collection: string;
  image: string;
  imageAlt: string;
  note?: string;
};

export type CatalogFile = {
  collections: Array<{
    slug: string;
    name: string;
    tagline: string;
    description: string;
    banner: string;
    bannerAlt: string;
  }>;
  products: Array<{
    slug: string;
    name: string;
    category: Category;
    collection: string;
    price: number;
    featured?: boolean;
    note?: string;
    description: string;
    details: string[];
    colors?: Array<{ name: string; hex: string; image?: string }>;
    variants?: Array<{ name: string; hex: string; image?: string }>;
    sizes?: string[];
    images: CatalogImage[];
  }>;
};
