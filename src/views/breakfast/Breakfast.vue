<script setup lang="ts">
import { fakeUsers2 } from '../../../tests/data/user';
import DataTable from '@/components/organisms/data-table/DataTable.vue'
</script>

<template>
  <div class="breakfast-page" tnr-id="breakfast-page">
    <DataTable :users="fakeUsers2" />
  </div>
</template>

<style>
.breakfast-page {
  margin-left: 50px;
  margin-top: 80px;
}
</style>
