<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      fade
      dots
      :items="items"
      :autoplay="{ delay: 3000 }"
      class="w-full mx-auto mb-5"
      >
      <div class="relative overflow-hidden w-full h-[50vh] md:h-screen">
        <img :src="item.src" alt="imagen" class="w-full h-full object-cover">
        <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent">
          <div class="relative z-10 flex flex-col items-center w-full h-full justify-start -mt-5 md:mt-5 md:justify-center">
            <div>
              <h1 class="text-primary-500 dark:text-white text-3xl md:text-6xl font-[causten] text-center">{{ item.textoprin }}</h1>
            </div>
            <div>
              <h2 class="text-primary-500 dark:text-white text-3xl md:text-6xl font-[causten] text-center">{{ item.textosec }} <span class="font-extrabold italic">{{ item.spantext }}</span></h2>
            </div>
            <button class="bg-warning dark:bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-5 md:px-10 mt-3 rounded-3xl font-[causten] text-xl md:text-3xl">
              {{ item.boton }}
            </button>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<script setup>
  import imagenBg from '~/assets/img/catedral_plaza.jpg'
  import imagenBg2 from '~/assets/img/bg.jpg'

  const items = ref([
    {src: imagenBg, textoprin: '¿Qué hacer hoy en', textosec: 'La', spantext: 'Antigua Guatemala?', boton: 'Agenda Cultural'},
    {src: imagenBg2, textoprin: 'Te esperamos en', textosec: 'La', spantext: 'Antigua Guatemala', boton: 'Otras actividades'},
    {src: imagenBg, textoprin: '¿Qué hacer hoy en', textosec: 'La', spantext: 'Antigua Guatemala?', boton: 'Agenda Cultural'},
    {src: imagenBg2, textoprin: 'Te esperamos en', textosec: 'La', spantext: 'Antigua Guatemala', boton: 'Otras actividades'},
    {src: imagenBg, textoprin: '¿Qué hacer hoy en', textosec: 'La', spantext: 'Antigua Guatemala?', boton: 'Agenda Cultural'},
    {src: imagenBg2, textoprin: '¿Qué hacer hoy en', textosec: 'La', spantext: 'Antigua Guatemala', boton: 'Otras actividades'}
  ])
</script>