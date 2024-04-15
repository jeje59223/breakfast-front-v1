<script setup lang="ts">
import type { User } from '@/models/user'
import { ref } from 'vue'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import i18n from '@/i18n'
import { useRouter } from 'vue-router'

dayjs.extend(weekday)

const props = defineProps<{
  users: User[]
}>();

const router = useRouter()

const usersBreak = ref(props.users)
const nextOrganized = ref<number>(0)
const overlay = ref<boolean>(false)
const date = ref<string | undefined>()
const userId = ref<User['id']>('')
const userConnected = ref(props.users.find(user => user.lastname === 'Cnockaert'))

const getUserId = (id: User['id'], date: string | undefined) => {
  overlay.value = !overlay.value
  nextOrganized.value++
  return usersBreak.value.filter(user => user.id === id).map(u => ({ ...u, nbBreakfast: u.nbBreakfast++, nextOrganizedBreakfast: u.nextOrganizedBreakfastDate = date?.toString() }))
}

const setUserId = (id: User['id'], choice: string) => {
  if (choice === 'updateAccount') {
    router.push({ name: 'account' })
    return
  }

  overlay.value = !overlay.value
  userId.value = id
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
};

const items = [
    { title: 'Ajouter une date pour organiser un petit déj', value: 'addBreakfastDate' },
    { title: 'Modifier mon compte', value: 'updateAccount' },
]
</script>

<template>
  <h1 class="mb-12 text-center">{{ i18n.global.t('datatableComponent.title') }}</h1>
  <div class="BreakfastManagement">

    <v-table
        class="BreakfastManagement--datatable"
        fixed-header
        height="500px"
        hover
    >
      <thead class="BreakfastManagement--datatable">
      <tr>
        <th>{{ i18n.global.t('datatableComponent.lastName') }}</th>
        <th>{{ i18n.global.t('datatableComponent.firstname') }}</th>
        <th>{{ i18n.global.t('datatableComponent.nextBreakfastDate') }}</th>
        <th>{{ i18n.global.t('datatableComponent.actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in usersBreak" :key="user.lastname">
        <td>{{ user.lastname }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.nextOrganizedBreakfastDate && dayjs(user.nextOrganizedBreakfastDate).format(i18n.global.t('datatableComponent.breakfastDate')) }}</td>
        <td>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" color="#007f8c" size="small" :disabled="userConnected?.lastname !== user.lastname" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  v-model=userId
                  @click="setUserId(user.id, item.value)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </tr>
      <v-overlay v-model="overlay" class="date-picker">
        <v-date-picker
            v-model="date"
            :allowed-dates="allowDate"
            :locale="i18n.global.locale"
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
      </tbody>
    </v-table>
  </div>

</template>

<style scoped lang="scss">
.BreakfastManagement {
  display: flex;
  justify-content: center;

  &--datatable {
    width: 100%;
  }
}
.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
