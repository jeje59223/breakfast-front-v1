import { describe, it, expect, beforeEach } from 'vitest'
import { setupI18n } from '../../setup-i18n'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import HomePage from "../../../src/views/home-page/HomePage.vue"
import { jokeMock } from "../../mocks/joke/joke"
import { vi } from 'vitest'
import { createApp, nextTick } from "vue"

const vuetify = createVuetify({
    components,
    directives,
})

const i18n = setupI18n();

global.ResizeObserver = require('resize-observer-polyfill')

vi.mock('@/stores/jokes', () => ({
    useJokesStore: vi.fn(() => ({
        joke: { setup: jokeMock.setup, delivery: jokeMock.delivery },
        getRandomJoke: vi.fn(),
    })),
}))

describe('HomePage', () => {
    const app = createApp(HomePage)
    let wrapper = mount(app)

    beforeEach(() => {
        wrapper = mount(HomePage, {
            i18n,
            global: {
                plugins: [vuetify],
            },
        })
    })

    it('should render HomePage component ', async () => {
        const home = wrapper.find('[tnr-id="home-page"]')

        expect(home.exists()).toBeTruthy()
    })

    it('should display title with good text', () => {
        const title = wrapper.find('[tnr-id="home-page-title"]')

        expect(title.exists()).toBeTruthy()
        expect(title.text()).toBe('Bienvenue sur l\'application Petit-Déjeuner')
    })

    it('should display question title with good text', () => {
        const questionTitle = wrapper.find('[tnr-id="home-page-joke-container-title"]')

        expect(questionTitle.exists()).toBeTruthy()
        expect(questionTitle.text()).toBe('Blague du jour !')
    })

    it('should display question joke with good text', ()=> {
        const question = wrapper.find('[tnr-id="home-page-joke-container-question"]')

        expect(question.exists()).toBeTruthy()
        expect(question.text()).toBe('Que dit-on à quelqu\'un de triste qui joue aux jeux vidéos?')
    })

    it('should display response when click on button', async () => {
        const btn = wrapper.find('[tnr-id="home-page-joke-container-button"]')
        await btn.trigger('click')

        const response = wrapper.find('[tnr-id="home-page-joke-container-response-text"]')
        await nextTick()

        expect(btn.exists()).toBeTruthy()
        expect(response.text()).toBe('On dit qu\'il se console!')
    })
})
