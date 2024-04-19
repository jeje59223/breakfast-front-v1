import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
    const currentLocale = ref<string>('fr')

    const setCurrentLocale = (locale: string) => {
        currentLocale.value = locale
    }

    return {
        currentLocale,
        setCurrentLocale
    }
})
