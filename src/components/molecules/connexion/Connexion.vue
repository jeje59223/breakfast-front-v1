<script setup lang="ts">
import Button from '../../../components/atoms/button/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const router = useRouter()
const visible = ref(false)
const ldap = ref<string>('')
const password = ref<string>('')
const { getUsers, getCurrentUser } = useUsersStore()
const { currentUser } = storeToRefs(useUsersStore())

onBeforeMount(async () => {
  await getUsers()
})

const loginCurrentUser = async (pseudo: string | undefined, pws: string | undefined) => {
  await getCurrentUser(pseudo, pws)

  if (currentUser.value) {
    await router.push({ name: 'home' })
  }
}
</script>

<template>
    <v-card class="mx-auto px-6 py-8 mt-12 connexion" tnr-id="connexion-card">
      <v-form>
        <v-text-field v-model="ldap" class="mb-2" label="LDAP" :clearable="true" tnr-id="connexion-card-ldap-field" />
        <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :placeholder="i18n.global.t('connexionComponent.enterYourPassword')"
            tnr-id="connexion-card-password-field"
            :clearable="true"
            @click:append-inner="visible = !visible"
        ></v-text-field>
        <div class="mb-2" tnr-id="connexion-card-forgot-password-link">
          <p class="signup-link text-decoration-underline" @click="router.push({ name: 'home' })">{{ i18n.global.t('connexionComponent.ForgotLoginPassword') }}</p>
        </div>
        <Button
            class="login-btn"
            tnr-id="connexion-card-submit-button"
            color="#007f8c"
            size="large"
            variant="elevated"
            :text="i18n.global.t('connexionComponent.login')"
            @click="loginCurrentUser(ldap, password)"
        />
      </v-form>
      <p tnr-id="connexion-card-create-account-link">{{ i18n.global.t('connexionComponent.noAccount') }}<span class="signup-link text-decoration-underline" @click="router.push({ name: 'home' })">{{ i18n.global.t('connexionComponent.signup') }}</span></p>
    </v-card>
</template>

<style scoped>
.connexion {
  width: 35%;
  min-width: 400px;
  padding-top: 150px;
}

.signup-link {
  width: fit-content;
  background-color: transparent;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  margin-bottom: 25px;
}
</style>
