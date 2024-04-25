import { describe, it, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils'
import English from '../../../src/components/atoms/english/English.vue'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('English is selected', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(English, {
            global: {
                plugins: [vuetify],
            },
            props: {
                isSelected: true
            }
        })
    })

    it('Should render an English component correctly when this lang is selected', () => {
        const english = wrapper.find('[tnr-id="English"]')
        const englishSelected = wrapper.find('[tnr-id="English__selected"]')
        const englishSelectedClass = wrapper.find('.English__flag')
        const englishNotSelectedClass = wrapper.find('.English__flag__is-not-selected')
        const englishFlag = wrapper.find('[tnr-id="English__flag"]')

        expect(english.exists()).toBeTruthy()
        expect(englishSelected.exists()).toBeTruthy()
        expect(englishSelected.text()).toBe('EN')
        expect(englishFlag.exists()).toBeTruthy()
        expect(englishSelectedClass.exists()).toBeTruthy()
        expect(englishNotSelectedClass.exists()).toBeFalsy()
    })
})

describe('English is not selected', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(English, {
            global: {
                plugins: [vuetify],
            },
            props: {
                isSelected: false
            }
        })
    })

    it('Should render an English component correctly when this lang is not selected', () => {
        const englishSelectedClass = wrapper.find('.English__flag')
        const englishNotSelectedClass = wrapper.find('.English__flag__is-not-selected')

        expect(englishSelectedClass.exists()).toBeFalsy()
        expect(englishNotSelectedClass.exists()).toBeTruthy()
    })
})
