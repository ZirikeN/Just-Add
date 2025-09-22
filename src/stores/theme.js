import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref(localStorage.getItem('theme') || 'light')

    const applyTheme = () => {
        document.documentElement.setAttribute('data-theme', currentTheme.value)
        localStorage.setItem('theme', currentTheme.value)
    }

    const toggleTheme = () => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    }

    watch(currentTheme, applyTheme, { immediate: true })

    return { currentTheme, toggleTheme, applyTheme }
})
