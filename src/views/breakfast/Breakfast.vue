<script setup lang="ts">
import DataTable from '@/components/organisms/data-table/DataTable.vue';
import { fakeUsers2 } from '../../../tests/data/user';
</script>

<template>
  <div class="breakfast-page" tnr-id="breakfast-page">
    <DataTable :users="fakeUsers2" />
  </div>
</template>

<style>
.breakfast-page {
  margin-top: 80px;
}
</style>
