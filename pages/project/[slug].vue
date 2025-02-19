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
.project-detail {
  margin-top: 84px;

  .loading {
    font-size: 18px;
    text-align: center;
    color: gray;
  }
}
</style>
