import rawCatalog from "@/data/catalog.json";
import type { CardProduct, CatalogFile, Collection, Product } from "@/lib/types";

const catalog = rawCatalog as CatalogFile;

export const collections: Collection[] = catalog.collections;

function optionAlt(defaultAlt: string, defaultName: string, optionName: string) {
  if (optionName === defaultName) return defaultAlt;
  const from = `in ${defaultName.toLowerCase()}`;
  const to = `in ${optionName.toLowerCase()}`;
  const index = defaultAlt.indexOf(from);
  if (index === -1) return defaultAlt;
  return defaultAlt.slice(0, index) + to + defaultAlt.slice(index + from.length);
}

export const products: Product[] = catalog.products.map((product) => {
  const rawOptions = product.colors ?? product.variants ?? [];
  const fallbackImage = product.images[0]?.file ?? "";
  const fallbackAlt = product.images[0]?.alt ?? product.name;
  const defaultName = rawOptions[0]?.name ?? "";
  const options = rawOptions.map((option) => ({
    name: option.name,
    hex: option.hex,
    image: option.image ?? fallbackImage,
    imageAlt: optionAlt(fallbackAlt, defaultName, option.name),
  }));
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    collection: product.collection,
    price: product.price,
    featured: Boolean(product.featured),
    note: product.note,
    description: product.description,
    details: product.details,
    optionLabel: product.category === "jewelry" ? "Metal" : "Color",
    options,
    sizes: product.sizes ?? [],
    images: product.images,
  };
});

export function getCollections() {
  return collections;
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProducts() {
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((product) => product.collection === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const product = getProduct(slug);
  if (!product) return [];
  return products
    .filter((item) => item.slug !== slug && item.collection === product.collection)
    .slice(0, limit);
}

export function toCard(product: Product): CardProduct {
  return {
    slug: product.slug,
    name: product.name,
    price: product.price,
    category: product.category,
    collection: product.collection,
    image: product.images[0].file,
    imageAlt: product.images[0].alt,
    note: product.note,
  };
}

export function collectionAccent(slug: string) {
  if (slug === "north-star") return "bg-gold";
  if (slug === "first-light") return "bg-sage";
  return "bg-ink";
}
