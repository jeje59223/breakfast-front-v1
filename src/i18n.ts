import { createI18n } from 'vue-i18n'
import en from './locales/en.ts'
import fr from './locales/fr.ts'

const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    messages: {
        en,
        fr,
    },
});

export default i18n;
