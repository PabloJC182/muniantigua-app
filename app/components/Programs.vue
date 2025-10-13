<template>
  <div class="mt-5 md:mt-15 w-full">
    <UMarquee
      pause-on-hover
      :overlay="true"
      :ui="{ root: '[--gap:--spacing(4)] md:[--gap:--spacing(15)]', content: 'w-auto py-1' }"
    >
      <div
        v-for="(item, index) in programas"
        :key="index"
      >
        <nuxt-link :to="item.link">
          <img :src="!colorStore.isDark ? item.blanco : item.oscuro" alt="Programa" class="w-20 h-20 md:w-50 md:h-50">
        </nuxt-link>
      </div>
    </UMarquee>
  </div>
</template>

<script setup>
  import { useColorModeStore } from '~/stores/colorMode'

  import imagenCuida from '~/assets/img/programs/Cuida.svg'
  import imagenCuidaB from '~/assets/img/programs/Cuida_Blanco.svg'
  import imagenFerias from '~/assets/img/programs/Ferias_Artesanales.svg'
  import imagenFeriasB from '~/assets/img/programs/Ferias_Artesanales_Blanco.svg'
  import imagenCiem from '~/assets/img/programs/CIEM.svg'
  import imagenCiemB from '~/assets/img/programs/CIEM_Blanco.svg'
  import imagenAmable from '~/assets/img/programs/Amable.svg'
  import imagenAmableB from '~/assets/img/programs/Amable_Blanco.svg'
  import imagenSosea from '~/assets/img/programs/SOSEA.svg'
  import imagenSoseaB from '~/assets/img/programs/SOSEA_Blanco.svg'
  import imagenOrquesta from '~/assets/img/programs/Joven_Orquesta.svg'
  import imagenOrquestaB from '~/assets/img/programs/Joven_Orquesta_Blanco.svg'
  import imagenCemunart from '~/assets/img/programs/CEMUNART.svg'
  import imagenCemunartB from '~/assets/img/programs/CEMUNART_Blanco.svg'
  import imagenInstitutos from '~/assets/img/programs/Institutos_Municipales.svg'
  import imagenInstitutosB from '~/assets/img/programs/Institutos_Municipales_Blanco.svg'
  import imagenCultural from '~/assets/img/programs/Centro_Cultural.svg'
  import imagenCulturalB from '~/assets/img/programs/Centro_Cultural_Blanco.svg'

  const programas = ref([
    {blanco: imagenCuida, oscuro: imagenCuidaB, link: '/cuida'},
    {blanco: imagenFerias, oscuro: imagenFeriasB, link: '/ferias'},
    {blanco: imagenCiem, oscuro: imagenCiemB, link: '/ciem'},
    {blanco: imagenAmable, oscuro: imagenAmableB, link: '/amable'},
    {blanco: imagenSosea, oscuro: imagenSoseaB, link: '/sosea'},
    {blanco: imagenOrquesta, oscuro: imagenOrquestaB, link: '/orquesta'},
    {blanco: imagenCemunart, oscuro: imagenCemunartB, link: '/cemunart'},
    {blanco: imagenInstitutos, oscuro: imagenInstitutosB, link: '/institutos'},
    {blanco: imagenCultural, oscuro: imagenCulturalB, link: '/cultural'},
  ])

  const colorStore = useColorModeStore()

</script>