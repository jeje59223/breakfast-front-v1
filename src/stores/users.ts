import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { ref } from 'vue'
import { fakeUsers2 } from '../../tests/data/user'
import { computed } from 'vue'
import axios from 'axios'

export const useUsersStore = defineStore('users', () => {
    const currentUser = ref<User>()
    const users = ref<User[]>([])

    const getUsers = () => {
        users.value = fakeUsers2
    }

    const getCurrentUser = async (ldap: string, password: string) => {

        if (users.value) {
            currentUser.value = await users.value.find(user => (user.login.username === ldap && user.login.password === password))
        }
    }

    const userConnected = computed(() => currentUser.value)

    return {
        getUsers,
        getCurrentUser,
        currentUser,
        users,
        userConnected
    }
})
