<script setup lang="ts">
import { ref } from 'vue'
import i18n from '@/i18n';
import BottomBarActions from '@/components/molecules/bottom-bar-actions/BottomBarActions.vue'
import type { User } from '@/models/user'
import { useUsersStore } from '@/stores/users'
import Title from '@/components/atoms/title/Title.vue'

const { addNewUser, getUsers } = useUsersStore()
const firstname = ref<string>('')
const lastname = ref<string>('')
const ldap = ref<string>('')
const email = ref<string>('')
const picture = ref<string | undefined>('')
const password = ref<string>('')
const username = ref<string>('')
const roles = ref()

const addUser = async () => {
  try {
    const newUser: User = {
      ldap: ldap.value,
      firstname: firstname.value,
      lastname: lastname.value,
      picture: picture.value,
      email: email.value,
      lastOrganizedBreakfastDate: null,
      nextOrganizedBreakfastDate: '',
      numberOfBreakFastOrganised: 0,
      roles: [roles.value],
      creationDate: new Date(),
      login: {
        username: username.value,
        password: password.value
      }
    }

    await addNewUser(newUser)
    await getUsers()
    alert('Utilisateur ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur', err);
    alert('Erreur lors de l\'ajout de l\'utilisateur');
  }
}

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      if (typeof base64Image === 'string') {
        picture.value = base64Image;
      }
      console.log(base64Image);
    };
  }
};
</script>
<template>
  <Title text="ADD NEW USER" />
  <div class="add-new-user-page-container">
    <div class="add-new-user-page-container__left">
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
          @change="onFileChange"
      ></v-file-input>
    </div>
    <div class="add-new-user-page-container__right">
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
          variant="outlined"
      ></v-text-field>
      <v-text-field
          v-model="username"
          label="Username"
          class="mb-4"
          variant="outlined"
      ></v-text-field>
      <v-select
          v-model="roles"
          label="Rôles"
          variant="outlined"
          :items="['ADMIN', 'USER']"
      ></v-select>
    </div>
  </div>
  <BottomBarActions text="Valider" @click="addUser()" :display-add-new-user-button="false" display-save-button />
</template>
<style lang="scss">
.add-new-user-page-container {
  display: flex;
  gap: 20px;
  margin-top: 150px;
  margin-left: 50px;
  margin-bottom: 80px;
  padding: 2rem;

  &__left {
    width: 50%;
  }

  &__right {
    width: 50%;
  }
}
</style>
