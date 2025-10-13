<template>
  <UModal v-model:open="open" close-icon="i-lucide-x" class="w-4/5 md:w-1/5 bg-white" title="Popup" description="Popup inicial">
    <template #content>
      <div class="m-4">
        <div class="flex justify-end">
          <img :src="imagenBoton" alt="Arco" class="absolute w-6 md:w-8 h-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            @click="closeModal()" />
        </div>
        <img :src="imagenArco" alt="Arco" class="w-full h-auto object-cover" />
        <p class="text-2xl md:text-4xl text-primary-500 font-[causten] text-center">a</p>
        <p class="text-2xl md:text-4xl text-primary-500 font-[causten] font-bold text-center">La Antigua Guatemala</p>
        <img :src="imagenMarbex" alt="Arco" class="w-full h-auto object-cover mt-5" />
        <img :src="imagenLineas" alt="Arco" class="w-full h-auto object-cover mt-5" />
        <div class="flex items-center justify-center">
          <a href="https://portal.muniantigua.gob.gt/#/marbetes?titulo=MarbEx%20Diario">
            <button class="bg-warning dark:bg-green-800 hover:bg-white hover:text-primary hover:border-warning hover:border-1 hover:cursor-pointer text-white font-bold mt-5 py-1 px-6 md:px-10 rounded-3xl font-[causten] text-xl md:text-2xl">
              Adquiérelo aquí
            </button>
          </a>
        </div>
        <p class="text-xs md:text-xl text-red-900 font-[causten] font-bold text-center">*MarbEx Diario <span class="font-normal">vence a las </span>00:00 <span class="font-normal">horas</span></p>
        <div class="flex items-center justify-center">
          <a href="https://portal.muniantigua.gob.gt/#/opcion">
            <button class="bg-white border-warning border-1 dark:bg-green-800 hover:bg-warning hover:text-white hover:cursor-pointer text-primary font-bold mt-2 py-1 px-6 md:px-10 rounded-3xl font-[causten] text-xl md:text-2xl">
              Puntos MarbEx
            </button>
          </a>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
  import imagenBoton from '~/assets/img/popup/Boton_Cerrar.svg'
  import imagenArco from '~/assets/img/popup/Arco_Bienvenidos.png'
  import imagenMarbex from '~/assets/img/popup/Marbex.png'
  import imagenLineas from '~/assets/img/popup/Lineas_de_Parqueo.png'

  const open = ref(true)

  function closeModal() {
    open.value = false
  }
</script>