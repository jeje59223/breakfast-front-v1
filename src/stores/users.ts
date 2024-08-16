import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { ref } from 'vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import router from '@/router'

export const useUsersStore = defineStore('users', () => {
    const currentUser = ref<User>()
    const users = ref<User[]>([])
    const userByLdap = ref<User>()

    const initializeUser = () => {
        const storedUser = sessionStorage.getItem('currentUser')
        if (storedUser) {
            currentUser.value = JSON.parse(storedUser)
        }
    }

    const getUsers = async () => {
        try {
            const getCollaborators = await axios.get('/api/users/all?page=0&size=30&sort=string');
            users.value = getCollaborators.data.content
        } catch (err) {
            console.error('ERROR', err)
            throw new Error(err)
        }
    }

    const getCurrentUser = async (ldap: string, password: string) => {
        if (!currentUser.value) {
            try {
                await useAuthStore().login({
                    username: ldap,
                    password: password
                })
            } catch (err) {
                throw new Error('Login Error', err)
            }

            try {
                const getCollaborators = await axios.get('/api/users/all?page=0&size=30&sort=string')
                users.value = await getCollaborators.data.content
            } catch (err) {
                throw new Error('Get users error', err)
            }

            if (users.value) {
                currentUser.value = users.value.find(user => (user.login.username === ldap))
                const check = bcrypt.compare(password, currentUser.value?.login.password)
                if (check) {
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser.value))
                    await router.push({ name: 'home' })
                }
            }
        } else {
            await router.push({ name: 'home' })
        }
    }

    const getUserByLdap = async (ldap: string) => {
        try {
            const result = await axios.get(`/api/users/${ldap}`)
            userByLdap.value = result.data
        } catch (err) {
            throw new Error('Get user by LDAP error', err)
        }
    }

    const updateUser = async (ldap: string, userData: User) => {
        try {
            const response = await axios.patch(`/api/users/${ldap}`, userData)
            return response.data
        } catch (err) {
            console.error('Update user error', err)
            throw err
        }
    }

    const addNewUser = async (newUser: User) => {
        try {
            const response = await axios.post('/api/users', newUser)
            return response.data
        } catch (err) {
            console.error('Update user error', err)
            throw err
        }
    }

    const deleteUser = async (ldap: string) => {
        try {
            const response = await axios.delete(`/api/users/${ldap}`)
            return response.data
        } catch (err) {
            console.error('Delete user error', err)
            throw err
        }
    }

    const userConnected = computed(() => currentUser.value)
    const currentUserByLdap = computed(() => userByLdap.value)

    return {
        initializeUser,
        getUsers,
        getCurrentUser,
        getUserByLdap,
        updateUser,
        addNewUser,
        deleteUser,
        currentUser,
        users,
        userConnected,
        userByLdap,
        currentUserByLdap
    }
})
