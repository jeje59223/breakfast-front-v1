<script setup lang="ts">
defineProps<{
  color: string
  density: 'default' | 'comfortable' | 'compact'
  label: boolean
  size?: string
  prependIcon?: string
  appendIcon?: string
  text: string
  tnrId: string
}>();
</script>

<template>
  <v-chip
      :color="color"
      :density="density"
      :label="label"
      :size="size"
      :prepend-icon="prependIcon"
      :append-icon="appendIcon"
      :tnr-id="tnrId"
  >
    {{text}}
  </v-chip>
</template>
