<template>
  <div class="mt-10">
    <div>
      <h2 class="text-primary-500 dark:text-white text-3xl md:text-6xl font-[causten] text-center">La <span class="font-extrabold italic">Administración</span></h2>
    </div>
    <div class="mt-10 flex gap-5">
      <div class="w-full md:w-1/3 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <img :src="imagenAdmin" alt="Administracion">
        <p class="-mt-10 text-xl text-primary-500 dark:text-white font-[causten] font-light italic text-center block md:hidden">Juan Manuel Asturias</p>
        <p class="mt-0 text-xs text-primary-500 dark:text-white font-[causten] text-center block md:hidden">Alcalde Municipal 2024-2028</p>
      </div>
      <div class="w-1/3 hidden md:block">
        <div class="relative text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img :src="!colorStore.isDark ? imagenBotonB : imagenBoton" alt="Fondo" class="w-full h-auto object-cover" />
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p class="mt-2 text-6xl text-primary-500 dark:text-white font-[causten] text-center max-w-2/3">Juan Manuel</p>
            <p class="mt-2 text-8xl text-primary-500 dark:text-white font-[causten] font-bold italic text-center max-w-2/3">Asturias</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 hidden md:block">
        <div class="relative text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img :src="!colorStore.isDark ? imagenBotonB : imagenBoton" alt="Fondo" class="w-full h-auto object-cover" />
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p class="mt-2 text-6xl text-primary-500 dark:text-white font-[causten] text-center max-w-4/5">Alcalde Municipal</p>
            <p class="mt-2 text-6xl text-primary-500 dark:text-white font-[causten] font-bold italic text-center max-w-2/3">2024-2028</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useColorModeStore } from '~/stores/colorMode'

  import imagenAdmin from '~/assets/img/admin/administracion.png'
  import imagenBoton from '~/assets/img/services/Boton_S3_Servicios.svg'
  import imagenBotonB from '~/assets/img/services/Boton_S3_Servicios_Blanco.svg'

  const colorStore = useColorModeStore()

</script>