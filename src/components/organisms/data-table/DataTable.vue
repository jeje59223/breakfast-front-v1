<script setup lang="ts">
import type { User } from '@/models/user'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import dayjs from 'dayjs'
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

const props = defineProps<{
  users: User[]
}>();

const { currentLocale } = storeToRefs(useLocaleStore())
const router = useRouter()
const userId = ref<User['id']>('')
const overlay = ref<boolean>(false)
const date = ref<string | undefined>()
const usersBreak = ref(props.users)
const { currentUser } = storeToRefs(useUsersStore())
const userConnected = ref<User | undefined>(currentUser.value)

const setUserId = (id: User['id'], choice: string) => {
  if (choice === 'updateAccount') {
    router.push({ name: 'account' })
    return
  }

  overlay.value = !overlay.value
  userId.value = id
}

const headers = ref([
  {
    key: 'lastname',
    title: i18n.global.t('datatableComponent.lastName')
  },
  {
    key: 'firstname',
    title: i18n.global.t('datatableComponent.firstname')
  },
  {
    key: 'nextOrganizedBreakfastDate',
    title: i18n.global.t('datatableComponent.nextBreakfastDate')
  },
  {
    key: 'actions',
    title: i18n.global.t('datatableComponent.actions'),
    sortable: false
  }
])

const getUserId = (id: User['id'], date: string | undefined) => {
  overlay.value = !overlay.value
  return usersBreak.value.filter(user => user.id === id).map(u => ({ ...u, nbBreakfast: u.nbBreakfast++, nextOrganizedBreakfast: u.nextOrganizedBreakfastDate = date?.toString() }))
}

const allowDate = (date: Date) => {
  const nbAppearances = usersBreak.value.reduce((total, user) => {
    if (dayjs(user.nextOrganizedBreakfastDate).isSame(date, 'day')) {
      return total + 1
    } else {
      return total
    }
  }, 0)

  return nbAppearances < 2 && (dayjs(date).isSame(dayjs(), 'day') || dayjs(date).isAfter(dayjs(), 'day')) && dayjs(date).day() === 3
}

const itemsPerPageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: i18n.global.t('datatableComponent.dataFooter.itemsPerPageAll') }
]

watch(() => currentLocale.value, (newLocale) => {
  currentLocale.value = newLocale
})
</script>

<template>
  <v-data-table :items="usersBreak" :headers="headers" :items-per-page-options="itemsPerPageOptions" hover>
    <template v-slot:header.lastname="{ header }">
      {{ i18n.global.t('datatableComponent.lastName') }}
    </template>
    <template v-slot:header.firstname="{ header }">
      {{ i18n.global.t('datatableComponent.firstname') }}
    </template>
    <template v-slot:header.nextOrganizedBreakfastDate="{ header }">
      {{ i18n.global.t('datatableComponent.nextBreakfastDate') }}
    </template>
    <template v-slot:header.actions="{ header }">
      {{ i18n.global.t('datatableComponent.actions') }}
    </template>

    <template v-slot:item.lastname="{ item }">
      {{ item.lastname }}
    </template>
    <template v-slot:item.firstname="{ item }">
      {{ item.firstname }}
    </template>
    <template v-slot:item.nextOrganizedBreakfastDate="{ item }">
      {{ item.nextOrganizedBreakfastDate && dayjs(item.nextOrganizedBreakfastDate).format(i18n.global.t('datatableComponent.breakfastDate')) }}
    </template>
    <template v-slot:item.actions="{ item }" >
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" color="#007f8c" size="small" :disabled="userConnected?.lastname !== item.lastname" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item
              :key="1"
              v-model=userId
              @click="setUserId(item.id, 'addBreakfastDate')"
              :title="i18n.global.t('datatableComponent.menu.addBreakfastDate')"
          >
          </v-list-item>
          <v-list-item
              :key="2"
              v-model=userId
              @click="setUserId(item.id, 'updateAccount')"
              :title="i18n.global.t('datatableComponent.menu.editMyAccount')"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
  <v-overlay v-model="overlay" class="date-picker">
    <v-date-picker
        v-model="date"
        :allowed-dates="allowDate"
        width="400"
        color="#007f8c"
        :title="i18n.global.t('datatableComponent.selectDate')"
        @update:model-value="getUserId(userId, date)"
    >
      <template #header>
        <div class="custom-header" />
      </template>
    </v-date-picker>
  </v-overlay>
</template>

<style scoped lang="scss">
.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
