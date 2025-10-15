<template>
<Header />

<div class="p-10 mt-20">
    <h1 class="text-2xl font-bold mb-6 text-center lg:text-left">Prueba Filtro</h1>

    <!-- Campo de búsqueda -->
    <input
    v-model="searchQuery"
    type="text"
    placeholder="Buscar video..."
    class="border rounded p-2 w-full mb-4 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
    />

    <!-- Lista de videos filtrados -->
    <ul v-if="filteredVideos.length > 0">
    <li
        v-for="(video, index) in filteredVideos"
        :key="index"
        class="mb-2 p-2 border-b border-gray-300"
    >
        🎬 {{ video.snippet.title }}
    </li>
    </ul>

    <p v-else class="text-gray-500 text-center">No se encontraron videos</p>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// === CONFIGURACIÓN ===
const API_KEY = 'AIzaSyA55uPtx2GjqEDXI_Q5Tb1Bub5sIRbX6kM' // Clave API
const PLAYLIST_ID = 'PL3QddupNykEEVwN8xuFGWr7U1n4St8y_w' // ID de la playlist
const MAX_RESULTS = 50 // Máximo por solicitud

const videos = ref([])
const searchQuery = ref('') // texto de búsqueda

// Función para obtener videos
const fetchVideos = async () => {
try {
    let nextPageToken = ''
    let allVideos = []

    do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}&pageToken=${nextPageToken}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.items) allVideos = allVideos.concat(data.items)
    nextPageToken = data.nextPageToken || ''
    } while (nextPageToken)

    videos.value = allVideos
} catch (error) {
    console.error('Error al obtener los videos:', error)
}
}

// Computed: filtra según el texto del input
const filteredVideos = computed(() => {
if (!searchQuery.value) return videos.value
return videos.value.filter(video =>
    video.snippet.title.toLowerCase().includes(searchQuery.value.toLowerCase())
)
})

// Ejecutar al montar
onMounted(fetchVideos)
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
</style>