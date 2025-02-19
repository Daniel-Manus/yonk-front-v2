<template>
  <header>
    <nav>
      <div class="header-inner">
        <nuxt-link class="logo" to="/">
          <img src="/assets/svgs/logo.svg" alt="Logo" />
        </nuxt-link>

        <div class="header__links">
          <nuxt-link class="" to="/info"> Info </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
// Would be nice to make these globel :/
// But, ain't nobody got time for that
$maxwidth: 1700px;
$mp: 24px;
$hl: #ff2a00;

.header {
  top: 0;
  left: 0;
  width: 100vw;
  position: fixed;
  z-index: 10000;
  background: white;
}

.header-inner {
  max-width: $maxwidth;
  margin: 0 auto;
  font-family: "MD-System", sans-serif;
  position: relative;
  padding: 0 $mp * 3;

  @media only screen and (max-width: 1098px) {
    padding: 0 $mp;
  }
}

.header {
  &__links {
    display: inline-block;
    float: right;
    font-size: 18px;
    padding: 30px 0 22px;
  }

  &__link {
    cursor: pointer;
    transition: 0s;
    margin-left: 24px;

    &:hover {
      color: $hl;
    }
  }
}

.logo {
  top: 0;
  margin-left: -21px;
  padding: 30px 20px 20px;
  display: inline-block;
  z-index: 100;

  img {
    width: 80px;
  }

  path {
    transition: 0.4s ease;
  }

  &:hover {
    path {
      fill: $hl;
    }
  }
}
</style>
