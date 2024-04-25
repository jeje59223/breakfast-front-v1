<script setup lang="ts">
import Button from '@/components/atoms/button/Button.vue'

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  (event: 'save'): void
}>()

const save = () => {
  emit('save')
}
</script>

<template>
<div class="Bottom-bar-actions" tnr-id="Bottom-bar-actions">
  <Button :text="props.text" color="#007f8c" @click="save" tnr-id="Bottom-bar-actions__save" />
</div>
</template>
<style scoped lang="scss">
.Bottom-bar-actions {
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: white;
  height: 60px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;

  button {
    margin: 20px;
  }
}
</style>
