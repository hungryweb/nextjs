export const ENABLE_CHECKOUT: string = process.env.NEXT_PUBLIC_ENABLE_CHECKOUT ?? "0";

export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "";
if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
  throw new Error("No NEXT_PUBLIC_WEBSITE_URL defined")
}


export const DATA_URL = process.env.NEXT_PUBLIC_DATA_URL ?? "";
if (!process.env.NEXT_PUBLIC_DATA_URL) {
  throw new Error("No NEXT_PUBLIC_DATA_URL defined")
}

export const SITEMAP_PRODUCTS_PER_PAGE = process.env.NEXT_PUBLIC_SITEMAP_PRODUCTS_PER_PAGE ?? 1000;


export const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "";
if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("No NEXT_PUBLIC_GRAPHQL_URL defined")
}


export const PRODUCTS_PER_PAGE = process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE ?? 10;
export const BLOG_ENTRIES_PER_PAGE = process.env.NEXT_PUBLIC_BLOGS_PER_PAGE ?? 12;