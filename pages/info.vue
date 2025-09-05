<template>
  <div class="info">
    <div class="media">
      <!-- INFO IMAGE/VIDEO 1 -->
      <img
        v-if="
          (info.infoMedia1 && info.infoMedia1.ext === '.jpg') ||
          (info.infoMedia1 && info.infoMedia1.ext === '.png')
        "
        :src="strapiMediaUrl(info.infoMedia1.url)"
        class="top"
        alt=""
      />

      <video
        v-if="info.infoMedia1 && info.infoMedia1.ext === '.mp4'"
        class="top"
        muted
        autoplay
        loop
      >
        <source
          :src="strapiMediaUrl(info.infoMedia1.url)"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <!-- INFO IMAGE/VIDEO 2 -->
      <img
        v-if="
          (info.infoMedia2 && info.infoMedia2.ext === '.jpg') ||
          (info.infoMedia2 && info.infoMedia2.ext === '.png')
        "
        :src="strapiMediaUrl(info.infoMedia2.url)"
        class="bottom"
        alt=""
      />

      <video
        v-if="info.infoMedia2 && info.infoMedia2.ext === '.mp4'"
        class="bottom"
        muted
        autoplay
        loop
      >
        <source
          :src="strapiMediaUrl(info.infoMedia2.url)"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="content">
      <div
        v-if="info.infoDescription"
        v-html="md(info.infoDescription)"
      />
      <div
        v-if="info.infoDescription2"
        v-html="md(info.infoDescription2)"
      />
    </div>

    <!-- INFO IMAGE/VIDEO 2 (MOBILE ONLY) -->
    <img
      v-if="
        (info.infoMedia2 && info.infoMedia2.ext === '.jpg') ||
        (info.infoMedia2 && info.infoMedia2.ext === '.png')
      "
      :src="strapiMediaUrl(info.infoMedia2.url)"
      class="mobile"
      alt=""
    />

    <video
      v-if="info.infoMedia2 && info.infoMedia2.ext === '.mp4'"
      class="mobile"
      muted
      autoplay
      preload="true"
      autobuffer="true"
    >
      <source :src="strapiMediaUrl(info.infoMedia2.url)" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- <div class="heading__media mobile">
          <Video 
            v-if="global.infoMedia2 && global.infoMedia2.ext === '.mp4'"
            :block="{
              id: 'info-vid',
              video: global.infoMedia2
          }" />
        </div> -->
  </div>
</template>

<script setup>
// const config = useRuntimeConfig();
// const strapiBaseUri = config.public.strapiBaseUri;

import { computed } from "vue";
import { useMarkdown } from "../composables/useMarkdown";
import { usePageTitle } from "../composables/usePageTitle";
import { useSEO } from "../composables/useSEO";
import { useStrapi } from "../composables/useStrapi";

// import { getMetaTags } from "../utils/seo";

const { getHomepage, getArticles, getGlobalSettings, getInfo, strapiMediaUrl } =
  useStrapi();
const { md } = useMarkdown();

const { data: homepage } = await useAsyncData("homepage", getHomepage);
// const { data: articles } = await useAsyncData("articles", getArticles);
const { data: global } = await useAsyncData("global", getGlobalSettings);
const { data: info } = await useAsyncData("info", getInfo);

usePageTitle("Info");

// Compute SEO image URL
const seoImageUrl = computed(() => {
  const featuredImage =
    homepage.value?.seo?.metaImage || global.value?.defaultSeo?.metaImage;
  return featuredImage ? strapiMediaUrl(featuredImage.url) : "";
});

useSEO({
  title: global.value?.siteName || "Yonk",
  description:
    homepage.value?.seo?.metaDescription ||
    global.value?.defaultSeo?.metaDescription ||
    "Yonk's website",
  image: seoImageUrl.value
    ? {
        url: seoImageUrl.value,
        alt: global.value?.siteName || "Yonk",
      }
    : undefined,
  url: process.client ? window.location.href : undefined,
  keywords: homepage.value?.seo?.keywords || global.value?.defaultSeo?.keywords,
});

// Handle SEO (optional, move to a separate utility if needed)
// const { seo } = homepage.value;
// const { defaultSeo, favicon, siteName } = global.value;

// const fullSeo = { ...defaultSeo, ...seo };

// Handle the favicon and meta tags
// const meta = getMetaTags(fullSeo);
// const faviconUrl = favicon && strapiMediaUrl(favicon.url);
</script>

<style lang="scss">
.info {
  margin-top: 84px;
  margin-top: 79px;
  margin-bottom: $mp * 2;
  position: relative;
  color: black;
  white-space: nowrap;

  @media only screen and (max-width: 1098px) {
    white-space: normal;
  }

  * {
    white-space: normal;
  }

  .media,
  .content {
    display: inline-block;
    width: 49.4%;
    vertical-align: top;
    box-sizing: border-box;
  }

  .media {
    width: calc(66%);
    margin-right: $mp;

    @media only screen and (max-width: 1098px) {
      width: 100%;
      padding-right: 0;
    }

    .bottom {
      margin-top: $mp;

      @media only screen and (max-width: 1098px) {
        display: none;
      }
    }

    .mobile {
      display: none;

      @media only screen and (max-width: 1098px) {
        display: block;
      }
    }

    img,
    video {
      width: 100%;
      opacity: 0.95;
    }
  }

  .content {
    width: calc(33.33% - 26px);
    height: 100%;
    padding-top: 0;
    font-size: 18px;
    font-weight: 200;
    color: black;

    // typografy stuff
    blockquote {
      font-size: 15px;
      font-weight: 200;
      font-style: normal;
      margin: 0;
    }

    a {
      text-decoration: underline;
    }

    p {
      margin-top: 0;
    }

    hr {
      border-top: 1px solid black;
      margin-top: 38px;
      margin: 40px 0;
    }

    h4 {
      font-weight: 900;
      font-size: inherit;
      color: black;
    }

    @media only screen and (max-width: 1098px) {
      width: 100%;
      position: relative;
      margin-top: 30px;
      padding-right: 20%;
    }

    @media only screen and (max-width: 588px) {
      padding-right: 0;
    }
  }
}
img,
video {
  width: 100%;
}
</style>
