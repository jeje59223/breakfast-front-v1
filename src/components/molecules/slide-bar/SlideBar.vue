<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/models/user'

const props = defineProps<{
  user: User
}>()

const router = useRouter()

const getFullName = () => {
  return `${props.user.firstname} ${props.user.lastname}`
}

</script>

<template>
  <v-card tnr-id="slide-bar">
    <v-layout>
      <v-navigation-drawer
          :rail="true"
          :permanent="true"
          expand-on-hover
      >
        <v-list :nav="true">
          <v-list-item
              prepend-avatar="https://media.licdn.com/dms/image/C4D03AQHkPOd4XyHitw/profile-displayphoto-shrink_800_800/0/1553331581640?e=1706745600&v=beta&t=29N7NxMq0h16l-OHcV2CrD2zO6409FkzhceXl4dNHUg"
              :title="getFullName()"
              :nav="true"
              tnr-id="slide-bar-user-fullname"
          >
          </v-list-item>
        </v-list>
        <v-list density="compact" :nav="true" tnr-id="slide-bar-navigation">
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" color="#007f8c" tnr-id="slide-bar-home" @click="router.push({ name: 'home' })"></v-list-item>
          <v-divider class="mb-12"></v-divider>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" color="#007f8c" tnr-id="slide-bar-account" @click="router.push({ name: 'account' })"></v-list-item>
          <v-list-item prepend-icon="mdi-food-croissant" title="Breakfast" value="users" color="#007f8c" tnr-id="slide-bar-breakfast" @click="router.push({ name: 'breakfast' })"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div>
            <v-list density="compact" :nav="true">
              <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="router.push({ name: 'about' })"></v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
