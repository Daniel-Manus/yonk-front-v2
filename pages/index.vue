<template>
  <Articles :articles="articles" />
</template>

<script setup>
// const config = useRuntimeConfig();
// const strapiBaseUri = config.public.strapiBaseUri;

import Articles from "../components/Articles";
import { usePageTitle } from "../composables/usePageTitle";
import { useStrapi } from "../composables/useStrapi";
// import { getMetaTags } from "../utils/seo";
// import { getStrapiMedia } from "../utils/medias";

// Using `useStrapi` composable
const { getHomepage, getArticles, getGlobalSettings } = useStrapi();

const { data: homepage } = await useAsyncData("homepage", getHomepage);
const { data: articles } = await useAsyncData("articles", getArticles);
const { data: global } = await useAsyncData("global", getGlobalSettings);

usePageTitle("", false);

// Handle SEO (optional, move to a separate utility if needed)
// const { seo } = homepage.value;
// const { defaultSeo, favicon, siteName } = global.value;

// const fullSeo = { ...defaultSeo, ...seo };

// Handle the favicon and meta tags
// const meta = getMetaTags(fullSeo);
// const faviconUrl = favicon && getStrapiMedia(favicon.url);
</script>
