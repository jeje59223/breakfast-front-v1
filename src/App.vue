<script setup lang="ts">
import { RouterView } from 'vue-router'
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../tests/data/user'
import SelectLanguage from "@/components/molecules/select-language/SelectLanguage.vue"
</script>

<template>
  <SelectLanguage />
  <header>
    <SlideBar :user="userMoke" />
  </header>
  <RouterView />
</template>
