<template>
  <div class="masonry-grid" :class="{ hidden: !imagesLoaded }">
    <template v-for="article in sortedArticles" :key="article.id">
      <div :class="{ fbx: article.image.ext === '.fbx' }" class="project-thumb">
        <ArticleCard :article="article" @image-loaded="imageLoaded" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { MasonryGrid } from '@egjs/grid';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import ArticleCard from './ArticleCard';

// Props
const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
});

// Reactive state
const imagesLoadedN = ref(0);
const imagesLoaded = ref(false);

// Computed sorted articles
const sortedArticles = computed(() => {
  return [...props.articles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? -1 : 1))
    .reverse();
});

// Methods
const imageLoaded = () => {
  imagesLoadedN.value++;

  if (imagesLoadedN.value === props.articles.length) {
    imagesLoaded.value = true;
  }
};

// Masonry grid setup
let grid;
const setCols = () => {
  if (window.innerWidth > 1098) {
    grid.column = 3;
  } else if (window.innerWidth <= 1098 && window.innerWidth > 588) {
    grid.column = 2;
  } else {
    grid.column = 1;
  }
};

const onWindowResize = () => {
  setTimeout(() => {
    setCols();
    grid.updateItems();
    grid.syncElements();

    setTimeout(() => {
      setCols();
      grid.updateItems();
      grid.syncElements();
    }, 1000);
  }, 300);
};

onMounted(() => {
  grid = new MasonryGrid(".masonry-grid", {
    defaultDirection: "end",
    gap: 5,
    align: "justify",
    column: 3,
  });

  grid.renderItems();
  window.addEventListener("resize", onWindowResize);
  setCols();

  // Fallback in case images don't load
  setTimeout(() => {
    imagesLoaded.value = true;
  }, 3000);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
});
</script>

<style lang="scss">
.masonry-grid {
  margin-bottom: 10px;
  margin-top: 79px;

  &.hidden {
    opacity: 0;
  }
}

.project-thumb {
  width: calc(33.3333% - 15px);
  height: auto;
  vertical-align: top;
  transition: 0.2s;

  &:hover {
    filter: grayscale(40%);
  }

  @media only screen and (max-width: 1098px) {
    width: calc(50% - 15px);
  }

  @media only screen and (max-width: 588px) {
    width: 100%;
  }

  img {
    width: 100%;
    margin-bottom: 18px;
  }

  &.fbx {
    // TODO: height has to be the same as width
    // height: 22vw;
  }
}
</style>
