import { defineStore } from 'pinia'

export const useColorModeStore = defineStore('colorMode', {

  state: () => ({
    isDark: false
  }),

  actions: {
    init() {
      // Cargar preferencia desde localStorage o sistema
      const saved = localStorage.getItem('theme')
      if (saved) {
        this.isDark = saved === 'dark'
      } else {
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      this.applyTheme()
    },

    toggle() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.applyTheme()
    },

    applyTheme() {
      const html = document.documentElement
      if (this.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }
})