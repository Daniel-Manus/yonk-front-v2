<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStrapi } from '../composables/useStrapi';
// import { useHead } from '@vueuse/head';

const route = useRoute();
const article = ref(null);
const { fetchArticle } = useStrapi();

// Fetch article on component mount
onMounted(async () => {
  if (route.params.slug) {
    article.value = await fetchArticle(route.params.slug);
  }
});

const strapiMediaUrl = (url) => {
  if (url.startsWith("/")) {
    return `${process.env.strapiBaseUri}${url}`;
  }
  return url;
};

// Handle SEO using VueUse's useHead
// useHead({
//   title: article.value?.title || 'Article',
//   meta: [
//     {
//       name: 'description',
//       content: article.value?.description || '',
//     },
//     {
//       property: 'og:title',
//       content: article.value?.title || '',
//     },
//     {
//       property: 'og:image',
//       content: article.value?.image ? strapiMediaUrl(article.value.image.url) : '',
//     },
//   ],
// });
</script>

<template>
  <div v-if="article" class="project-detail">
    <!-- Show article content once it's loaded -->
    <div class="heading">
      <div class="heading__image">
        <img :src="strapiMediaUrl(article.headerimage.url)" alt="" />
      </div>
      <div class="heading__content">
        <h1 class="heading__title">{{ article.title }}</h1>
        <div v-if="article.content" v-html="article.content" class="heading__desc"></div>
        <div v-if="article.links" v-html="article.links" class="heading__links"></div>
      </div>
    </div>

    <div class="content-blocks">
      <template v-for="block in article.dynamiclayout">
        <!-- Dynamic content blocks here -->
        <!-- <template v-if="block.__component === 'content-blocks.images-block'">
          <Images :block="block" />
        </template>
        <template v-if="block.__component === 'content-blocks.video-block'">
          <Video :block="block" />
        </template>
        <template v-if="block.__component === 'content-blocks.youtube-block'">
          <Youtube :block="block" />
        </template> -->
        hi
      </template>
    </div>
  </div>

  <!-- Show loading indicator if article is not available yet -->
  <div v-else class="loading">Loading...</div>
</template>

<style lang="scss">
$mp: 24px;

.project-detail {
  margin-top: 84px;

  .heading {
    //margin-top: 90px;
    margin-top: 79px;
    margin-bottom: $mp * 2;
    position: relative;
    color: black;
    white-space: nowrap;

    @media only screen and (max-width: 1098px) {
      white-space: normal;
    }

    * { white-space: normal; }

    &__image,
    &__content {
      display: inline-block;
      width: 49.4%;
      font-size: 0;
      vertical-align: top;
      box-sizing: border-box;
    }

    &__image {
      width: calc(66% + 26px);
      padding-right: $mp;
      // border: 1px dashed red;

      @media only screen and (max-width: 1098px) {
        width: 100%;
        padding-right: 0;
      }

      img {
        width: 100%;
      }
    }

    &__content {
      width: calc(33.33% - 26px);
      height: 100%;
      padding-bottom: $mp;;

      @media only screen and (max-width: 1098px) {
        width: 100%;
        position: relative;
        margin-top: 30px;
      }
    }

    &__title {
      margin: 0;
      margin-bottom: 10px;
      margin-top: -2px;
      font-size: 18px;
      padding-bottom: 15px;
      font-family: "MD-System", sans-serif;
      font-weight: 900;
      color: black;
      border-bottom: 1px solid black;

      @media only screen and (max-width: 1098px) {
        margin-top: $mp;
        margin-bottom: 0;
      }
    }
    
    &__desc {
        a {
          text-decoration: underline;
        }
    }

    &__links,
    &__desc {
      padding-top: $mp;
      font-size: 18px;
      color: black;
      font-weight: 200;

      * { color: black; }

      @media only screen and (max-width: 1098px) {
        padding-right: 20%;
      }

      @media only screen and (max-width: 588px) {
        padding-right: 0;
      }


      // typografy stuff
      blockquote {
        font-size: 15px;
        font-weight: 200;
        font-style: normal;
        margin: 0;
      }

      p {
        margin-top: 0;
      }


      hr {
        border-top: 1px solid black;
        margin-top: 38px;
        margin-bottom: 10px;
      }
    }

    &__links {
      font-size: 14px;
      position: absolute;
      bottom: 0;
      transition: 0.2s;

      @media only screen and (max-width: 1098px) {
        position: relative;
        margin-top: 20px;
      }

      p {
        margin: 0;
      }

      a {
        text-decoration: none !important;
      }
    }
  }

  .content-blocks {
  }

  .block {
    margin-bottom: $mp;

    &:last-of-type {
      margin-bottom: $mp * 2;
    }
  }
}

</style>