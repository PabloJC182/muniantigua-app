<template>
  <UHeader
    :toggle="{color:'info'}"
    :ui="{
      root:['degradado h-[10vh] md:h-[16vh] border-none z-50', !isSticky ? 'absolute w-full' : ''],
      container:'max-w-full',
      content:'bg-primary dark:bg-zinc-900'
    }"
  >

    <!-- Menú Izquierdo -->
    <template #left>
      <nuxt-link to="/">
        <img :src="imagenLogo" alt="Logo" class="h-14 md:h-25" >
      </nuxt-link>
    </template>

    <!-- Menú Principal Desktop -->
    <UNavigationMenu
      content-orientation="vertical"
      highlight
      highlight-color="info"
      :items="items"
      :ui="{
        linkLabel: 'text-white font-[causten] text-xl',
        childLinkLabel: 'font-[causten]',
        linkTrailingIcon: 'text-white'
      }"
    />

    <!-- Menú Derecho -->
    <template #right>
      <div class="flex flex-row items-center gap-x-2 md:gap-x-3">
        <div>
          <img :src="imagenBuscar" alt="Buscador" class="h-6 md:h-8" >
        </div>
        <div>
          <UPopover
            v-model:open="isOpenLang"
            :ui="{
              content: 'bg-transparent'
            }"
          >
            <img :src="imagenIdiomas" alt="Idiomas" class="h-6 md:h-8 cursor-pointer">
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
        <div>
          <img :src="imagenLogin" alt="Login" class="h-6 md:h-8">
        </div>
        <div class="">
          <ClientOnly class="hover:cursor-pointer">
            <UButton
              :icon="colorStore.isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="info"
              variant="ghost"
              @click="colorStore.toggle"
              size="xl"
            />
          </ClientOnly>
        </div>
      </div>
    </template>

    <!-- Menú Principal Móvil -->
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        highlight
        highlight-color="info"
        class="-mx-2.5"
        :ui="{
          linkLabel: 'text-white font-[causten]',
          childLinkLabel: 'font-[causten]',
          linkTrailingIcon:'text-white'
        }"
      />
    </template>

  </UHeader>
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

  const isOpenLang = ref(false)
  const colorStore = useColorModeStore()
  const route = useRoute()

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
          to: '/sesiones-concejo',
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

  onMounted(() => {
    isOpenLang.value = false
  })

  const { setLanguage } = useGoogleTranslate()

  function changeLang(lang) {
    setLanguage(lang)
    isOpenLang.value = false
  }

  const isSticky = ref(false)
  const handleScroll = () => {
    isSticky.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    isOpenLang.value = false
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

</script>

<style>
.degradado {
  background: linear-gradient(to bottom,  rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.35) 56%,rgba(0,0,0,0) 100%);
  backdrop-filter: blur(8px);
}
</style>
