import { computed, ref, UnwrapRef } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Joke } from '@/models/joke'

export const useJokesStore = defineStore('joke', () => {
    const randomJoke = ref<Joke>()
    const joke = ref<Joke>()
    const isLoading = ref<boolean>(false)

    const getRandomJoke = async (lang: Ref<UnwrapRef<string>>): Promise<void> => {
        try {
            isLoading.value = true
            const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?lang=${lang}`);
            randomJoke.value = response.data
        } catch (err) {
            console.error('Erreur lors de la récupération de la blague:', err)
        }
        finally {
            isLoading.value = false
        }
    }

    joke.value = computed(() => randomJoke.value);

    return {
        joke,
        isLoading,
        randomJoke,
        getRandomJoke
    }
})
