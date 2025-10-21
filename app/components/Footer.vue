<template>
  <div class="mt-5 w-full">
    <p class="md:hidden text-xl md:text-4xl text-primary-500 dark:text-white font-[causten] text-center mr-2">PBX: <span class="font-bold">1552</span></p>
    <div class="py-2 grid grid-cols-3">
      <div>
        <img :src="!colorStore.isDark ? imagenPatronI : imagenPatronIB" alt="Izquierdo" class="w-40 md:w-full h-auto object-cover" />
      </div>
      <div class="flex flex-col md:flex-row gap-2 justify-start md:justify-center">
        <div class="hidden md:block">
          <p class="text-xl md:text-4xl text-primary-500 dark:text-white font-[causten] text-center mr-2">PBX: <span class="font-bold">1552</span></p>
        </div>
        <div class="flex gap-1 md:gap-2 justify-center">
          <img :src="!colorStore.isDark ? imagenInstagram : imagenInstagramB" alt="Derecho" class="w-8 md:w-12 h-8 md:h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
          <img :src="!colorStore.isDark ? imagenFacebook : imagenFacebookB" alt="Derecho" class="w-8 md:w-12 h-8 md:h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
          <img :src="!colorStore.isDark ? imagenX : imagenXB" alt="Derecho" class="w-8 md:w-12 h-8 md:h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
          <img :src="!colorStore.isDark ? imagenTikTok : imagenTikTokB" alt="Derecho" class="w-8 md:w-12 h-8 md:h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
          <img :src="!colorStore.isDark ? imagenYoutube : imagenYoutubeB" alt="Derecho" class="w-8 md:w-12 h-8 md:h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
        </div>
      </div>
      <div>
        <img :src="!colorStore.isDark ? imagenPatronD : imagenPatronDB" alt="Derecho" class="w-40 md:w-full h-auto object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useColorModeStore } from '~/stores/colorMode'

  import imagenInstagram from '~/assets/img/footer/SM_Instagram.svg'
  import imagenInstagramB from '~/assets/img/footer/SM_Instagram_Blanco.svg'
  import imagenFacebook from '~/assets/img/footer/SM_Facebook.svg'
  import imagenFacebookB from '~/assets/img/footer/SM_Facebook_Blanco.svg'
  import imagenX from '~/assets/img/footer/SM_X.svg'
  import imagenXB from '~/assets/img/footer/SM_X_Blanco.svg'
  import imagenTikTok from '~/assets/img/footer/SM_Tik_Tok.svg'
  import imagenTikTokB from '~/assets/img/footer/SM_Tik_Tok_Blanco.svg'
  import imagenYoutube from '~/assets/img/footer/SM_Youtube.svg'
  import imagenYoutubeB from '~/assets/img/footer/SM_Youtube_Blanco.svg'
  import imagenPatronI from '~/assets/img/footer/Patron_Footer_Izquierdo.svg'
  import imagenPatronIB from '~/assets/img/footer/Patron_Footer_Izquierdo_Blanco.svg'
  import imagenPatronD from '~/assets/img/footer/Patron_Footer_Derecho.svg'
  import imagenPatronDB from '~/assets/img/footer/Patron_Footer_Derecho_Blanco.svg'

  const colorStore = useColorModeStore()

</script>