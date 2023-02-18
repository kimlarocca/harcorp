<template>
  <footer class="container text-center">
    <Divider class="my-7" />
    <img src="/images/logo.png" class="logo" alt="harcorp logo" />
    <div class="my-4">
      <a href="https://www.instagram.com" target="_blank" class="mr-4">
        Instagram
      </a>
      <a href="https://www.facebook.com" target="_blank" class="mr-4">
        Facebook
      </a>
      <a href="https://www.linkedin.com" target="_blank" class="mr-4">
        LinkedIn
      </a>
      <a href="#" target="_blank" class="mr-4"> Terms </a>
      <a href="#" target="_blank" class="mr-4"> Privacy Policy </a>
    </div>
    <p class="small mb-8">
      Copyright © {{ year }} Harcorp LLC. All Rights Reserved.
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>