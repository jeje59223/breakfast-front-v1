<script setup lang="ts">
import { RouterView } from 'vue-router'
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../tests/data/user'
</script>

<template>
  <header>
    <SlideBar :user="userMoke" />
  </header>
  <RouterView />
</template>
