import { test, expect, describe, beforeAll, vi } from 'vitest'
import axios from 'axios'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { useJokesStore } from '../../src/stores/jokes'

describe('useJokesStore', () => {

    beforeAll(() => {
        setActivePinia(createPinia())
    })

    test('Should return random joke', async () => {
        const { getRandomJoke } = useJokesStore()
        const { randomJoke, isLoading } = storeToRefs(useJokesStore())
        const lang = 'fr'
        const mockJoke = {
            category: 'Programming',
            type: 'single',
            joke: 'Why did the programmer go broke? Because he used up all his cache.',
        }

        const originalAxiosGet = axios.get;

        axios.get = vi.fn().mockResolvedValueOnce({ status: 200, data: mockJoke })

        await getRandomJoke(lang)

        expect(randomJoke.value).toEqual(mockJoke)
        expect(isLoading.value).toBe(false)

        axios.get = originalAxiosGet
    })

    test('Should handle errors when fetching the joke', async () => {
        const { getRandomJoke } = useJokesStore()
        const { isLoading } = storeToRefs(useJokesStore())
        const lang = 'fr'

        const originalAxiosGet = axios.get

        axios.get = vi.fn().mockRejectedValueOnce(new Error('Recovery error'))

        await getRandomJoke(lang)

        expect(isLoading.value).toBe(false)

        axios.get = originalAxiosGet
    });
})
