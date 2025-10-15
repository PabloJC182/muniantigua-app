<script setup>
import { ref, onMounted, watch, computed } from 'vue'

// === CONFIGURACIÓN ===
const API_KEY = 'AIzaSyA55uPtx2GjqEDXI_Q5Tb1Bub5sIRbX6kM' // Clave API
const CHANNEL_ID = 'UCJkEQuyrKkjzyE8RVkcs4Kg' // ID del canal
const PLAYLIST_ID = 'PL3QddupNykEEVwN8xuFGWr7U1n4St8y_w' // ID de la playlist
const MAX_RESULTS = 50 // Límite de videos por búsqueda

// === VARIABLES REACTIVAS ===
const videos = ref([])
const videosFavs = ref([])
const nextPageToken = ref(null)
const loading = ref(false)
const allVideosLoaded = ref(false)

// === FUNCIÓN PARA CARGAR VIDEOS CON PAGINACIÓN ===
async function cargarVideos(pageToken = null) {
  try {
    loading.value = true
    
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&channelId=${CHANNEL_ID}&key=${API_KEY}`
    
    if (pageToken) {
      url += `&pageToken=${pageToken}`
    }
    
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.items) {
      const nuevosVideos = data.items
        .filter(v => v.snippet.resourceId?.videoId)
        .map(v => ({
          id: { videoId: v.snippet.resourceId.videoId },
          snippet: {
            title: v.snippet.title,
            description: v.snippet.description,
            publishedAt: v.snippet.publishedAt,
            thumbnails: v.snippet.thumbnails,
          }
        }))
      
      videos.value = [...videos.value, ...nuevosVideos]
      nextPageToken.value = data.nextPageToken || null
      allVideosLoaded.value = !data.nextPageToken
      
      console.log(`Videos cargados: ${nuevosVideos.length} | Total: ${videos.value.length} | Más páginas: ${!!data.nextPageToken}`)
    }
  } catch (error) {
    console.error('Error cargando videos:', error)
  } finally {
    loading.value = false
  }
}

// === CARGAR MÁS VIDEOS ===
async function cargarMasVideos() {
  if (nextPageToken.value && !loading.value) {
    await cargarVideos(nextPageToken.value)
  }
}

// fechas que se seleccionan en el calendario
const selectedRange = ref({
  start: null,
  end: null
})

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

function formatDate(date) {
  if (!date) return ''
  const monthIndex = Number(date.month) - 1
  return `${date.day} de ${monthNames[monthIndex]} de ${date.year}`
}

function toJSDate(calendarDate) {
  if (!calendarDate) return null
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

onMounted(async () => {
  try {
    // Cargar favoritos almacenados
    const likesAlmacenados = localStorage.getItem('videosFavs')
    if (likesAlmacenados) {
      videosFavs.value = JSON.parse(likesAlmacenados)
    }

    // Cargar primera página de videos
    await cargarVideos()
  } catch (error) {
    console.error('Error cargando videos:', error)
  }
})

// === GUARDAR FAVORITOS ===
watch(videosFavs, (newLikes) => {
  localStorage.setItem('videosFavs', JSON.stringify(newLikes))
}, { deep: true })

function agregarListaFav(video) {
  if (!videosFavs.value.some(v => v.id.videoId === video.id.videoId)) {
    videosFavs.value.push(video)
  }
}

function removeFromLiked(videoId) {
  videosFavs.value = videosFavs.value.filter(v => v.id.videoId !== videoId)
}

// === FILTRO POR FECHA ===
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

const videosAMostrar = computed(() => videosFiltrados.value)
const fechaSeleccionada = computed(() => selectedRange.value.start && selectedRange.value.end)

function limpiarFiltro() {
  selectedRange.value = { start: null, end: null }
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 px-4 sm:px-6 lg:px-8 py-10">
    <div class="contenedor flex flex-col lg:flex-row gap-10 justify-center items-start" style="margin-top: 7%;">
      <!-- LISTA DE FAVORITOS -->
      <div class="flex-1 w-full">
        <h2 class="text-2xl font-bold mb-6 text-center lg:text-left">Mis videos favoritos</h2>
        <div v-if="videosFavs.length > 0" class="relative">
          <UCarousel
            v-slot="{ item }"
            :items="videosFavs"
            :ui="{ item: 'basis-full sm:basis-1/2 md:basis-1/3', container: 'rounded-lg' }"
            loop
            arrows
            class="w-full"
          >
            <div class="flex flex-col items-center h-full px-2 pb-4 video-item">
              <iframe
                :src="`https://www.youtube.com/embed/${item.id.videoId}`"
                frameborder="0"
                allowfullscreen
                class="rounded-lg w-full aspect-video"
              ></iframe>
              <h4 class="snippet-title text-center mt-2 font-semibold text-sm sm:text-base line-clamp-2 flex-1">
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

      <!-- CALENDARIO -->
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

    <!-- LISTA DE VIDEOS -->
    <h2 class="text-2xl font-bold mt-16 mb-6 text-center lg:text-left">
      {{ fechaSeleccionada ? 'Videos en el rango seleccionado' : 'Últimos videos de la playlist' }}
    </h2>
    
    <!-- CONTADOR DE VIDEOS -->
    <div class="text-center mb-4">
      <div v-if="!fechaSeleccionada && nextPageToken && !loading" class="text-center mt-8">
      <p class="text-gray-600 dark:text-gray-400">
        Mostrando {{ videosAMostrar.length }} videos
        <span v-if="!fechaSeleccionada" class="text-sm">
          ({{ allVideosLoaded ? 'Todos cargados' : 'Cargando más...' }})
          <UButton
            @click="cargarMasVideos"
            icon="solar:refresh-outline"
            color="primary"
            variant="solid"
            class="mx-auto text-right"
          />
        </span>
        <!-- BOTÓN PARA CARGAR MÁS VIDEOS -->
      </p>
    </div>
    </div>

    <div class="relative">
      <UCarousel
        v-slot="{ item }"
        :items="videosAMostrar"
        :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3', container: 'rounded-lg' }"
        :autoplay="videosFavs.length > 0 && !fechaSeleccionada ? { delay: 7000 } : false"
        loop
        arrows
        class="w-full mb-10"
      >
        <div class="flex flex-col items-center h-full px-2 pb-4 video-item">
          <iframe
            :src="`https://www.youtube.com/embed/${item.id.videoId}`"
            frameborder="0"
            allowfullscreen
            class="rounded-lg w-full aspect-video"
          ></iframe>
          <h2 class="snippet-title text-center mt-2 font-semibold text-base sm:text-lg line-clamp-2 flex-1">
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
              v-if="!videosFavs.some(v => v.id.videoId === item.id.videoId)"
            />
          </div>
        </div>
      </UCarousel>
      <!-- INDICADOR DE CARGA -->
      <div v-if="loading" class="text-center py-4">
        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin mx-auto" />
        <p class="text-sm text-gray-500 mt-2">Cargando más videos...</p>
      </div>

      <!-- MENSAJE CUANDO NO HAY VIDEOS -->
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

      <!-- MENSAJE CUANDO TODOS LOS VIDEOS ESTÁN CARGADOS -->
      <div v-if="!fechaSeleccionada && allVideosLoaded" class="text-center py-4">
        <p class="text-green-600 dark:text-green-400 font-medium">
          ✅ Todos los videos han sido cargados
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>