<script setup lang="ts">
import DataTable from '@/components/organisms/data-table/DataTable.vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { onBeforeMount } from 'vue'

const { users } = storeToRefs(useUsersStore())
const { getUsers } = useUsersStore()

onBeforeMount(async () => {
  await getUsers()
})


</script>

<template>
  <div class="breakfast-page" tnr-id="breakfast-page">
    <DataTable :users="users" />
  </div>
</template>

<style>
.breakfast-page {
  margin-left: 50px;
  margin-top: 80px;
}
</style>
