<template>
  <div :class="'three-images-' + 0" class="three-images block">
    <div
      :class="'col-' + block.images.length"
      class="three-images__image"
      v-for="img in block.images"
      :key="img.url"
    >
      <!-- IF image file extension matches image formats -->
      <template
        v-if="['.jpg', '.jpeg', '.png', '.gif'].includes(img.ext.toLowerCase())"
      >
        <!-- IF 1 IMAGE -->
        <template v-if="block.images.length === 1">
          <img :src="strapiMediaUrl(img.url)" alt="Image" />
        </template>

        <!-- IF 2 OR MORE IMAGES -->
        <template v-if="block.images.length >= 2">
          <img :src="strapiMediaUrl(img.url)" alt="Image" />
        </template>
      </template>

      <!-- IF 3D Model file (e.g. .fbx) -->
      <!-- <template v-if="img.ext === '.fbx'">
        <ThreeDee :model="img" />
      </template> -->
    </div>
  </div>
</template>

<script setup>
import { useStrapi } from "@/composables/useStrapi";
//   import ThreeDee from '../ThreeDee.vue';

// Props
defineProps({
  block: {
    type: Object,
    required: true,
  },
});

// Methods
const { strapiMediaUrl } = useStrapi();
</script>

<style lang="scss">
.three-images {
  &__image {
    margin-right: 24px;
    display: inline-block;
    vertical-align: top;

    img {
      width: 100%;
    }

    &.col-1 {
      width: 100%;
    }

    &.col-2 {
      width: calc(50% - 12px);

      @media only screen and (max-width: 770px) {
        width: 100%;
        margin-bottom: $mp;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    &.col-3 {
      width: calc(33.3333% - 16px);

      @media only screen and (max-width: 588px) {
        width: 100%;
        margin-bottom: $mp;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
