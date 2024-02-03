<script setup lang="ts">
import Button from '../../../components/atoms/button/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import i18n from "@/i18n"

const router = useRouter()
const visible = ref(false)
</script>

<template>
    <v-card class="mx-auto px-6 py-8 connexion" tnr-id="connexion-card">
      <v-form>
        <v-text-field class="mb-2" label="LDAP" :clearable="true" tnr-id="connexion-card-ldap-field" />
        <v-text-field
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
            type="submit"
            @click="router.push({ name: 'home' })"
        />
      </v-form>
      <p tnr-id="connexion-card-create-account-link">{{ i18n.global.t('connexionComponent.noAccount') }}<span class="signup-link text-decoration-underline" @click="router.push({ name: 'home' })">Signup</span></p>
    </v-card>
</template>

<style scoped>
.connexion {
  min-width: 400px;
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
