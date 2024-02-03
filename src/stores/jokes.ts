import {computed, ref, UnwrapRef} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Joke } from '@/models/joke'

export const useJokesStore = defineStore('joke', () => {
    const randomJoke = ref()

    const getRandomJoke = async (lang: Ref<UnwrapRef<string>>): Promise<void> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const getJoke = await axios.get(`https://v2.jokeapi.dev/joke/Any?lang=${lang}`)
            randomJoke.value = await getJoke.data
        } catch (err) {
            throw err;
        }

    }

    const joke: Joke = computed(() => randomJoke);

    return {
        joke: joke,
        getRandomJoke
}

})
