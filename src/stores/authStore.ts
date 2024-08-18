import { defineStore } from 'pinia';
import AuthService from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),
    actions: {
        async login(user) {
            // eslint-disable-next-line no-useless-catch
            try {
                await AuthService.login(user);
                this.loggedIn = true;
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            await AuthService.logout()
        }
    }
});
