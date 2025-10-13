<template>
  <NuxtLayout>
    <ClientOnly>
    	<GoogleTranslate />
  	</ClientOnly>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { useColorModeStore } from '~/stores/colorMode'

  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'es'
    }
  })

  const title = 'Muni Antigua'
  const description = 'Municipalidad de Antigua Guatemala'

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: 'https://muniantigua.gob.gt/public/img/bg.jpg',
    twitterImage: 'https://muniantigua.gob.gt/public/img/bg.jpg',
    twitterCard: 'summary_large_image'
  })

  const colorStore = useColorModeStore()

  onMounted(() => {
    colorStore.init()
  })
</script>

<style>

::-webkit-scrollbar {
  width: 13px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-muniverde-500);
  background-size: 30px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary-500);
}

</style>