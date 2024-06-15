import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { ref } from 'vue'
import { fakeUsers2 } from '../../tests/data/user'
import { computed } from 'vue'

export const useUsersStore = defineStore('users', () => {
    const currentUser = ref<User>()
    const users = ref<User[]>([])

    const getUsers = () => {
        users.value = fakeUsers2
    }

    const getCurrentUser = async (ldap: string | undefined, password: string | undefined) => {

        if (users.value) {
            currentUser.value = await users.value.find(user => (user.login.username === ldap && user.login.password === password))
        }
    }

    // const users = await axios.get('http://localhost:8080/users/all?page=0&size=10&sort=string');
    // console.log(users.data.content)

    const userConnected = computed(() => currentUser.value)

    return {
        getUsers,
        getCurrentUser,
        currentUser,
        users,
        userConnected
    }
})
