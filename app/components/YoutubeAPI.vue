<template>
  <Header />

  <div class="bg-white dark:bg-zinc-900 px-4 sm:px-6 lg:px-8 py-10">
    <div class="contenedor flex flex-col lg:flex-row gap-10 justify-center items-start" style="margin-top: 7%;">
      <!-- FAVORITOS (carrusel) -->
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
            <div class="flex flex-col items-center h-full px-2 pb-4">
              <iframe
                v-if="item.videoId"
                :src="`https://www.youtube.com/embed/${item.videoId}`"
                frameborder="0"
                allowfullscreen
                class="rounded-lg w-full aspect-video"
              ></iframe>
              <h4 class="text-center mt-2 font-semibold text-sm sm:text-base line-clamp-2 flex-1">
                {{ item.title }}
              </h4>
              <UButton
                @click="removeFromLiked(item.videoId)"
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

      <!-- PANEL CALENDARIO + FILTRO -->
      <div class="w-full lg:w-80 flex justify-center lg:justify-start">
        <UCollapsible :unmount-on-hide="true" class="w-full">
          <UButton
            label="Búsqueda por fecha"
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

            <div v-if="selectedRange && selectedRange.start" class="mt-4 text-lg text-center">
              <p class="font-semibold">Rango de Búsqueda:</p>
              <p class="text-sm text-gray-600 dark:text-gray-400" v-if="selectedRange.start && selectedRange.end">
                {{ displayRangeText }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400" v-else-if="selectedRange.start">
                {{ displaySingleDateText }}
              </p>

              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Buscando en títulos y descripciones...
              </p>

              <div class="flex gap-2 justify-center mt-2">
                <UButton @click="limpiarFiltro" label="Limpiar filtro" color="gray" variant="outline" size="sm" />
                <UButton @click="applyFilterNow" label="Aplicar ahora" color="primary" variant="solid" size="sm" />
              </div>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>

    <!-- TITULO DE LISTA -->
    <h2 class="text-2xl font-bold mt-16 mb-6 text-center lg:text-left">
      {{ fechaSeleccionada ? `Videos con fechas: ${displayRangeTextShort}` : 'Últimos videos' }}
    </h2>

    <!-- Mensajes de estado -->
    <div v-if="loading" class="text-center py-8 text-gray-600">
      Cargando videos...
    </div>
    <div v-if="errorMessage" class="text-center py-6 text-red-600">
      <p class="font-semibold">Error cargando videos</p>
      <p class="text-sm mt-2">{{ errorMessage }}</p>
      <p class="text-xs text-gray-500 mt-2">Revisa la consola de red (Network) y la consola (Console) para más detalles.</p>
    </div>

    <!-- CARRUSEL PRINCIPAL (videos a mostrar) -->
    <div v-if="!loading && !errorMessage" class="relative">
      <UCarousel
        v-slot="{ item }"
        :items="videosAMostrar"
        :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3', container: 'rounded-lg' }"
        :autoplay="videosFavs.length > 0 && !fechaSeleccionada ? { delay: 7000 } : false"
        arrows
        class="w-full mb-10"
      >
        <div class="flex flex-col items-center h-full px-2 pb-4">
          <iframe
            v-if="item.videoId"
            :src="`https://www.youtube.com/embed/${item.videoId}`"
            frameborder="0"
            allowfullscreen
            class="rounded-lg w-full aspect-video"
          ></iframe>
          <h2 class="text-center mt-2 font-semibold text-base sm:text-lg line-clamp-2 flex-1">
            {{ item.title }}
          </h2>
          <h4 class="text-center mt-2 text-sm font-medium text-gray-600 dark:text-gray-300 line-clamp-3">
            {{ item.description }}
            <span class="block text-xs text-gray-400 mt-1">
              {{ item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '' }}
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

      <!-- MENSAJE CUANDO HAY FILTRO Y NO HAY RESULTADOS -->
      <div v-if="fechaSeleccionada && videosFiltrados.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        <UIcon name="i-heroicons-video-camera" class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p class="text-lg">No hay videos con "{{ displayRangeTextShort }}"</p>
        <p class="text-sm mt-2">No se encontraron videos que contengan estas fechas en el título o descripción</p>
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

  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

/* CONFIG */
const API_KEY = 'AIzaSyA55uPtx2GjqEDXI_Q5Tb1Bub5sIRbX6kM' // verifica restricciones en Google Cloud Console
const PLAYLIST_ID = 'PL3QddupNykEEVwN8xuFGWr7U1n4St8y_w'
const MAX_RESULTS = 50
const CACHE_KEY = 'playlistVideos_v2'
const CACHE_TIME_KEY = 'playlistVideosTime_v2'
const CACHE_TTL = 12 * 60 * 60 * 1000 // 12h

/* REACTIVES */
const videos = ref([])
const videosFavs = ref([])
const selectedRange = ref({ start: null, end: null })
const displaySelectionApplied = ref(false)
const searchQuery = ref('')
const loading = ref(false)
const errorMessage = ref('')

/* MESES */
const monthNames = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre'
]

/* UTILIDADES */
const normalizarTexto = (txt='') => txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()

function toDate(obj) {
  return new Date(obj.year, obj.month - 1, obj.day)
}

function formatForDisplay(obj) {
  const d = toDate(obj)
  const day = String(d.getDate()).padStart(2,'0')
  const month = monthNames[d.getMonth()]
  const year = d.getFullYear()
  return `${day} de ${month} de ${year}`
}

/* MAPEADO: convierte items de la API a un formato simple */
function mapPlaylistItem(item) {
  // Prefer contentDetails.videoId si viene (a veces está ahí), sino snippet.resourceId.videoId
  const videoId =
    item?.contentDetails?.videoId ||
    item?.snippet?.resourceId?.videoId ||
    // en casos raros (otros endpoints) puede estar en item.id.videoId
    item?.id?.videoId ||
    null

  return {
    videoId,
    title: item?.snippet?.title || '',
    description: item?.snippet?.description || '',
    publishedAt: item?.snippet?.publishedAt || item?.contentDetails?.videoPublishedAt || null,
    raw: item // guardar el raw por si lo necesitas
  }
}

/* CACHE + FETCH (paginado robusto) */
async function fetchPlaylistVideosWithCache() {
  loading.value = true
  errorMessage.value = ''
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY)
    const now = Date.now()
    if (cached && cachedTime && (now - Number(cachedTime) < CACHE_TTL)) {
      videos.value = JSON.parse(cached)
      loading.value = false
      return
    }

    let nextPageToken = ''
    const all = []
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
      const res = await fetch(url)
      const data = await res.json()
      // LOG completo para depuración — revisa la consola (Console) y la pestaña Network
      console.log('YouTube API response page:', { url, data })

      if (data.error) {
        // manejo de errores de la API
        const reason = data.error?.message || JSON.stringify(data.error)
        errorMessage.value = `YouTube API Error: ${reason}`
        loading.value = false
        return
      }

      if (data.items && data.items.length > 0) {
        // mapear y agregar sólo los items con videoId válido
        const mapped = data.items.map(mapPlaylistItem).filter(i => i.videoId)
        all.push(...mapped)
      }
      nextPageToken = data.nextPageToken || ''
    } while (nextPageToken)

    if (all.length === 0) {
      // posible causa: playlist vacía, playlist privada o key inválida/restringida
      errorMessage.value = 'La playlist no contiene videos accesibles o la API key/playlist es privada. Revisa la consola de red.'
    }

    videos.value = all
    localStorage.setItem(CACHE_KEY, JSON.stringify(all))
    localStorage.setItem(CACHE_TIME_KEY, String(Date.now()))
  } catch(err) {
    console.error('Error fetching playlist:', err)
    errorMessage.value = `Error de red: ${err.message || err}`
  } finally {
    loading.value = false
  }
}

/* FAVORITOS */
const FAVORITES_KEY = 'videosFavoritos_v2'
function loadFavorites() {
  const s = localStorage.getItem(FAVORITES_KEY)
  if (s) videosFavs.value = JSON.parse(s)
}
function saveFavorites() { localStorage.setItem(FAVORITES_KEY, JSON.stringify(videosFavs.value)) }
function agregarListaFav(item) {
  // item puede venir ya mapeado (con videoId) o puede ser el raw — soportamos ambos
  const videoId = item.videoId || item?.snippet?.resourceId?.videoId || item?.contentDetails?.videoId || null
  if (!videoId) return
  if (!videosFavs.value.some(v => v.videoId === videoId)) {
    // guardamos el objeto mapeado para simplificar
    const normalized = item.videoId ? item : mapPlaylistItem(item)
    videosFavs.value.push(normalized)
    saveFavorites()
  }
}
function removeFromLiked(videoId) {
  videosFavs.value = videosFavs.value.filter(v => v.videoId !== videoId)
  saveFavorites()
}

/* FILTRADO (usa videos mapeados) */
const videosFiltrados = computed(() => {
  if (!selectedRange.value.start || !selectedRange.value.end) return videos.value

  let start = toDate(selectedRange.value.start)
  let end = toDate(selectedRange.value.end)
  if (end < start) [start, end] = [end, start]
  start.setHours(0,0,0,0)
  end.setHours(23,59,59,999)

  const months = {
    enero:0,febrero:1,marzo:2,abril:3,
    mayo:4,junio:5,julio:6,agosto:7,
    septiembre:8,setiembre:8,octubre:9,noviembre:10,diciembre:11
  }

  return videos.value.filter(v => {
    const t = normalizarTexto(v.title || '')
    const d = normalizarTexto(v.description || '')
    const regex = /(\d{1,2}) de (\w+) (\d{4})/i
    let matchT = (v.title || '').match(regex)
    let matchD = (v.description || '').match(regex)
    let videoDate = null

    if (matchT) {
      const day = parseInt(matchT[1])
      const month = months[matchT[2].toLowerCase()]
      const year = parseInt(matchT[3])
      videoDate = new Date(year, month, day)
    } else if (matchD) {
      const day = parseInt(matchD[1])
      const month = months[matchD[2].toLowerCase()]
      const year = parseInt(matchD[3])
      videoDate = new Date(year, month, day)
    } else return false

    return videoDate >= start && videoDate <= end
  })
})

const displayFilterActive = computed(() => !!selectedRange.value.start)
const videosAMostrar = computed(() => displayFilterActive.value ? videosFiltrados.value : videos.value)

const fechaSeleccionada = computed(() => !!selectedRange.value.start)
const displaySingleDateText = computed(() => selectedRange.value.start ? formatForDisplay(selectedRange.value.start) : '')
const displayRangeText = computed(() => selectedRange.value.start && selectedRange.value.end ? `${formatForDisplay(selectedRange.value.start)} – ${formatForDisplay(selectedRange.value.end)}` : formatForDisplay(selectedRange.value.start))
const displayRangeTextShort = computed(() => displayRangeText)

/* ACCIONES UI */
function limpiarFiltro() {
  selectedRange.value = { start: null, end: null }
  displaySelectionApplied.value = false
}
function applyFilterNow() {
  displaySelectionApplied.value = true
}

/* SIDE EFFECTS */
onMounted(async () => {
  loadFavorites()
  await fetchPlaylistVideosWithCache()
})
</script>

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

.contenedor {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
