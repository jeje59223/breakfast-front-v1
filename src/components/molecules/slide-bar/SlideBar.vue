<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          :rail="true"
          :permanent="true"
          expand-on-hover
      >
        <v-list :nav="true">
          <v-list-item
              prepend-avatar="https://media.licdn.com/dms/image/C4D03AQHkPOd4XyHitw/profile-displayphoto-shrink_800_800/0/1553331581640?e=1706745600&v=beta&t=29N7NxMq0h16l-OHcV2CrD2zO6409FkzhceXl4dNHUg"
              title="Jérôme Cnockaert"
              :nav="true"
          >
          </v-list-item>
        </v-list>
        <v-list density="compact" :nav="true">
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" color="pink" @click="router.push({ name: 'home' })"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" @click="router.push({ name: 'about' })"></v-list-item>
          <v-list-item prepend-icon="mdi-food-croissant" title="Breakfast" value="users" @click="router.push({ name: 'home' })"></v-list-item>
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
