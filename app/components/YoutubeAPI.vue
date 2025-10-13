<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const API_KEY = 'AIzaSyA55uPtx2GjqEDXI_Q5Tb1Bub5sIRbX6k' // Clave API
const CHANNEL_ID = 'UCJkEQuyrKkjzyE8RVkcs4Kg' // ID del canal
const MAX_RESULTS = 50 // Límite de videos por búsqueda
const q = 'Sesión' // Palabra clave para filtrar por tema
const videos = ref([])
const videosFavs = ref([])


// Busqueda
function filtro(){
  let filter = document.getElementById('find').value.toUpperCase();
  let item = document.querySelectorAll('item.snippet.title'); // quizás con . al inicio.
  let l = document.getElementsByTagName('h2');
  for(var i=0; i<=l.length; i++){
    let a = item[i].getElementsByTagName('h2')[0];
    let value=a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1){
      item[i].style.display="";
    }
    else
    {
      item[i].style.display="none";
    }
  }
}

// Fechas seleccionadas en el calendario
const selectedRange = ref({
  start: null,
  end: null
})

// Nombres de los meses en español
const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// Formatea fecha como “13 de octubre de 2025”
function formatDate(date) {
  if (!date) return ''
  const monthIndex = (typeof date.month === 'number') ? (date.month - 1) : (Number(date.month) - 1)
  const monthName = monthNames[monthIndex] || ''
  return `${date.day} de ${monthName} de ${date.year}`
}

// Convierte la fecha del calendario (CalendarDate) a objeto Date nativo
function toJSDate(calendarDate) {
  if (!calendarDate) return null
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

// Cargar videos desde la API de YouTube
onMounted(async () => {
  try {
    const likesAlmacenados = localStorage.getItem('videosFavs')
    if (likesAlmacenados) {
      videosFavs.value = JSON.parse(likesAlmacenados)
    }
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(q)}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.items) {
      videos.value = data.items.filter(v => v.id.kind === 'youtube#video')
      console.log('Videos cargados:', videos.value.length)
    }
    } catch (error) {
    console.error('Error cargando videos:', error)
  }
})

// Guardar favoritos
watch(videosFavs, (newLikes) => {
  localStorage.setItem('videosFavs', JSON.stringify(newLikes))
}, { deep: true })

// Agregar a favoritos
function agregarListaFav(video) {
  if (!videosFavs.value.some(v => v.id.videoId === video.id.videoId)) {
    videosFavs.value.push(video)
  }
}

// Eliminar de favoritos
function removeFromLiked(videoId) {
  videosFavs.value = videosFavs.value.filter(v => v.id.videoId !== videoId)
}

// Filtra los videos según el rango de fechas seleccionado
const videosFiltrados = computed(() => {
  if (!selectedRange.value.start || !selectedRange.value.end) {
    return videos.value
  }

  const start = toJSDate(selectedRange.value.start)
  const end = toJSDate(selectedRange.value.end)
  if (!start || !end) return videos.value

  return videos.value.filter(v => {
    const fechaPublicacion = new Date(v.snippet.publishedAt)
    return fechaPublicacion >= start && fechaPublicacion <= end
  })
})

// Lista final de videos a mostrar
const videosAMostrar = computed(() => videosFiltrados.value)

// Saber si hay un rango activo
const fechaSeleccionada = computed(() => selectedRange.value.start && selectedRange.value.end)

// Limpiar filtro
function limpiarFiltro() {
  selectedRange.value = { start: null, end: null }
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 px-4 sm:px-6 lg:px-8 py-10">
    <div class="contenedor flex flex-col lg:flex-row gap-10 justify-center items-start" style="margin-top: 7%;">
      <!-- Lista de favoritos -->
      <div class="flex-1 w-full">
        <h2 class="text-2xl font-bold mb-6 text-center lg:text-left">Mis videos favoritos</h2>
        <div v-if="videosFavs.length > 0" class="relative">
          <UCarousel
            v-slot="{ item }"
            :items="videosFavs"
            :ui="{
              item: 'basis-full sm:basis-1/2 md:basis-1/3',
              container: 'rounded-lg'
            }"
            loop
            arrows
            class="w-full"
            >
            <div class="flex flex-col items-center h-full px-2 pb-4">
              <iframe
                :src="`https://www.youtube.com/embed/${item.id.videoId}`"
                frameborder="0"
                allowfullscreen
                class="rounded-lg w-full aspect-video"
              ></iframe>
              <h4 class="text-center mt-2 font-semibold text-sm sm:text-base line-clamp-2 flex-1">
                {{ item.snippet.title }}
              </h4>
              <UButton
                @click="removeFromLiked(item.id.videoId)"
                icon="mdi:star-off-outline"
                label="Remover"
                color="red"
                variant="solid"
                class="mt-2 text-sm sm:text-base"
              />
            </div>
          </UCarousel>
        </div>
        <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <UIcon name="line-md:star-alt-twotone" class="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p class="text-lg">No tienes videos favoritos aún</p>
          <p class="text-sm mt-2">Agrega videos desde la sección de abajo</p>
        </div>
      </div>
      <!-- Calendario -->
      <div class="w-full lg:w-80 flex justify-center lg:justify-start">
        <UCollapsible :unmount-on-hide="true" class="w-full">
          <UButton
            label="Búsqueda"
            icon="i-heroicons-magnifying-glass"
            color="neutral"
            variant="subtle"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            block
          />
          <template #content>
            <UCalendar
              variant="outline"
              v-model="selectedRange"
              :fixed-weeks="false"
              range
            />
            <div v-if="selectedRange && selectedRange.start && selectedRange.end" class="mt-4 text-lg text-center">
              <p>Rango de búsqueda:</p>
              <p id="find">{{ formatDate(selectedRange.start) }} – {{ formatDate(selectedRange.end) }}</p>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>
    <!-- Videos filtrados o todos -->
    <h2 class="text-2xl font-bold mt-16 mb-6 text-center lg:text-left">
      {{ fechaSeleccionada ? 'Videos en el rango seleccionado' : 'Últimos videos' }}
    </h2>
    <div class="relative">
      <UCarousel
        v-slot="{ item }"
        :items="videosAMostrar"
        :ui="{
          item: 'basis-full sm:basis-1/2 lg:basis-1/3',
          container: 'rounded-lg'
        }"
        :autoplay="videosFavs.length > 0 && !fechaSeleccionada ? { delay: 7000 } : false"
        arrows
        class="w-full mb-10"
        >
        <div class="flex flex-col items-center h-full px-2 pb-4">
          <iframe
            :src="`https://www.youtube.com/embed/${item.id.videoId}`"
            frameborder="0"
            allowfullscreen
            class="rounded-lg w-full aspect-video"
          ></iframe>
          <h2 class="text-center mt-2 font-semibold text-base sm:text-lg line-clamp-2 flex-1">
            {{ item.snippet.title }}
          </h2>
          <h4 class="text-center mt-2 text-sm font-medium text-gray-600 dark:text-gray-300 line-clamp-3">
            {{ item.snippet.description }}
            <span class="block text-xs text-gray-400 mt-1">
              {{ new Date(item.snippet.publishedAt).toLocaleDateString() }}
            </span>
          </h4>
          <div class="flex gap-4 mt-3">
            <UButton
              @click="agregarListaFav(item)"
              icon="mdi:star-outline"
              label="Favoritos"
              color="primary"
              variant="solid"
              class="text-sm sm:text-base"
            />
          </div>
        </div>
      </UCarousel>
      <!-- Mensaje si no hay resultados -->
      <div v-if="fechaSeleccionada && videosFiltrados.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        <UIcon name="i-heroicons-video-camera" class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p class="text-lg">No hay videos publicados en este rango de fechas</p>
        <UButton
          @click="limpiarFiltro"
          label="Ver todos los videos"
          color="primary"
          variant="solid"
          class="mt-4"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>