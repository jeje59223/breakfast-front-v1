<script setup lang="ts">
import Button from '@/components/atoms/button/Button.vue'

const props = defineProps<{
  text?: string
  addNewUserButtonText?: string
  displaySaveButton: boolean
  displayAddNewUserButton: boolean
}>()

const emit = defineEmits<{
  (event: 'save'): void
  (event: 'addNewUser'): void
}>()

const save = () => {
  emit('save')
}

const addNewUser = () => {
  emit('addNewUser')
}
</script>

<template>
<div class="Bottom-bar-actions" tnr-id="Bottom-bar-actions">
  <Button v-if="props.displaySaveButton" :text="props.text" color="#007f8c" @click="save" tnr-id="Bottom-bar-actions__save" />
  <Button v-if="props.displayAddNewUserButton" color="#007f8c" :text="props.addNewUserButtonText" @click="addNewUser" tnr-id="Bottom-bar-actions__add-new-user" />
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
