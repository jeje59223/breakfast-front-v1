import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Chip from "../../../src/components/atoms/chip/Chip.vue"

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Chip', () => {
    const wrapper = mount(Chip, {
        global: {
            plugins: [vuetify],
        },
        props: {
            text: 'The Chip text',
            color: 'red',
            density: 'default',
            label: true,
            tnrId: 'chip-tnr-id'
        }
    });

    it('should render Chip component', () => {
        const chip = wrapper.find('[tnr-id="chip-tnr-id"]')

        expect(chip.exists()).toBeTruthy()
    })
})
