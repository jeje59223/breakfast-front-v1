<script setup lang="ts">
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'
import i18n from '@/i18n'
import { onBeforeMount, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import type { User } from '@/models/user'
import { useRoute } from 'vue-router'
import Title from '@/components/atoms/title/Title.vue'
const { getUserByLdap, updateUser, getUsers } = useUsersStore()
const { currentUserByLdap } = storeToRefs(useUsersStore())
const route = useRoute()

const userLdap = route?.params?.ldap as string
const firstname = ref<string>('')
const lastname = ref<string>('')
const ldap = ref<string>('')
const email = ref<string>('')
const picture = ref<string | undefined>('')
const password = ref<string>('')
const username = ref<string>('')
const nextBreakfastDate = ref<string | null | undefined>('')
const isSuccess = ref<boolean>(false)
const isPictureLoading = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    isPictureLoading.value = true
    await getUserByLdap(userLdap)
    if (currentUserByLdap.value) {
      firstname.value = currentUserByLdap.value?.firstname
      lastname.value = currentUserByLdap.value?.lastname
      ldap.value = currentUserByLdap.value?.ldap
      email.value = currentUserByLdap.value?.email
      picture.value = currentUserByLdap.value.picture
      password.value = currentUserByLdap.value?.login.password
      username.value = currentUserByLdap.value?.login.username
      nextBreakfastDate.value = currentUserByLdap?.value.nextOrganizedBreakfastDate
    }
  } catch (err) {
    console.error(err)
    throw new Error('Erreur de chargement des données de l\'utilisateur')
  } finally {
    isPictureLoading.value = false
  }
})

const editUser = async () => {
  try {
    const userData: User = {
      ldap: ldap.value,
      firstname: firstname.value,
      lastname: lastname.value,
      picture: picture.value,
      email: email.value,
      lastOrganizedBreakfastDate: currentUserByLdap.value?.lastOrganizedBreakfastDate,
      nextOrganizedBreakfastDate: nextBreakfastDate.value,
      numberOfBreakFastOrganised: currentUserByLdap.value?.numberOfBreakFastOrganised,
      roles: currentUserByLdap.value?.roles,
      creationDate: currentUserByLdap.value?.creationDate,
      login: {
        username: username.value,
        password: password.value
      }
    }
    await updateUser(userLdap, userData)
    await getUsers()
    isSuccess.value = true
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur', error)
    alert('Erreur lors de la mise à jour de l\'utilisateur')
  }
}

// A revoir
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64Image = reader.result
      if (typeof base64Image === 'string') {
        picture.value = base64Image
      }
      console.log(base64Image)
    };
  }
}
</script>

<template>
  <Title text="ACCOUNT PAGE" />
  <v-alert v-if="isSuccess" text="Utilisateur mis à jour avec succès" title="Mise à jour" type="success" class="mb-12" closable @click:close="isSuccess = false" />
  <div class="d-flex user-infos">
    <img v-if="!isPictureLoading" :src="picture" alt="Image depuis Google Drive"/>
    <v-progress-circular v-if="isPictureLoading" :size="300" color="#287F8C" indeterminate></v-progress-circular>
    <div class="account-page-container">
      <div class="account-page-container__left">
        <v-text-field
            v-model="firstname"
            label="First name"
            class="mb-4"
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="ldap"
            label="LDAP"
            class="mb-4"
            disabled
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            class="mb-4"
            type="password"
            variant="outlined"
        ></v-text-field>
        <v-file-input
            label="Picture"
            class="mb-4"
            variant="outlined"
            clearable
            @change="onFileChange"
        ></v-file-input>
      </div>
      <div class="account-page-container__right">
        <v-text-field
            v-model="lastname"
            label="Last name"
            class="mb-4"
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="email"
            label="Email"
            class="mb-4"
            disabled
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="username"
            label="Username"
            class="mb-4"
            variant="outlined"
        ></v-text-field>
      </div>
    </div>
  </div>
<BottomBarActions
    :text="i18n.global.t('breakfastPageComponent.save')"
    @click="editUser()"
    display-save-button
    :display-add-new-user-button="false"
/>
</template>
<style lang="scss">
.account-page-container {
  width: 100%;
  display: flex;
  gap: 50px;

  &__left {
    width: 50%;
  }

  &__right {
    width: 50%;
  }
}

.user-infos {
  align-items: center;
  gap: 50px;
  margin-left: 50px;
  padding: 2rem;
  margin-top: 150px;

  img {
    border-radius: 50%;
    width: 300px;
    height: 300px;
  }
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
