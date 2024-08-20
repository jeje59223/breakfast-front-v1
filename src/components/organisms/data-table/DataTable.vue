<script setup lang="ts">
import { Role, type User } from '@/models/user'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import Dialog from '@/components/molecules/dialog-alert/Dialog.vue'
import Chip from '@/components/atoms/chip/Chip.vue'

const props = defineProps<{
  users: User[]
}>();

const router = useRouter()
const userId = ref<User['ldap']>('')
const overlay = ref<boolean>(false)
const date = ref<string>()
const usersBreak = ref(props.users)
const { updateUser, getUserByLdap, getUsers, deleteUser } = useUsersStore()
const { currentUser, currentUserByLdap } = storeToRefs(useUsersStore())
const userConnected = ref<User | undefined>(currentUser.value)

const firstname = ref<string>('')
const lastname = ref<string>('')
const ldap = ref<string>('')
const email = ref<string>('')
const picture = ref<string | undefined>('')
const password = ref<string>('')
const username = ref<string>('')
const nextDate = ref<string | null>()
const nbBreakfast = ref<number>(0)
const isLoadingDate = ref<boolean>(false)
const dialog = ref<boolean>(false)
const deleteDateDialog = ref<boolean>(false)

const updateAccount = (ldap: string) => {
  router.push({ name: 'account', params: { ldap: ldap } })
}

const addBreakfastDate = (ldap: string) => {
  overlay.value = !overlay.value
  userId.value = ldap
}

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
  {
    key: 'actions',
    title: 'ACTIONS',
    sortable: false
  }
])

const getUserId = async (id: User['ldap'], date: string | undefined ) => {
  if (!date) {
    return
  }
  const nextDateBreak = new Date(date)
  const utcDate = new Date(nextDateBreak.getTime() - nextDateBreak.getTimezoneOffset() * 60000);
  const isoDateString = utcDate.toISOString()
  overlay.value = !overlay.value

  try {
    isLoadingDate.value = true
    await getUserByLdap(id)
    if (currentUserByLdap.value) {
      firstname.value = currentUserByLdap.value?.firstname
      lastname.value = currentUserByLdap.value?.lastname
      ldap.value = currentUserByLdap.value?.ldap
      email.value = currentUserByLdap.value?.email
      picture.value = currentUserByLdap.value.picture
      password.value = currentUserByLdap.value?.login.password
      username.value = currentUserByLdap.value?.login.username
      nbBreakfast.value = currentUserByLdap.value?.numberOfBreakFastOrganised
      nextDate.value = currentUserByLdap.value?.nextOrganizedBreakfastDate
    }

    const userData: User = {
      ldap: ldap.value,
      firstname: firstname.value,
      lastname: lastname.value,
      picture: picture.value,
      email: email.value,
      lastOrganizedBreakfastDate: currentUserByLdap.value?.lastOrganizedBreakfastDate,
      nextOrganizedBreakfastDate: isoDateString,
      numberOfBreakFastOrganised: nbBreakfast.value + 1,
      roles: currentUserByLdap.value?.roles,
      creationDate: currentUserByLdap.value?.creationDate,
      login: {
        username: username.value,
        password: password.value
      }
    }
    await updateUser(id, userData)
    await getUsers()
  } catch (err) {
    console.error(err)
    throw new Error('La date n\'a pas pu être mis à jour')
  } finally {
    isLoadingDate.value = false
  }
}

const allowDate = (date: string) => {
  if (!date) {
    return
  }
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

watch(() => props.users, (newUsers) => {
  usersBreak.value = newUsers;
}, { immediate: true });

const openDeleteDateConfirm = (ldap: string) => {
  deleteDateDialog.value = true
  userId.value = ldap
}
const closeDeleteDateDialog = () => {
  deleteDateDialog.value = false
}

const deleteDate = async () => {
  try {
    isLoadingDate.value = true
    await getUserByLdap(userId.value)
    if (currentUserByLdap.value) {
      firstname.value = currentUserByLdap.value?.firstname
      lastname.value = currentUserByLdap.value?.lastname
      ldap.value = currentUserByLdap.value?.ldap
      email.value = currentUserByLdap.value?.email
      picture.value = currentUserByLdap.value.picture
      password.value = currentUserByLdap.value?.login.password
      username.value = currentUserByLdap.value?.login.username
      nbBreakfast.value = currentUserByLdap.value?.numberOfBreakFastOrganised
      nextDate.value = currentUserByLdap.value?.nextOrganizedBreakfastDate
    }

    const userData: User = {
      ldap: ldap.value,
      firstname: firstname.value,
      lastname: lastname.value,
      picture: picture.value,
      email: email.value,
      lastOrganizedBreakfastDate: currentUserByLdap.value?.lastOrganizedBreakfastDate,
      nextOrganizedBreakfastDate: null,
      numberOfBreakFastOrganised: nbBreakfast.value - 1,
      roles: currentUserByLdap.value?.roles,
      creationDate: currentUserByLdap.value?.creationDate,
      login: {
        username: username.value,
        password: password.value
      }
    }
    await updateUser(userId.value, userData)
    await getUsers()
  } catch (err) {
    console.error(err)
    throw new Error('La date n\'a pas pu être mis à jour')
  } finally {
    isLoadingDate.value = false
    deleteDateDialog.value = false
  }
}

const deleteUserByLdap = async () => {
  console.log(userId.value)
  try {
    await deleteUser(userId.value)
    await getUsers()
    alert('This user has been deleted')
  } catch (err) {
    console.error(err)
  } finally {
    dialog.value = false
  }
}

const openDeleteConfirm = (ldap: string) => {
  dialog.value = true
  userId.value = ldap
}

const deleteCancel = async () => {
  dialog.value = false
}
</script>

<template>
  <v-data-table
      :items="usersBreak"
      :headers="headers"
      :items-per-page-options="itemsPerPageOptions"
      hover
      sort-asc-icon="mdi-arrow-up"
      sort-desc-icon="mdi-arrow-down"
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
    <template v-slot:[`header.actions`]></template>
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
      <div v-if="isLoadingDate" class="d-flex justify-center">
        <v-progress-circular :size="20" color="#287F8C" indeterminate></v-progress-circular>
      </div>
      <div v-else class="d-flex align-center">
        <p>{{ item.nextOrganizedBreakfastDate ? dayjs(item.nextOrganizedBreakfastDate).format(i18n.global.t('datatableComponent.breakfastDate')) : '' }}</p>
        <v-tooltip text="Delete this date">
          <template v-slot:activator="{ props }">
            <v-icon
                v-if="item.nextOrganizedBreakfastDate"
                v-bind="props"
                icon="mdi-alpha-x-circle-outline"
                color="rgb(198, 17, 18)"
                class="ml-4"
                @click="openDeleteDateConfirm(item.ldap)"
            >
            </v-icon>
          </template>
        </v-tooltip>
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex justify-end">
        <v-tooltip :text="i18n.global.t('datatableComponent.addDate')">
          <template v-slot:activator="{ props }">
            <v-icon
                v-bind="props"
                icon="mdi-calendar-blank"
                color="#007f8c"
                class="ml-4"
                @click="addBreakfastDate(item.ldap)"
            >
            </v-icon>
          </template>
        </v-tooltip>
        <v-tooltip :text="i18n.global.t('datatableComponent.updateAccount')">
          <template v-slot:activator="{ props }">
            <v-icon
                v-bind="props"
                icon="mdi-pencil"
                color="#333333"
                class="ml-4"
                @click="updateAccount(item.ldap)"
            >
            </v-icon>
          </template>
        </v-tooltip>
        <v-tooltip :text="i18n.global.t('datatableComponent.deleteAccount')">
          <template v-slot:activator="{ props }">
            <v-icon
                v-if="userConnected?.roles?.includes(Role.ADMIN)"
                v-bind="props"
                icon="mdi-delete"
                color="#c61112"
                class="ml-4"
                @click="openDeleteConfirm(item.ldap)"
            >
            </v-icon>
          </template>
        </v-tooltip>
      </div>
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
  <Dialog
      :display-dialog="dialog"
      title="Delete this user"
      content="Voulez-vous vraiment supprimer cet utilisateur ?"
      @confirm="deleteUserByLdap"
      @cancel="deleteCancel"
      @update:displayDialog="dialog = $event"
  />
  <Dialog
      :display-dialog="deleteDateDialog"
      title="Delete this date"
      content="Voulez-vous vraiment supprimer cette date ?"
      @confirm="deleteDate"
      @cancel="closeDeleteDateDialog"
      @update:displayDialog="deleteDateDialog = $event"
  />
</template>

<style scoped lang="scss">
.datatable-user-picture {
  border-radius: 50%;
  display: flex;
  align-items: center;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-down, .arrow-up {
  font-size: 20px;
}
</style>
