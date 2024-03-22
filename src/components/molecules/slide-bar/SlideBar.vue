<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/models/user'
import i18n from "@/i18n";

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
              prepend-avatar="src/assets/jc.jpeg"
              :title="getFullName()"
              :nav="true"
              tnr-id="slide-bar-user-fullname"
          >
          </v-list-item>
        </v-list>
        <v-list density="compact" :nav="true" tnr-id="slide-bar-navigation">
          <v-list-item prepend-icon="mdi-home" :title="i18n.global.t('slideBarComponent.home')" value="home" color="#007f8c" tnr-id="slide-bar-home" @click="router.push({ name: 'home' })"></v-list-item>
          <v-divider class="mb-12"></v-divider>
          <v-list-item prepend-icon="mdi-account" :title="i18n.global.t('slideBarComponent.myAccount')" value="account" color="#007f8c" tnr-id="slide-bar-account" @click="router.push({ name: 'account' })"></v-list-item>
          <v-list-item prepend-icon="mdi-food-croissant" :title="i18n.global.t('slideBarComponent.breakfast')" value="users" color="#007f8c" tnr-id="slide-bar-breakfast" @click="router.push({ name: 'breakfast' })"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div>
            <v-list density="compact" :nav="true">
              <v-list-item prepend-icon="mdi-logout-variant" :title="i18n.global.t('slideBarComponent.logout')" value="logout" @click="router.push({ name: 'login' })"></v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
