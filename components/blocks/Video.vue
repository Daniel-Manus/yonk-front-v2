<template>
  <div @click="handleClick" :class="'video-' + block.id" class="video block">
    <video ref="videoElement">
      <source
        :src="strapiMediaUrl(block.video.url) + '#t=0.1'"
        type="video/mp4"
      />
    </video>
    <div :class="'video__button--playing-' + playing" class="video__button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 127 127">
        <defs />
        <g>
          <path
            fill="#ffffff"
            fill-rule="evenodd"
            d="M62.5 125C97.0178 125 125 97.0178 125 62.5C125 27.9822 97.0178 0 62.5 0C27.9822 0 0 27.9822 0 62.5C0 97.0178 27.9822 125 62.5 125ZM46.8752 83.3335L88.5418 62.5002L46.8752 41.6668V83.3335Z"
            clip-rule="evenodd"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useStrapi } from "@/composables/useStrapi";
import { onMounted, ref } from "vue";

const { strapiMediaUrl } = useStrapi();

// Props definition
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

// Local state
const playing = ref(false);
const videoElement = ref(null);

// Handle play/pause functionality
const handleClick = () => {
  playing.value = !playing.value;
  if (playing.value) {
    videoElement.value.play();
  } else {
    videoElement.value.pause();
  }
};

// Reset the video when it ends
onMounted(() => {
  const vid = videoElement.value;
  vid.addEventListener("ended", () => {
    vid.currentTime = 0;
    playing.value = false;
  });
});
</script>

<style scoped lang="scss">
.video {
  width: 100%;
  height: auto;
  position: relative;
  cursor: pointer;

  video {
    width: 100%;
  }

  &__button {
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 100;
    transition: 0.4s ease;
    pointer-events: none;

    &--playing-true {
      opacity: 0;
    }
  }
}
</style>
