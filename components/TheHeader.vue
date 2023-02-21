<template>
  <header class="p-1">
    <div class="container grid align-items-center">
      <div class="col">
        <nuxt-link to="/" class="plain flex">
          <img src="/images/logo.png" class="logo" alt="harcorp logo" />
        </nuxt-link>
      </div>
      <div class="col text-right">
        <!-- <i class="pi pi-bars"></i> -->
        <a
          href="https://app.clickup.com/login"
          target="_blank"
          class="p-button"
        >
          Vendor Login
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--white);
}
.logo {
  height: 50px;
}
.pi-bars {
  font-size: 2rem;
}
</style>