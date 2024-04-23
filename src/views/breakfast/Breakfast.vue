<script setup lang="ts">
import DataTable from '@/components/organisms/data-table/DataTable.vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { onBeforeMount } from 'vue'
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'
import i18n from '@/i18n'

const { users } = storeToRefs(useUsersStore())
const { getUsers } = useUsersStore()

onBeforeMount(async () => {
  await getUsers()
})

const saveTheNextBreakfastDate = () => {
  console.log('SAVE')
}

</script>

<template>
  <div class="overflow-auto breakfast-page" tnr-id="breakfast-page">
    <DataTable :users="users" />
  </div>
  <BottomBarActions :text="i18n.global.t('breakfastPageComponent.save')" @save="saveTheNextBreakfastDate" />
</template>

<style>
.breakfast-page {
  margin-left: 50px;
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
