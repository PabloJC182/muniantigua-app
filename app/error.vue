<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <div class="text-center items-center">
      <h1 class="text-xl text-white">{{ error.statusCode }}</h1>
      <h2 class="text-3xl text-white">Página no encontrada</h2>
      <NuxtLink to="/">
        <UButton class="mt-10">
          Regresar al Inicio
        </UButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>