<template>
  <div class="mt-10 md:mt-15 w-full">
    <div>
      <h1 class="text-primary-500 dark:text-white text-3xl md:text-6xl font-[causten] text-center italic">Actualidad</h1>
      <div class="px-5 py-2 md:p-10 grid md:grid-cols-2">
        <div>
          <img :src="imagenPalacio" alt="Noticias">
        </div>
        <div class="hidden md:flex md:flex-col mx-10 items-center justify-center">
          <p class="text-5xl text-primary-500 dark:text-white font-[causten] font-light italic text-center mb-10">
            Entrega del Pabellón Nacional a la Comunidad...
          </p>
          <p class="text-3xl text-primary-500 dark:text-white font-[causten] font-light text-center">
            El alcalde municipal Juan Manuel Asturias, junto con el Concejo Municipal, realizó la entrega del Pabellón Nacional a la comunidad educativa, un acto que nos recuerda que en cada niña y niño están los sueños y las metas que como guatemaltecos nos inspiran a seguir adelante
          </p>
        </div>
      </div>
      <div class="block md:hidden">
        <p class="text-lg text-primary-500 dark:text-white font-[causten] italic font-bold text-center">Entrega del Pabellón Nacional a la Comunidad...</p>
      </div>
    </div>
    <div class="px-5 py-2 md:p-10 ">
      <div class="bg-zinc-700 rounded-2xl shadow-md overflow-hidden">
        <div class="grid md:grid-cols-2 justify-between">
          <div class="bg-zinc-700 p-8 flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-2xl md:text-6xl font-semibold font-[causten]">Paseos con Encanto</div>
              <div class="text-2xl md:text-6xl font-semibold font-[causten]">San Pedro Las Huertas</div>
              <div class="mt-2 md:mt-14 text-primary-500 font-[causten] font-bold text-left md:text-center md:text-3xl">TURISMO</div>
            </div>
          </div>
          <div>
            <img class="h-full w-full object-cover rounded-2xl" :src="imagenSanPedro" alt="San Pedro">
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <h2 class="text-xl md:text-6xl text-primary-500 dark:text-white font-[causten] font-bold mr-3 text-center">Ver más noticias</h2>
      <img class="h-full w-8 md:w-15 text-center" :src="imagenBoton" alt="Boton">
    </div>
  </div>
</template>

<script setup>
  import imagenPalacio from '~/assets/img/news/Plaza_Mayor_Palacio_Ayuntamiento.jpg'
  import imagenSanPedro from '~/assets/img/news/San_Pedro_Las_Huertas.jpg'
  import imagenBoton from '~/assets/img/news/Boton_Ir_Redondo.svg'
</script>