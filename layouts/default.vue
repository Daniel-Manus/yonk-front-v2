<template>
  <div>
    <Header />

    <main>
      <NuxtPage />
    </main>

    <footer>
      <p>Footer content goes here</p>
    </footer>
  </div>
</template>

<script setup>
// Import the Header component
import Header from "~/components/Header.vue";
</script>
