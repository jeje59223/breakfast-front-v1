<script setup lang="ts">
import { RouterView } from 'vue-router'
import SlideBar from '@/components/molecules/slide-bar/SlideBar.vue'
import { userMoke } from '../tests/data/user'
import SelectLanguageV2 from '@/components/molecules/select-language/SelectLanguageV2.vue'
</script>

<template>
  <SelectLanguageV2 />
  <header>
    <SlideBar :user="userMoke" />
  </header>
  <RouterView />
</template>
