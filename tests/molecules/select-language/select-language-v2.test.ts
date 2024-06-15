import { test, expect, describe, beforeAll, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import SelectLanguageV2 from '../../../src/components/molecules/select-language/SelectLanguageV2.vue';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

describe('SelectLanguageV2', () => {
    let wrapper: VueWrapper
    let vm: any

    beforeEach(() => {
        wrapper = mount(SelectLanguageV2, {
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
        }) as VueWrapper

        vm = wrapper.vm as any
    })

    beforeAll(() => {
        setActivePinia(createPinia())
    })

    test('should have locale fr when click on french button', () => {
        const selectLanguageContainer = wrapper.find('[tnr-id="SelectLanguageContainer"]')
        const selectLanguageContainerChoice = wrapper.find('[tnr-id="SelectLanguageContainer__choice"]')
        const frenchButton = wrapper.find('[tnr-id="SelectLanguageContainer__choice_french"]')
        const englishButton = wrapper.find('[tnr-id="SelectLanguageContainer__choice_english"]')

        frenchButton.trigger('click')

        expect(selectLanguageContainer.exists()).toBeTruthy()
        expect(selectLanguageContainerChoice.exists()).toBeTruthy()
        expect(frenchButton.exists()).toBeTruthy()
        expect(englishButton.exists()).toBeTruthy()
        expect(vm.isFrenchLanguageSelected).toBeTruthy()
        expect(vm.isEnglishLanguageSelected).toBeFalsy()
    })

    test('should have locale en when click on english button', async () => {
        const englishButton = wrapper.find('[tnr-id="SelectLanguageContainer__choice_english"]')

        await englishButton.trigger('click')

        expect(vm.isFrenchLanguageSelected).toBeFalsy()
        expect(vm.isEnglishLanguageSelected).toBeTruthy()
        expect(vm.selectedLang).toBe('en')
    })
})
