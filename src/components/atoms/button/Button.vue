<script setup lang="ts">
defineProps<{
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  color?: string
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  text: string
  withIcon?: boolean
  leftIcon?: boolean
  rightIcon?: boolean
  icon?: string
  tnrId?: string
}>();
</script>

<template>
  <v-btn
      :variant="variant"
      :color="color"
      :size="size"
      :tnr-id="tnrId"
      class="v-theme--dark"
  >
    <v-icon v-if="withIcon && leftIcon"
            :start="true"
            :icon="icon"
    ></v-icon>
    {{text}}
    <v-icon v-if="withIcon && rightIcon"
            :end="true"
            :icon="icon"
    ></v-icon>
  </v-btn>
</template>

<style lang="scss" scoped>

</style>
