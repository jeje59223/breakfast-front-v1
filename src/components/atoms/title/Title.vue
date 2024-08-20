<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
<template>
  <h1 class="text-center mt-16 mb-4 Title-text">{{ text }}</h1>
</template>
<style lang="scss">
.Title {
  &-text {
    background: white;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 1;
  }
}
</style>
