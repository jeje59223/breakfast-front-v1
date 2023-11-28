import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Button from "../atoms/button/Button.vue"

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Button', () => {
    const wrapper = mount(Button, {
        global: {
            plugins: [vuetify],
        },
        props: {
            tnrId: 'the-tnr-id',
            text: 'The button label'
        }
    });

    it('renders Button component', () => {
        const btn = wrapper.find('[tnr-id="the-tnr-id"]')
        expect(btn.exists()).toBeTruthy();
    });
});
