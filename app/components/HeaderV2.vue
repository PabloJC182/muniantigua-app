<template>
  <header :class="['top-0 z-50 w-full degradado', isSticky ? 'sticky' : 'absolute']">
    <div class="mx-auto flex items-center justify-between p-4">

      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-semibold text-primary-600 dark:text-primary-400">
        <img :src="imagenLogo" alt="Logo" class="h-14 md:h-25">
      </NuxtLink>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex items-center justify-between p-4 space-x-6">

        <div v-for="item in menuItems" :key="item.id" class="relative group">

          <!-- Without children -->
          <div v-if="!item.children">
            <NuxtLink
              :to="item.to"
              class="text-info hover:text-primary-500"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- With children -->
          <div v-else>
            <button
              @click="toggleDropdown(item.id)"
              class="flex items-center space-x-1 text-info hover:text-primary-500"
            >
              <span>{{ item.label }}</span>
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
            </button>

            <div
              v-show="activeDropdown === item.id"
              class="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-50"
            >
              <div>
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex flex-row items-center">
        <UButton
          color="info"
          variant="ghost"
          class="hover:cursor-pointer"
        >
          <img :src="imagenBuscar" alt="Buscar" class="h-6 md:h-8 cursor-pointer">
        </UButton>
        <div>
          <UPopover
            v-model:open="isOpenLang"
            :ui="{content: 'bg-transparent'}"
          >
            <UButton
              color="info"
              variant="ghost"
              class="hover:cursor-pointer"
            >
              <img :src="imagenIdiomas" alt="Idiomas" class="h-6 md:h-8 cursor-pointer">
            </UButton>
            <template #content>
              <div class="w-5 md:w-10 h-25 md:h-40 m-1 md:m-2 flex flex-col gap-1 md:gap-2 pt-1">
                <img :src="imagenES" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('es')">
                <img :src="imagenUS" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('en')">
                <img :src="imagenFR" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('fr')">
                <img :src="imagenDE" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('de')">
                <img :src="imagenJP" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('ja')">
              </div>
            </template>
          </UPopover>
        </div>
        <UButton
          color="info"
          variant="ghost"
          class="hover:cursor-pointer"
        >
          <img :src="imagenLogin" alt="Login" class="h-6 md:h-8 cursor-pointer">
        </UButton>
        <div>
          <ClientOnly>
            <UButton
              :icon="colorStore.isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="info"
              variant="ghost"
              class="hover:cursor-pointer"
              @click="colorStore.toggle"
              size="xl"
            />
          </ClientOnly>
        </div>
      </div>
      <!-- Mobile Menu Button -->
      <button @click="menuOpen = !menuOpen" class="md:hidden">
        <UIcon :name="menuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      >
        <ul class="flex flex-col p-4 space-y-2">
          <li>
            <button
              @click="toggleDropdown('mobile-products')"
              class="w-full flex justify-between items-center hover:text-primary-500"
            >
              <span>Products</span>
              <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
            </button>

            <!-- Mobile Submenu -->
            <ul
              v-show="activeDropdown === 'mobile-products'"
              class="mt-2 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4 space-y-1"
            >
              <li>
                <button
                  @click="toggleSubmenu('mobile-analytics')"
                  class="flex w-full justify-between items-center"
                >
                  <span>Analytics</span>
                  <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
                </button>

                <ul
                  v-show="activeSubmenu === 'mobile-analytics'"
                  class="mt-1 ml-4 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-1"
                >
                  <li>
                    <NuxtLink to="/sosea" class="block hover:text-primary-500">
                      Overview
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/orquesta" class="block hover:text-primary-500">
                      Reports
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink to="/institutos" class="block hover:text-primary-500">
                  Automation
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li><NuxtLink to="/abre" class="hover:text-primary-500">Pricing</NuxtLink></li>
          <li><NuxtLink to="/amable" class="hover:text-primary-500">About</NuxtLink></li>
        </ul>
      </div>
    </transition>
  </header>
</template>


<style>
html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.degradado {
  background: linear-gradient(to bottom,  rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.35) 56%,rgba(0,0,0,0) 100%);
  backdrop-filter: blur(8px);
}
</style>

<script setup lang="ts">
  import { useColorModeStore } from '~/stores/colorMode'

  import imagenLogo from '~/assets/img/navbar/Imagotipo_Muni.svg'
  import imagenBuscar from '~/assets/img/navbar/Icono_Buscador.svg'
  import imagenIdiomas from '~/assets/img/navbar/Icono_Idiomas.svg'
  import imagenLogin from '~/assets/img/navbar/Icono_Login.svg'
  import imagenES from '~/assets/img/navbar/es.svg'
  import imagenUS from '~/assets/img/navbar/us.svg'
  import imagenFR from '~/assets/img/navbar/fr.svg'
  import imagenDE from '~/assets/img/navbar/de.svg'
  import imagenJP from '~/assets/img/navbar/jp.svg'

  const isSticky = ref(false)
  const isOpenLang = ref(false)
  const colorStore = useColorModeStore()
  const route = useRoute()

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const activeDropdown = ref<string | null>(null)
const activeSubmenu = ref<string | null>(null)

  const handleScroll = () => {
    isSticky.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    isOpenLang.value = false
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

const toggleDropdown = (name:string) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
  activeSubmenu.value = null
}

const toggleSubmenu = (name:string) => {
  activeSubmenu.value = activeSubmenu.value === name ? null : name
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node | null
  const el = menuRef.value as Node | null

  if (el && target && !el.contains(target)) {
    activeDropdown.value = null
  }
}

  const menuItems = ref([
    {
      label: 'Muni Antigua',
      id: 'menu-antigua',
      children: [
        {
          label: 'Ciudad de Santiago',
          description: 'La Muy Noble y Muy Leal Ciudad de Santiago de los Caballeros',
          icon: 'i-lucide-shield-ban',
          to: '/ciudad',
          kbds: ['shift', 'meta', 'a']
        },
        {
          label: 'Alcalde',
        },
        {
          label: 'Concejo Municipal',
          disabled: true
        },
        {
          label: 'Misión y Visión',
        },
        {
          label: 'Directorio',
        },
        {
          label: 'Plan Estratégico',
        },
        {
          label: 'Alcaldías Auxiliares',
        },
      ]
    },
    {
      label: 'Pagos y Trámites',
      id: 'pagos-tramites',
      children: [
        {
          label: 'MarbEx',
          to: 'https://portal.muniantigua.gob.gt/',
          target: '_blank'
        },
        {
          label: 'Vecino Antigüeño',
          to: 'https://vecino.muniantigua.gob.gt',
          target: '_blank'
        },
        {
          label: 'Pago de Servicios',
          to: 'https://portal.muniantigua.gob.gt/',
          target: '_blank'
        },
        {
          label: 'Ventanilla Única',
        },
        {
          label: 'Multas de Tránsito',
        },
        {
          label: 'Formularios Electrónicos',
        },
      ]
    },
    {
      label: 'Proyectos',
      id: 'proyectos',
      children: [
        {
          label: 'Escuela San Mateo',
        },
        {
          label: 'Alcantarillado Santa Ana',
        },
        {
          label: 'Bacheo y Banquetas',
        },
        {
          label: 'Antigua 3D',
          to: 'https://antiguaen3d.muniantigua.gob.gt/',
          target: '_blank'
        },
        {
          label: 'Sistema Video Vigilancia',
        },
        {
          label: 'Calle Modelo',
        },
      ]
    },
    {
      label: 'Programas Municipales',
      id: 'programas-muni',
      children: [
        {
          label: 'Abre Antigua',
          to: '/abre',
        },
        {
          label: 'Cuida',
          to: '/cuida',
        },
        {
          label: 'Amable',
          to: '/amable',
        },
        {
          label: 'Biblioteca',
        },
        {
          label: 'La Pólvora',
        },
        {
          label: 'Cerro de la Cruz',
        },
        {
          label: 'Parque Florencia',
        },
        {
          label: 'Orquesta Juvenil Municipal',
          to: '/orquesta',
        },
        {
          label: 'CEMUNART',
          to: '/cemunart',
        },
        {
          label: 'SOSEA',
          to: '/sosea',
        },
      ]
    },
    {
      label: 'Transparencia',
      id: 'transparencia',
      children: [
        {
          label: 'Form. Acceso a la Información',
        },
        {
          label: 'Información Pública',
        },
        {
          label: 'Concejo Municipal',
        },
        {
          label: 'Datos Abiertos',
        },
        {
          label: 'Tableros de Transparencia',
        },
        {
          label: 'Reglamentos Vigentes',
        },
        {
          label: 'Denuncia Ciudadana',
        },
      ]
    },
    {
      label: 'Actividades Culturales',
      id: 'culturales',
      to: '/cultural',
    },
  ])

  onMounted(() => {
    isOpenLang.value = false
  })

  const { setLanguage } = useGoogleTranslate()

  function changeLang(lang:string) {
    setLanguage(lang)
    isOpenLang.value = false
  }
</script>