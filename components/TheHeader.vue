<template>
  <header>
    <div class="container">
      <div class="grid align-items-center">
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
            Login
          </a>
        </div>
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
  padding-top: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.logo {
  height: 50px;
}
.pi-bars {
  font-size: 2rem;
}
</style>