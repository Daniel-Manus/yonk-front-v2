<template>
  <div :class="'youtube-' + block.id" class="youtube block">
    <iframe
      ref="iframe"
      width="560"
      height="315"
      :src="'https://www.youtube.com/embed/' + block.embedurl"
      title="YouTube video player"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
// import { useStrapi } from "@/composables/useStrapi";
import { onBeforeUnmount, onMounted, ref } from "vue";

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
