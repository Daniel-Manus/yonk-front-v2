// composables/usePageTitle.ts
import { useHead } from "#imports";

export const usePageTitle = (title: string, appendSiteName: boolean = true) => {
  const siteName = "Yonk";

  // If appendSiteName is true, format as "Yonk | Title"
  // Otherwise just use the title directly (for homepage)
  const fullTitle =
    appendSiteName && title ? `${siteName} | ${title}` : title || siteName;

  useHead({
    title: fullTitle,
    meta: [
      {
        name: "og:title",
        content: fullTitle,
      },
    ],
  });

  return { title: fullTitle };
};
