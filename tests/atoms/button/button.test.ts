import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Button from '../../../src/components/atoms/button/Button.vue'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Button without icon', () => {
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

describe('Button with left icon', () => {
    const wrapper = mount(Button, {
        global: {
            plugins: [vuetify],
        },
        props: {
            tnrId: 'the-tnr-id',
            text: 'The button label',
            withIcon: true,
            leftIcon: true,
            icon: 'icon'
        }
    });

    it('renders Button component', () => {
        const leftIcon = wrapper.find('[tnr-id="icon-left"]')
        expect(leftIcon.exists()).toBeTruthy();
    });
});

describe('Button with right icon', () => {
    const wrapper = mount(Button, {
        global: {
            plugins: [vuetify],
        },
        props: {
            tnrId: 'the-tnr-id',
            text: 'The button label',
            withIcon: true,
            rightIcon: true,
            icon: 'icon'
        }
    });

    it('renders Button component', () => {
        const rightIcon = wrapper.find('[tnr-id="icon-right"]')
        expect(rightIcon.exists()).toBeTruthy();
    });
});
