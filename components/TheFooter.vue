<template>
  <footer class="container text-center mb-8">
    <Divider class="pt-4 pb-7" />
    <nuxt-link to="/" class="plain">
      <img src="/images/logo.png" class="logo" alt="harcorp logo" />
    </nuxt-link>
    <div class="lg:flex justify-content-center mt-4 mb-3">
      <p>Tele: <a href="tel:202-964-3692" class="mr-4">202-964-3692</a></p>
      <p>
        Email:
        <a href="mailto:info@harcorp.org" target="_blank" class="mr-4">
          info@harcorp.org
        </a>
      </p>
      <p>Address: 80 M ST SE 02-212 Washington, DC 20003</p>
    </div>
    <p class="mb-2">
      DUNS: 117976015 <span class="mx-2">|</span> CBE: LSZR60772072024
    </p>
    <p>Copyright © {{ year }} Harcorp LLC. All Rights Reserved.</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
