import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import SlideBar from "../../../src/components/molecules/slide-bar/SlideBar.vue";
import { userMoke } from "../../data/user";

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('SlideBar', () => {
    const wrapper = mount(SlideBar, {
        global: {
            plugins: [vuetify],
        },
        props: {
            user: userMoke
        }
    })

    it('should return correctly the component SlideBar', () => {
        const slideBarComponent = wrapper.find('[tnr-id="slide-bar"]')
        const slideBarFullName = wrapper.find('[tnr-id="slide-bar-user-fullname"]')
        const slideBarNavigation = wrapper.find('[tnr-id="slide-bar-navigation"]')
        const slideBarHome = wrapper.find('[tnr-id="slide-bar-home"]')
        const slideBarAccount = wrapper.find('[tnr-id="slide-bar-account"]')
        const slideBarBreakfast = wrapper.find('[tnr-id="slide-bar-breakfast"]')

        expect(slideBarComponent.exists()).toBeTruthy()
        expect(slideBarFullName.exists()).toBeTruthy()
        expect(slideBarFullName.text()).toBe('Jérôme Cnockaert')
        expect(slideBarNavigation.exists()).toBeTruthy()
        expect(slideBarHome.exists()).toBeTruthy()
        expect(slideBarAccount.exists()).toBeTruthy()
        expect(slideBarBreakfast.exists()).toBeTruthy()
    })
})
