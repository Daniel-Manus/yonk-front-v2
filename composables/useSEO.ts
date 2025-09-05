// composables/useSEO.ts
import { useHead } from "#imports";

// Define SEO metadata interfaces
interface SEOMetaImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface SEOMetaOptions {
  title?: string;
  description?: string;
  image?: SEOMetaImage;
  url?: string;
  siteName?: string;
  type?: string;
  twitterCard?: string;
  twitterSite?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Composable for handling SEO metadata
 * @param options SEO metadata options
 */
export const useSEO = (options: SEOMetaOptions = {}) => {
  const {
    title = "Yonk",
    description = "",
    image,
    url = "",
    siteName = "Yonk",
    type = "website",
    twitterCard = "summary_large_image",
    twitterSite = "@yonkonline",
    keywords = [],
    noIndex = false,
  } = options;

  // Generate the metadata
  const meta = [
    // Standard meta
    { name: "description", content: description },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: siteName },

    // Twitter
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:site", content: twitterSite },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  // Add canonical URL if provided
  if (url) {
    meta.push({ property: "og:url", content: url });
  }

  // Add image meta if provided
  if (image && image.url) {
    meta.push({ property: "og:image", content: image.url });
    meta.push({ name: "twitter:image", content: image.url });

    if (image.alt) {
      meta.push({ property: "og:image:alt", content: image.alt });
      meta.push({ name: "twitter:image:alt", content: image.alt });
    }

    if (image.width) {
      meta.push({ property: "og:image:width", content: String(image.width) });
    }

    if (image.height) {
      meta.push({ property: "og:image:height", content: String(image.height) });
    }
  }

  // Add keywords if provided
  if (keywords.length > 0) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }

  // Add noindex directive if specified
  if (noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  // Apply metadata to the page
  useHead({
    title,
    meta,
    link: url ? [{ rel: "canonical", href: url }] : [],
  });

  return { title, description, meta };
};
