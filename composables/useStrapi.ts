// composables/useStrapi.ts
export const useStrapi = () => {
  const config = useRuntimeConfig();

  // Utility to fetch Strapi content
  const fetchData = async (contentType: string, params: string = '') => {
    try {
      const response = await $fetch(
        `${config.public.strapiBaseUri}/${contentType}${params ? `?${params}` : ''}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching from Strapi:", error);
      return null;
    }
  };

  // Utility to get the full media URL from Strapi
  const strapiMediaUrl = (url) => {
    if (url.startsWith("/")) {
      return `${process.env.strapiBaseUri}${url}`;
    }
    return url;
  };

  // Fetch homepage, articles, and global settings
  const getHomepage = async () => {
    return await fetchData("homepage");
  };

  const getArticles = async () => {
    return await fetchData("articles");
  };

  const getGlobalSettings = async () => {
    return await fetchData("global");
  };

  // Fetch a single article by slug
  const fetchArticle = async (slug: string) => {
    const article = await fetchData("articles", `slug=${slug}`);
    return article ? article[0] : null;  // Return the first article or null if not found
  };

  return { getHomepage, getArticles, getGlobalSettings, fetchArticle, strapiMediaUrl };
};
