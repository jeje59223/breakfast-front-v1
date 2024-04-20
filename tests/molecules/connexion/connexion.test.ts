import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import Connexion from '../../../src/components/molecules/connexion/Connexion.vue'
import { setupI18n } from '../../setup-i18n'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '../../../src/stores/locale'
import { createTestingPinia } from '@pinia/testing'

const vuetify = createVuetify({
    components,
    directives,
})

const i18n = setupI18n()

global.ResizeObserver = require('resize-observer-polyfill')

describe('Connexion', () => {
    const wrapper = mount(Connexion, {
        i18n,
        global: {
            plugins: [vuetify, createTestingPinia()],
        },
    })

    it('should render correctly Connexion component', function () {
        const { currentLocale } = storeToRefs(useLocaleStore())
        currentLocale.value = 'fr'

        const connexion = wrapper.find('[tnr-id="connexion-card"]')
        const ldapField = wrapper.find('[tnr-id="connexion-card-ldap-field"]')
        const passwordField = wrapper.find('[tnr-id="connexion-card-password-field"]')
        const forgotPassword = wrapper.find('[tnr-id="connexion-card-forgot-password-link"]')
        const submitButton = wrapper.find('[tnr-id="connexion-card-submit-button"]')
        const createAccount = wrapper.find('[tnr-id="connexion-card-create-account-link"]')

        expect(connexion.exists()).toBeTruthy()
        expect(ldapField.exists()).toBeTruthy()
        expect(passwordField.exists()).toBeTruthy()
        expect(forgotPassword.exists()).toBeTruthy()
        expect(submitButton.exists()).toBeTruthy()
        expect(createAccount.exists()).toBeTruthy()
    });
})
