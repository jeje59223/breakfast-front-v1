import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { computed, createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import fr from 'vuetify/lib/locale/fr'
import { en } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import { useLocaleStore } from '@/stores/locale'

const app = createApp(App)

app.use(createPinia())

const { currentLocale } = storeToRefs(useLocaleStore())

const languageSelected = computed(() => currentLocale.value)

const vuetify = createVuetify({
    locale: {
        locale: languageSelected,
        fallback: languageSelected,
        messages: { fr, en },
    },
    components,
    directives,
})

app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
