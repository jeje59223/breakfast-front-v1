import { describe, it, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BottomBarActions from '../../../src/components/molecules/bottom-bar-actions/BottomBarActions.vue';

const vuetify = createVuetify({
    components,
    directives,
})

describe('BottomBarActions', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(BottomBarActions, {
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
            props: {
                text: 'Save',
                displaySaveButton: true,
                displayAddNewUserButton: false
            }
        }) as VueWrapper
    })

    it('should render BottomBarActions correctly', async () => {
        const bottomBar = wrapper.find('[tnr-id="Bottom-bar-actions"]')
        const bottonBarButton = wrapper.find('[tnr-id="Bottom-bar-actions__save"]')

        await bottonBarButton.trigger('click')

        expect(bottomBar.exists()).toBeTruthy()
        expect(bottonBarButton.exists()).toBeTruthy()
        expect(bottonBarButton.text()).toBe('Save')
        expect(wrapper.emitted('save')).toBeTruthy()
    });
})
