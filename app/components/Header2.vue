<template>
  <div :class="['flex flex-row justify-between items-center w-full px-4 py-3 md:py-5 md:px-10 z-20 degradado', isSticky ? 'sticky top-0' : 'absolute top-0']">
  <UContainer class="w-full flex items-center justify-between">
    <div>
      <ULink to="/">Home</ULink>
    </div>
    <UButton @click="toggleMenu()" class="block md:hidden">
      <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
    </UButton>
    <div class="hidden md:flex">
      <UHorizontalNavigation :links="horizontalLinks"/>
    </div>
    <div v-if="isMenuOpen" class="flex flex-col md:hidden absolute top-10 z-10 left-1/2 transform -translate-x-1/2 p-4 items-center">
      <UVerticalNavigation :links="verticalLinks"/>
    </div>
    <div class="flex items-center justify-center gap-2">
      <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
    </div>
  </UContainer>
  </div>
</template>

<script setup lang="ts">
  import { useColorModeStore } from '~/stores/colorMode'

  const isMenuOpen = ref(false);
  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });
  const horizontalLinks = [
    { label: "Home", icon: 'i-heroicons-home', to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  const verticalLinks = [...horizontalLinks];

  const isSticky = ref(false)
  const isOpen = ref(false)
  const language = ref('es')
  const route = useRoute()
  const colorStore = useColorModeStore()

  const handleScroll = () => {
    isSticky.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const { setLanguage } = useGoogleTranslate()

  function changeLang() {
    if(language.value == 'es'){ language.value = 'en' } else { language.value = 'es' }
    setLanguage(language.value)
  }

import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Docs',
  to: '/amable',
  icon: 'i-lucide-book-open',
  active: route.path.startsWith('/amable')
}, {
  label: 'Components',
  to: '/cemunart',
  icon: 'i-lucide-box',
  active: route.path.startsWith('/cemunart')
}, {
  label: 'Figma',
  icon: 'i-simple-icons-figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])
</script>

<style scoped>

.degradado {
  background: linear-gradient(to bottom,  rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.35) 56%,rgba(0,0,0,0) 100%);
  backdrop-filter: blur(8px);
}

</style>