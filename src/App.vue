<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../tests/data/user'
import SelectLanguageV2 from '@/components/molecules/select-language/SelectLanguageV2.vue'
import { onBeforeMount, watch } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

const { currentUser } = storeToRefs(useUsersStore())
const { initializeUser } = useUsersStore()
const route = useRoute()

onBeforeMount(async () => {
  initializeUser()
  if (!currentUser.value) {
    await router.push('login')
  }
})

watch(() => route.name, async () => {
  if (!currentUser.value) {
    await router.push({ name: 'login' })
  }
})
</script>

<template>
  <SelectLanguageV2 />
  <header>
    <SlideBar :user="userMoke" />
  </header>
  <RouterView />
</template>
