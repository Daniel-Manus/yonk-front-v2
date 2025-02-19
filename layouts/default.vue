<template>
  <div>
    <Header />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
</script>
