import { test, expect, describe, beforeAll } from 'vitest'
import { useLocaleStore } from '../../src/stores/locale'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'

describe('useLocaleStore', () => {

    beforeAll(() => {
        setActivePinia(createPinia())
    })

    test('setCurrentLocale change a locale', async () => {
        const { setCurrentLocale } = useLocaleStore()
        const { currentLocale } = storeToRefs(useLocaleStore())

        await nextTick()
        await flushPromises()

        expect(currentLocale.value).toBe('fr')

        await setCurrentLocale('en')

        await nextTick()
        await flushPromises()

        expect(currentLocale.value).toBe('en')
    })
})
