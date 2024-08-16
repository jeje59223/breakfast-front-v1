import { describe, it, expect, vi, Mock, beforeEach } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SlideBar from '../../../src/components/molecules/slide-bar/SlideBar.vue'
import { fakeUsers2 } from '../../data/user'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../../../src/stores/users';
import { nextTick } from 'vue'

vi.mock('vue-router')

const vuetify = createVuetify({
    components,
    directives,
})

const mockedUseRoute = useRoute as Mock

global.ResizeObserver = require('resize-observer-polyfill')

describe('SlideBar', () => {
    let wrapper: VueWrapper
    const name = 'breakfast'

    mockedUseRoute.mockReturnValue({
        query: {
            name,
        },
    })

    beforeEach(() => {
        wrapper = mount(SlideBar, {
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
        }) as VueWrapper

        const { currentUser } = storeToRefs(useUsersStore())
        currentUser.value = fakeUsers2[0]
    })

    it('should return correctly the component SlideBar if the user has no picture', async () => {

        const slideBarComponent = wrapper.find('[tnr-id="slide-bar"]')

        const slideBarFullName = wrapper.find('[tnr-id="slide-bar-user-fullname"]')
        const noPicture = wrapper.find('[tnr-id="SlideBar__no-picture-container"]')

        const notConnected = wrapper.find('[tnr-id="slideBar__not-connected"]')

        const slideBarNavigation = wrapper.find('[tnr-id="slide-bar-navigation"]')
        const slideBarHome = wrapper.find('[tnr-id="slide-bar-home"]')
        const slideBarAccount = wrapper.find('[tnr-id="slide-bar-account"]')
        const slideBarBreakfast = wrapper.find('[tnr-id="slide-bar-breakfast"]')

        await nextTick()
        await flushPromises()

        expect(slideBarComponent.exists()).toBeTruthy()

        expect(slideBarFullName.exists()).toBeFalsy()
        expect(noPicture.exists()).toBeTruthy()
        expect(noPicture.text()).toBe('JJérôme Cnockaert')
        expect(notConnected.exists()).toBeFalsy()

        expect(slideBarNavigation.exists()).toBeTruthy()
        expect(slideBarHome.exists()).toBeTruthy()
        expect(slideBarAccount.exists()).toBeTruthy()
        expect(slideBarBreakfast.exists()).toBeTruthy()
    })
})

describe('SlideBar with an user has picture', () => {
    let localWrapper: VueWrapper
    beforeEach(() => {
        localWrapper = mount(SlideBar, {
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
        }) as VueWrapper

        const { currentUser } = storeToRefs(useUsersStore())
        currentUser.value = fakeUsers2[1]
    })

    it('should return correctly the component SlideBar if the user has a picture', ()=> {
        const slideBarFullName = localWrapper.find('[tnr-id="slide-bar-user-fullname"]')
        const noPicture = localWrapper.find('[tnr-id="SlideBar__no-picture-container"]')
        const notConnected = localWrapper.find('[tnr-id="slideBar__not-connected"]')

        expect(slideBarFullName.exists()).toBeTruthy()
        expect(slideBarFullName.text()).toBe('Sanni Korpi')
        expect(noPicture.exists()).toBeFalsy()
        expect(notConnected.exists()).toBeFalsy()
    });
})

describe('SlideBar with not connected user', () => {
    let localWrapper: VueWrapper
    beforeEach(() => {
        localWrapper = mount(SlideBar, {
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
        }) as VueWrapper

        const { currentUser } = storeToRefs(useUsersStore())
        currentUser.value = undefined
    })

    it('should return SlideBar component with not connected user', ()=> {
        const notConnectedUser = localWrapper.find('[tnr-id="SlideBar__no-connected-user"]')

        expect(notConnectedUser.exists()).toBeTruthy()
    });
})
