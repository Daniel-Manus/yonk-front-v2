<template>
  <footer>
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
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
// Would be nice to make these globel :/
// But, ain't nobody got time for that
$maxwidth: 1700px;
$mp: 24px;
$hl: #ff2a00;

footer {
  .links {
    display: inline-block;
    font-size: 18px;
    // padding: 30px 0 30px;

    @media only screen and (max-width: 800px) {
      font-size: 15px;
    }

    &.left {
      .link {
        margin-left: 0;
        &:hover {
          color: black;
          cursor: auto;
        }
      }
    }

    &.right {
      float: right;
    }
  }

  .link {
    cursor: pointer;
    transition: 0s;
    margin-left: 24px;

    &:hover {
      color: $hl;
    }

    @media only screen and (max-width: 600px) {
      display: block;
      text-align: left;
      width: 20vw;
    }
  }
}
</style>
