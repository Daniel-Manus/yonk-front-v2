// composables/useStrapi.ts
export const useStrapi = () => {
  const config = useRuntimeConfig();

  // Get the appropriate Strapi base URI based on the toggle
  const getStrapiBaseUri = () => {
    return config.public.useLocalStrapi 
      ? config.public.strapiBaseUri 
      : config.public.strapiRemoteUri;
  };

  // Utility to fetch Strapi content
  const fetchData = async (contentType: string, params: string = '') => {
    try {
      const baseUri = getStrapiBaseUri();
      const response = await $fetch(
        `${baseUri}/api/${contentType}${params ? `?${params}` : ''}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching from Strapi (${getStrapiBaseUri()}):`, error);
      return null;
    }
  };

  // Utility to get the full media URL from Strapi
  const strapiMediaUrl = (url) => {
    if (url.startsWith("/")) {
      return `${getStrapiBaseUri()}${url}`;
    }
    return url;
  };

  // Fetch homepage, articles, and global settings
  const getHomepage = async () => {
    const response = await fetchData("homepage");
    return response?.data || null;
  };

  const getArticles = async () => {
    const response = await fetchData("articles", "populate=*");
    return response?.data || [];
  };

  const getGlobalSettings = async () => {
    const response = await fetchData("global");
    return response?.data || null;
  };

  const getInfo = async () => {
    const response = await fetchData("info", "populate=*");
    return response?.data || null;
  };

  // Fetch a single article by slug
  const fetchArticle = async (slug: string) => {
    const response = await fetchData("articles", `filters[slug][$eq]=${slug}&populate=*`);
    return response?.data?.[0] || null;
  };

  return { getHomepage, getArticles, getGlobalSettings, getInfo, fetchArticle, strapiMediaUrl };
};
