<template>
  <div class="mt-10 md:mt-30">
    <UCarousel
      v-slot="{ item }"
      fade
      dots
      :items="items"
      :autoplay="{ delay: 3000 }"
      class="w-full mx-auto mb-5"
    >
      <div class="relative overflow-hidden w-full h-[50vh] md:h-screen">
        <img :src="item.src" alt="imagen" class="w-full h-100 md:h-[140vh] overflow-hidden object-cover">
        <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent">
          <div class="flex items-center justify-center w-3/5 md:w-2/5">
            <div class="z-10 flex flex-col items-center h-full justify-start -mt-50 md:-mt-80">
              <div>
                <h1 class="text-white text-2xl md:text-6xl font-[causten] text-center">{{ item.textoprin }}</h1>
              </div>
              <div>
                <h2 class="text-white text-sm md:text-3xl font-[causten] text-center">{{ item.textosec }}</h2>
              </div>
              <button class="bg-warning dark:bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-3 md:px-10 mt-3 rounded-3xl font-[causten] text-md md:text-3xl">
                {{ item.buttontext }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<script setup>
  import imagenServicios from '~/assets/img/services/Banner_Servicios.png'
  import imagenKiosko from '~/assets/img/services/Banner_Kiosko.png'

  const items = ref([
    {src: imagenServicios, textoprin: 'Clínica temporal', textosec: 'de castración y esterilización', buttontext: 'Ver más servicios'},
    {src: imagenKiosko, textoprin: 'Kiosko', textosec: 'de empleos', buttontext: 'Ver disponibilidad'},
    {src: imagenServicios, textoprin: 'Clínica temporal', textosec: 'de castración y esterilización', buttontext: 'Ver más servicios'},
    {src: imagenKiosko, textoprin: 'Kiosko', textosec: 'de empleos', buttontext: 'Ver disponibilidad'},
    {src: imagenServicios, textoprin: 'Clínica temporal', textosec: 'de castración y esterilización', buttontext: 'Ver más servicios'},
    {src: imagenKiosko, textoprin: 'Kiosko', textosec: 'de empleos', buttontext: 'Ver disponibilidad'},
    {src: imagenServicios, textoprin: 'Clínica temporal', textosec: 'de castración y esterilización', buttontext: 'Ver más servicios'},

  ])
</script>