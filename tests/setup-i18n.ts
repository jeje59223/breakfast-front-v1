import { createI18n } from 'vue-i18n'
import locales from '../src/locales/fr'

export const setupI18n = () => {
    return createI18n({
        legacy: false,
        locale: 'fr',
        locales,
    });
};
