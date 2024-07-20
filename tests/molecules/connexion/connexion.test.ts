import { describe, it, expect, beforeEach, Mock, vi, beforeAll } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils'
import Connexion from '../../../src/components/molecules/connexion/Connexion.vue'
import { setupI18n } from '../../setup-i18n'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { useLocaleStore } from '../../../src/stores/locale'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
import { fakeUsers2 } from '../../data/user'

vi.mock('vue-router')
const vuetify = createVuetify({
    components,
    directives,
})

const i18n = setupI18n()
const mockedUseRoute = useRoute as Mock

global.ResizeObserver = require('resize-observer-polyfill')

describe('Connexion', () => {
    beforeAll(() => {
        setActivePinia(createPinia())
    })

    let wrapper: VueWrapper
    let vm: any
    const name = 'account'

    mockedUseRoute.mockReturnValue({
        query: {
            name,
        },
    })

    beforeEach(() => {
        wrapper = mount(Connexion, {
            i18n,
            global: {
                plugins: [vuetify, createTestingPinia()],
            },
        }) as VueWrapper
        vm = wrapper.vm as any
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

    it('should call loginCurrentUser on submit button click', async function () {
        const ldapField = wrapper.find('[tnr-id="connexion-card-ldap-field"]');
        const passwordField = wrapper.find('[tnr-id="connexion-card-password-field"]');
        const submitButton = wrapper.find('[tnr-id="connexion-card-submit-button"]');

        const pseudoTest = '10009628';
        const pwsTest = '12345';

        const loginCurrentUserMock = vi.fn().mockResolvedValue(fakeUsers2[0]);
        // @ts-ignore eslint-disable-line
        wrapper.vm.loginCurrentUser = loginCurrentUserMock;

        await ldapField.setValue(pseudoTest);
        await passwordField.setValue(pwsTest);

        await submitButton.trigger('click');

        expect(loginCurrentUserMock).toHaveBeenCalledWith(pseudoTest, pwsTest);
    })
})
