<template>
  <nuxt-link
    :key="article.id"
    :to="`#`"
    class="thumb-container">
  
    <!-- IF IMAGE -->
    <template v-if="imgExt === '.jpg' || imgExt === '.jpeg' || imgExt === '.png' || imgExt === '.gif'">
      
      <!-- IF IMAGE SMALL -->
      <template v-if="article.image">
        <img
            @load="onImageLoad"
            :src="strapiMediaUrl(article.image.url)"
            alt="">
      </template>
      
    </template>

  </nuxt-link>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import { useStrapi } from '../composables/useStrapi'; // Import useStrapi composable
// :to="{ name: 'project-slug', params: { slug: article.slug } }"
// Define props
const props = defineProps({
  article: {
    type: Object,
    default: () => ({}),
  },
});

// Define emits for parent-child communication
const emit = defineEmits(['image-loaded']);

// Reactive state for image extension
const imgExt = ref(props.article.image?.ext.toLowerCase() || '');

// Use the `useStrapi` composable
const { strapiBaseUri } = useStrapi();

// Method to handle image load
const onImageLoad = () => {
  emit('image-loaded', { 
    id: props.article.id, 
    width: props.article.image.width, 
    height: props.article.image.height 
  });
};

// Replaced getStrapiMedia with the strapiBaseUri from useStrapi composable
const strapiMediaUrl = (url) => {
  if (url.startsWith("/")) {
    return `${strapiBaseUri.value}${url}`;
  }
  return url;
};

</script>

<style lang="scss">
/* Your existing styles can go here */
</style>
