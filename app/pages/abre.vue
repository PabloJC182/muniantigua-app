<template>
  <div>
    <div class="relative overflow-hidden w-full h-[50vh] md:h-screen">
      <img :src="imagenBg" alt="imagen" class="w-full h-full object-cover"></img>
    </div>
    <h1 class="text-6xl text-center text-primary font-[causten] font-bold my-20">ABRE</h1>
  </div>
</template>

<script setup>
  import imagenBg from '~/assets/img/programs/abre.jpg'
</script>