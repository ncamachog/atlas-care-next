import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/inspiration-and-science", "/ambassadors"].map((p) => ({ url: `${SITE_URL}${p}` }));
  const products = PRODUCTS.map((p) => ({ url: `${SITE_URL}/product/${p.slug}` }));
  return [...pages, ...products];
}
