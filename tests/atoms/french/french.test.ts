import { describe, it, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils'
import French from '../../../src/components/atoms/french/French.vue'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('French is selected', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(French, {
            global: {
                plugins: [vuetify],
            },
            props: {
                isSelected: true
            }
        })
    })

    it('Should render an French component correctly when this lang is selected', () => {
        const french = wrapper.find('[tnr-id="French"]')
        const frenchSelected = wrapper.find('[tnr-id="French__selected"]')
        const frenchSelectedClass = wrapper.find('.French__flag')
        const frenchNotSelectedClass = wrapper.find('.French__flag__is-not-selected')
        const frenchFlag = wrapper.find('[tnr-id="French__flag"]')

        expect(french.exists()).toBeTruthy()
        expect(frenchSelected.exists()).toBeTruthy()
        expect(frenchSelected.text()).toBe('FR')
        expect(frenchFlag.exists()).toBeTruthy()
        expect(frenchSelectedClass.exists()).toBeTruthy()
        expect(frenchNotSelectedClass.exists()).toBeFalsy()
    })
})

describe('French is not selected', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(French, {
            global: {
                plugins: [vuetify],
            },
            props: {
                isSelected: false
            }
        })
    })

    it('Should render an English component correctly when this lang is not selected', () => {
        const frenchSelectedClass = wrapper.find('.French__flag')
        const frenchNotSelectedClass = wrapper.find('.French__flag__is-not-selected')

        expect(frenchSelectedClass.exists()).toBeFalsy()
        expect(frenchNotSelectedClass.exists()).toBeTruthy()
    })
})
