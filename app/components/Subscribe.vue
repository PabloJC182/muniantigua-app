<template>
  <div class="mt-5 md:mt-15 flex items-center justify-center">
    <div class="px-5 py-2 w-[100vw] md:w-[50vw]">
      <div class="bg-zinc-100 dark:bg-primary-800 rounded-2xl shadow-md overflow-hidden py-3">
        <div class="flex flex-col items-center justify-center">
          <div class="flex">
            <h2 class="text-xl md:text-5xl text-primary-500 dark:text-white font-[causten] font-bold mr-3 mb-2 text-center">Suscríbete a nuestro boletín</h2>
          </div>
          <div class="flex items-center gap-2 w-full justify-center px-2">
            <div>
              <input type="text" placeholder="Dirección de correo electrónico" class="flex-1 bg-white dark:text-zinc-500 rounded-4xl text-xs md:text-3xl py-2 px-3 w-3xs md:w-xl"></input>
            </div>
            <img class="h-full w-8 md:w-15 text-center" :src="imagenBoton" alt="Boton">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import imagenBoton from '~/assets/img/news/Boton_Ir_Redondo.svg'
</script>