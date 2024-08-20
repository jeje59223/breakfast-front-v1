<script setup lang="ts">
import DataTable from '@/components/organisms/data-table/DataTable.vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { onBeforeMount, ref } from 'vue'
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'
import i18n from '@/i18n'
import router from '@/router'
import { Role, type User } from '@/models/user'
import Title from '@/components/atoms/title/Title.vue'

const { users, currentUser } = storeToRefs(useUsersStore())
const { getUsers } = useUsersStore()
const userConnected = ref<User | undefined>(currentUser.value)
const isLoading = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    if (!users.value.length) {
      isLoading.value = true
    }
    await getUsers()
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})

const saveTheNextBreakfastDate = async () => {
  await getUsers()
}
</script>

<template>
  <Title v-if="!isLoading" :text="i18n.global.t('breakfastPageComponent.title')" />
  <div class="overflow-auto breakfast-page" tnr-id="breakfast-page">
    <DataTable v-if="!isLoading" :users="users" />
    <v-overlay v-model="isLoading" class="is-loading">
      <v-progress-circular :size="150" color="#287F8C" indeterminate></v-progress-circular>
    </v-overlay>
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

<style scoped>
.breakfast-page {
  justify-content: center;
  margin-left: 50px;
  margin-bottom: 80px;
  padding: 2rem;
  margin-top: 150px;
}

.is-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
