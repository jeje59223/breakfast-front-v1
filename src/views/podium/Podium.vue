<script setup lang="ts">
import { onMounted, ref } from 'vue'
import i18n from '@/i18n'
import type { User } from '@/models/user'
import Title from '@/components/atoms/title/Title.vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import Chip from '@/components/atoms/chip/Chip.vue'
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue';
import dayjs from "dayjs";

const { users } = storeToRefs(useUsersStore())
const { getUsers } = useUsersStore()

const first = ref<string>('')
const second = ref<string>('')
const third = ref<string>('')
const isUsersLoading = ref<boolean>(false)
const displayRanking = ref<boolean>(false)

function getTopNbBreakfast(users: User[]) {
  users.sort((a, b) => b.numberOfBreakFastOrganised - a.numberOfBreakFastOrganised)
  return users.slice(0, 3);
}

function getUsersSortedByBreakfast(users: User[]) {
  return users.sort((a, b) => b.numberOfBreakFastOrganised - a.numberOfBreakFastOrganised)
}

onMounted(async () => {
  try {
    isUsersLoading.value = true
    if (!users.value.length) {
      isUsersLoading.value = true
    }
    await getUsers()
    first.value = `${getTopNbBreakfast(users.value)[0].firstname} ${getTopNbBreakfast(users.value)[0].lastname.charAt(0)}`
    second.value = `${getTopNbBreakfast(users.value)[1].firstname} ${getTopNbBreakfast(users.value)[1].lastname.charAt(0)}`
    third.value = `${getTopNbBreakfast(users.value)[2].firstname} ${getTopNbBreakfast(users.value)[2].lastname.charAt(0)}`

  } catch (err) {
    console.log(err)
  } finally {
    isUsersLoading.value = false
  }
})

const headers = ref([
  {
    key: 'picture',
    title: 'Picture',
    sortable: false
  },
  {
    key: 'lastname',
    title: i18n.global.t('datatableComponent.lastName')
  },
  {
    key: 'firstname',
    title: i18n.global.t('datatableComponent.firstname')
  },
  {
    key: 'numberOfBreakFastOrganised',
    title: 'Total Breakfast'
  },
  {
    key: 'nextOrganizedBreakfastDate',
    title: i18n.global.t('datatableComponent.nextBreakfastDate')
  },
])

const itemsPerPageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: i18n.global.t('datatableComponent.dataFooter.itemsPerPageAll') }
]

const displayRankingDataTable = () => {
  displayRanking.value = !displayRanking.value
}
</script>
<template>
  <Title :text="i18n.global.t('podium.title')" />
  <div class="Top-container justify-center align-center d-flex">
    <div class="Top-container--podium" >
      <img src="@/assets/podium.png" alt="podium">
      <div class="Top-container--number-one">{{ first }}</div>
      <div class="Top-container--number-two">{{ second }}</div>
      <div class="Top-container--number-three">{{ third }}</div>
    </div>
    <v-overlay v-model="isUsersLoading" class="Top-container--is-loading">
      <v-progress-circular :size="150" color="#287F8C" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
  <div class="Top-container--ranking">
    <v-data-table
        v-if="displayRanking"
        :items="getUsersSortedByBreakfast(users)"
        :headers="headers"
        :items-per-page-options="itemsPerPageOptions"
        hover
    >
      <template v-slot:[`header.picture`]>
        PICTURE
      </template>
      <template v-slot:[`header.lastname`]="header">
        <div class="d-flex align-center">
          <p>{{ i18n.global.t('datatableComponent.lastName') }}</p>
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'lastname' && header.sortBy[0].order === 'asc'" icon="mdi-arrow-down" class="arrow-down" color="#037E8C" />
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'lastname' && header.sortBy[0].order === 'desc'" icon="mdi-arrow-up" class="arrow-up" size="x-small" color="#037E8C" />
        </div>

      </template>
      <template v-slot:[`header.firstname`]="header">
        <div class="d-flex align-center">
          <p>{{ i18n.global.t('datatableComponent.firstname') }}</p>
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'firstname' && header.sortBy[0].order === 'asc'" class="arrow-down" icon="mdi-arrow-down" color="#037E8C" />
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'firstname' && header.sortBy[0].order === 'desc'" class="arrow-up" icon="mdi-arrow-up" color="#037E8C" />
        </div>
      </template>
      <template v-slot:[`header.numberOfBreakFastOrganised`]="header">
        <div class="d-flex align-center">
          <p>TOTAL BREAKFAST</p>
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'numberOfBreakFastOrganised' && header.sortBy[0].order === 'asc'" class="arrow-down" icon="mdi-arrow-down" color="#037E8C" />
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'numberOfBreakFastOrganised' && header.sortBy[0].order === 'desc'" class="arrow-up" icon="mdi-arrow-up" color="#037E8C" />
        </div>
      </template>
      <template v-slot:[`header.nextOrganizedBreakfastDate`]="header">
        <div class="d-flex align-center">
          <p>{{ i18n.global.t('datatableComponent.nextBreakfastDate') }}</p>
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'nextOrganizedBreakfastDate' && header.sortBy[0].order === 'asc'" class="arrow-down" icon="mdi-arrow-down" color="#037E8C" />
          <v-icon v-if="header.sortBy.length > 0 && header.sortBy[0].key === 'nextOrganizedBreakfastDate' && header.sortBy[0].order === 'desc'" class="arrow-up" icon="mdi-arrow-up" color="#037E8C" />
        </div>
      </template>
      <template v-slot:[`item.picture`]="{ item }">
        <img :src="item.picture" width="40" height="40" class="datatable-user-picture"  :alt="`Avatar de ${item.firstname}`"/>
      </template>
      <template v-slot:[`item.lastname`]="{ item }">
        {{ item.lastname }}
      </template>
      <template v-slot:[`item.firstname`]="{ item }">
        {{ item.firstname }}
      </template>
      <template v-slot:[`item.numberOfBreakFastOrganised`]="{ item }">
        <Chip color="#037E8C" density="default" tnr-id="" :label="true" :text="item?.numberOfBreakFastOrganised.toString()" />
      </template>
      <template v-slot:[`item.nextOrganizedBreakfastDate`]="{ item }">
        <p>{{ item.nextOrganizedBreakfastDate ? dayjs(item.nextOrganizedBreakfastDate).format(i18n.global.t('datatableComponent.breakfastDate')) : '' }}</p>
      </template>
    </v-data-table>
  </div>
  <BottomBarActions :display-add-new-user-button="false" :display-save-button="true" :text="!displayRanking ? i18n.global.t('podium.rankingLabelButton') : 'Masquer le classement'" @save="displayRankingDataTable" />
</template>
<style lang="scss" scoped>
.Top-container {
  margin-top: 150px;
  width: 100%;
  h1 {
    position: absolute;
    top: -60px;
  }

  &--podium {
    img {
      width: 100%;
      height: 350px;
      margin-top: 50px;
    }
    display: flex;
    justify-content: center;
    position: relative;
  }

  &--number-one {
    position: absolute;
    top: 40px;
    font-size: 30px;
  }

  &--number-two {
    position: absolute;
    font-size: 30px;
    top: 100px;
    left: 5%
  }

  &--number-three {
    position: absolute;
    font-size: 30px;
    top: 130px;
    right: 5%;
  }

  &--is-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--ranking {
    justify-content: center;
    margin-left: 50px;
    margin-bottom: 80px;
    padding: 2rem;

    .datatable-user-picture {
      border-radius: 50%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
