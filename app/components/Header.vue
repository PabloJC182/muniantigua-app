<template>
  <div :class="['flex flex-row justify-between items-center w-full px-4 py-3 md:py-5 md:px-10 z-20 degradado', isSticky ? 'sticky top-0' : 'absolute top-0']">
    <div>
      <nuxt-link to="/">
        <img :src="imagenLogo" alt="Logo" class="h-14 md:h-25">
      </nuxt-link>
    </div>
    <div>
      <UDropdownMenu
        :items="items"
        class="block md:hidden"
      >
        <!-- <UButton :icon="!isOpen ? 'i-lucide-menu' : 'i-lucide-x'" variant="ghost" color="info" @click="toggleMenu()" /> -->
        <UButton icon="i-lucide-menu" variant="ghost" color="info" />
      </UDropdownMenu>
      <UNavigationMenu
        content-orientation="vertical"
        :items="items"
        :ui="{linkLabel: 'text-white font-[causten] text-xl', childLinkLabel: 'font-[causten]', childLinkDescription: 'font-[causten]'}"
        class="hidden md:block"
      />
    </div>
    <div>
      <ul class="flex flex-row items-center">
        <li>
          <img :src="imagenBuscar" alt="Buscador" class="h-6 md:h-8">
        </li>
        <li>
          <UPopover
            v-model:open="isOpen"
            :ui="{content: 'bg-transparent'}"
          >
            <img :src="imagenIdiomas" alt="Idiomas" class="h-6 md:h-8 ml-2 md:ml-5 cursor-pointer">
            <template #content>
              <Placeholder class="w-5 md:w-10 h-25 md:h-40 m-1 md:m-2 flex flex-col gap-1 md:gap-2 pt-1">
                <img :src="imagenES" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('es')">
                <img :src="imagenUS" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('en')">
                <img :src="imagenFR" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('fr')">
                <img :src="imagenDE" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('de')">
                <img :src="imagenJP" alt="Buscador" class="h-4 md:h-6 pr-1" @click="changeLang('ja')">
              </Placeholder>
            </template>
          </UPopover>
          
        </li>
        <li>
          <img :src="imagenLogin" alt="Login" class="h-6 md:h-8 ml-2 md:ml-5">
        </li>
        <li class="ml-0 md:ml-3">
          <ClientOnly class="hover:cursor-pointer">
            <UButton
              :icon="colorStore.isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="info"
              variant="ghost"
              @click="colorStore.toggle"
              size="xl"
            />
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
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
  const isOpen = ref(false)
  const language = ref('es')
  const colorStore = useColorModeStore()

  const handleScroll = () => {
    isSticky.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    isOpen.value = false
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const { setLanguage } = useGoogleTranslate()

  function changeLang(lang) {
    //if(language.value == 'es'){ language.value = 'en' } else { language.value = 'es' }
    //setLanguage(language.value)
    setLanguage(lang)
    isOpen.value = false
  }

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  const items = ref([
    {
      label: 'Muni Antigua',
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
      children: [
        {
          label: 'Form. Acceso a la Información',
        },
        {
          label: 'Información Pública',
        },
        {
          label: 'Concejo Municipal',
          to: '/sesiones-consejo',
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
      to: '/cultural',
    },
  ])
</script>

<style scoped>

.degradado {
  background: linear-gradient(to bottom,  rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.35) 56%,rgba(0,0,0,0) 100%);
  backdrop-filter: blur(8px);
}

</style>