<template>
  <div :class="'youtube-' + block.id" class="youtube block">
    <iframe
      ref="iframe"
      width="560"
      height="315"
      :src="extractedUrl"
      title="YouTube video player"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
// import { useStrapi } from "@/composables/useStrapi";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// const { strapiMediaUrl } = useStrapi();

// Props definition
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

// Local state
const iframe = ref(null);

// Smart URL extraction - handles both embed URLs and full iframe code
const extractedUrl = computed(() => {
  const embedData = props.block.embedUrl || props.block.embedurl || '';
  
  if (!embedData) return '';
  
  // Check if it's a full iframe code
  if (embedData.includes('<iframe') && embedData.includes('src=')) {
    // Extract src URL from iframe code
    const srcMatch = embedData.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
  }
  
  // Check if it's already a full embed URL
  if (embedData.includes('youtube.com/embed/') || embedData.includes('youtu.be/')) {
    return embedData;
  }
  
  // Check if it's a regular YouTube watch URL
  if (embedData.includes('youtube.com/watch?v=')) {
    const videoId = embedData.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Check if it's a youtu.be short URL
  if (embedData.includes('youtu.be/')) {
    const videoId = embedData.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // If it's just a video ID, construct the embed URL
  if (embedData.match(/^[a-zA-Z0-9_-]{11}$/)) {
    return `https://www.youtube.com/embed/${embedData}`;
  }
  
  // Fallback - assume it's meant to be appended to embed URL
  return `https://www.youtube.com/embed/${embedData}`;
});

// Adjust iframe height dynamically on window resize
const adjustIframeHeight = () => {
  if (iframe.value) {
    iframe.value.style.height = `${iframe.value.offsetWidth * 0.56}px`;
  }
};

onMounted(() => {
  // Adjust iframe height on initial mount
  adjustIframeHeight();

  // Add resize event listener
  window.addEventListener("resize", adjustIframeHeight, true);
});

onBeforeUnmount(() => {
  // Clean up the event listener when the component is unmounted
  window.removeEventListener("resize", adjustIframeHeight, true);
});
</script>

<style scoped lang="scss">
.youtube {
  width: 100%;
  position: relative;

  iframe {
    width: 100%;
    height: 60vw; /* This can be adjusted based on the aspect ratio you want */
  }
}
</style>
