<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import Button from '@/components/atoms/button/Button.vue'

const props = defineProps<{
  title?: string
  content?: string
  displayDialog?: boolean
}>()

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()

const localDisplayDialog = ref(props.displayDialog ?? true)

watch(() => props.displayDialog, (newVal) => {
  nextTick(() => {
    localDisplayDialog.value = newVal;
  });
})

const deleteUserByLdap = () => {
  emit('confirm')
}

const deleteCancel = () => {
  emit('cancel')
}

</script>

<template>
    <v-dialog
        v-if="localDisplayDialog"
        v-model="localDisplayDialog"
        width="auto"
        persistent
    >
      <v-card
          max-width="500"
          elevation="24"
          color="#037E8C"
          variant="outlined"
          class="delete-dialog"
      >
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-delete-outline" />
          <p class="ml-4 text-red-accent-4">{{ props.title }}</p>
        </v-card-title>
        <v-card-text class="text-black">
          {{ props.content }}
        </v-card-text>
        <v-card-actions class="d-flex justify-end mt-2">
          <Button
              text="Delete"
              variant="elevated"
              color="#037E8C"
              @click="deleteUserByLdap"
          />
          <Button
              text="Cancel"
              variant="outlined"
              @click="deleteCancel"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<style>
.delete-dialog {
  background-color: white;
  padding: 10px;
}
</style>
