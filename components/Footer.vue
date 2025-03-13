<template>
  <footer>
    <div class="footer-inner">
      <div class="links left">
        <div class="link">info@yonk.online</div>
      </div>
      <div class="links right">
        <a
          class="link"
          href="https://www.instagram.com/yonk.online/"
          target="_blank"
          >Instagram</a
        >
        <a class="link" href="https://twitter.com/yonkonline" target="_blank"
          >Twitter</a
        >
        <a
          class="link"
          href="https://www.youtube.com/channel/UCeVIE2HS9uqD5cS0FrOapzw"
          target="_blank"
          >Youtube</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
  top: 0;
  left: 0;
  width: 100vw;
  background: $color-bg;
}

.footer-inner {
  max-width: $maxwidth;
  margin: 0 auto;
  position: relative;
  padding: 0 $mp;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.links {
  font-size: 18px;
  padding: $mp 0;

  @media only screen and (max-width: 800px) {
    font-size: 15px;
  }
}
.links.right {
  display: flex;
  gap: $mp / 2;
}
</style>
