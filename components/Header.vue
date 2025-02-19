<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
// SCSS styles
$primary-color: #3498db;

header {
  background-color: $primary-color;
  color: white;
  padding: 1rem;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>
