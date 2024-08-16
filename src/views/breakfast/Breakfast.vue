<script setup lang="ts">
import DataTable from '@/components/organisms/data-table/DataTable.vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { onBeforeMount, ref } from 'vue'
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'
import i18n from '@/i18n'
import router from '@/router'
import { Role, type User } from '@/models/user'

const { users, currentUser } = storeToRefs(useUsersStore())
const { getUsers } = useUsersStore()
const userConnected = ref<User | undefined>(currentUser.value)

onBeforeMount(async () => {
  await getUsers()
})

const saveTheNextBreakfastDate = async () => {
  await getUsers()
}
</script>

<template>
  <h1 class="text-center mt-16 mb-4">{{ i18n.global.t('breakfastPageComponent.title') }}</h1>
  <div class="overflow-auto breakfast-page" tnr-id="breakfast-page">
    <DataTable :users="users" />
  </div>
  <BottomBarActions
      :text="i18n.global.t('breakfastPageComponent.save')"
      add-new-user-button-text="Ajouter un utilisateur"
      :display-save-button="false"
      :display-add-new-user-button="userConnected?.roles?.includes(Role.ADMIN) as boolean"
      @save="saveTheNextBreakfastDate"
      @add-new-user="router.push({ name: 'add-new-user' })"
  />
</template>

<style>
.breakfast-page {
  margin-left: 50px;
  margin-bottom: 80px;
}
</style>
