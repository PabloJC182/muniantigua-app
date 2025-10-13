<template>
  <div class="flex items-center justify-center mt-10 md:mt-20 w-full px-3 md:px-auto">
    <div class="grid grid-cols-3 md:grid-cols-4 gap-5">
      <div  v-for="(item, index) in botones" :key="index">
        <div class="relative text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <img :src="!colorStore.isDark ? imagenServiciosB : imagenServicios" alt="Fondo" class="w-full h-auto object-contain min-w-[110px] md:min-w-[300px]" />
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <img :src="!colorStore.isDark ? item.blanco : item.oscuro" :alt="item.texto" class="w-1/3 h-auto" />
            <p class="mt-2 text-primary-500 dark:text-white font-[causten] font-bold uppercase text-center max-w-2/3" :class="item.clase">{{ item.texto }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useColorModeStore } from '~/stores/colorMode'

  import imagenServicios from '~/assets/img/services/Boton_S3_Servicios.svg'
  import imagenServiciosB from '~/assets/img/services/Boton_S3_Servicios_Blanco.svg'
  import imagenMarbex from '~/assets/img/services/Marbex.svg'
  import imagenMarbexB from '~/assets/img/services/Marbex_Blanco.svg'
  import imagenBoleto from '~/assets/img/services/Boleto_de_Ornato.svg'
  import imagenBoletoB from '~/assets/img/services/Boleto_de_Ornato_Blanco.svg'
  import imagenMultas from '~/assets/img/services/Multas_de_Transito.svg'
  import imagenMultasB from '~/assets/img/services/Multas_de_Transito_Blanco.svg'
  import imagenInformacion from '~/assets/img/services/Informacion_Publica.svg'
  import imagenInformacionB from '~/assets/img/services/Informacion_Publica_Blanco.svg'
  import imagenParqueos from '~/assets/img/services/Parqueos.svg'
  import imagenParqueosB from '~/assets/img/services/Parqueos_Blanco.svg'
  import imagenSesiones from '~/assets/img/services/Sesiones_Concejo.svg'
  import imagenSesionesB from '~/assets/img/services/Sesiones_Concejo_Blanco.svg'
  import imagenFormularios from '~/assets/img/services/Formularios_Reglamentos.svg'
  import imagenFormulariosB from '~/assets/img/services/Formularios_Reglamentos_Blanco.svg'
  import imagenComude from '~/assets/img/services/Comude.svg'
  import imagenComudeB from '~/assets/img/services/Comude_Blanco.svg'
  import imagenTableros from '~/assets/img/services/Transparencia.svg'
  import imagenTablerosB from '~/assets/img/services/Transparencia_Blanco.svg'
  import imagenReforma from '~/assets/img/services/Reforma.svg'
  import imagenReformaB from '~/assets/img/services/Reforma_Blanco.svg'
  import imagenVecino from '~/assets/img/services/Vecino_Antigueno.svg'
  import imagenVecinoB from '~/assets/img/services/Vecino_Antigueno_Blanco.svg'
  import imagenDirectorio from '~/assets/img/services/Directorio.svg'
  import imagenDirectorioB from '~/assets/img/services/Directorio_Blanco.svg'

  const botones = ref([
    {blanco: imagenMarbex, oscuro: imagenMarbexB, texto: 'Adquiere Marbex', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenBoleto, oscuro: imagenBoletoB, texto: 'Boleto de Ornato', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenMultas, oscuro: imagenMultasB, texto: 'Multas de Tránsito', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenInformacion, oscuro: imagenInformacionB, texto: 'Información Pública', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenParqueos, oscuro: imagenParqueosB, texto: 'Parqueos Disponibles', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenSesiones, oscuro: imagenSesionesB, texto: 'Sesiones de Concejo', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenFormularios, oscuro: imagenFormulariosB, texto: 'Formularios y Reglamentos', clase: 'text-tiny', link: '/'},
    {blanco: imagenComude, oscuro: imagenComudeB, texto: 'Comude', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenTableros, oscuro: imagenTablerosB, texto: 'Tablero de Transparencia', clase: 'text-tiny', link: '/'},
    {blanco: imagenReforma, oscuro: imagenReformaB, texto: 'La Reforma', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenVecino, oscuro: imagenVecinoB, texto: 'Vecino Antigüeño', clase: 'text-xs md:text-2xl', link: '/'},
    {blanco: imagenDirectorio, oscuro: imagenDirectorioB, texto: 'Directorio Telefónico', clase: 'text-xs md:text-2xl', link: '/'},
  ])

  const colorStore = useColorModeStore()

</script>