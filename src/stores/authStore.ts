import { defineStore } from 'pinia';
import AuthService from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),
    actions: {
        async login(user) {
            try {
                await AuthService.login(user);
                this.loggedIn = true;
            } catch (error) {
                throw error;
            }
        },
    }
});
