<script setup lang="ts">
import { ref } from 'vue'
import i18n from '../../../i18n.ts'
import type { Language } from "@/models/language"

const selectedLang = ref(i18n.global.locale);
const languages = ref<Language[]>([])
const changeLang = () => {
  i18n.global.locale = selectedLang.value
}

languages.value = [
  {
    id: 'fr',
    name: i18n.global.t('selectLanguageComponent.french')
  },
  {
    id: 'en',
    name: i18n.global.t('selectLanguageComponent.english')
  }
]
</script>
<template>
  <div class="select-language-container">
    <div class="select-language-container--select">
      <v-select
          id="lang-select"
          :label="i18n.global.t('selectLanguageComponent.selectLanguage')"
          :items="languages"
          item-title="name"
          item-value="id"
          append-icon="mdi-coffee"
          v-model="selectedLang"
          @update:modelValue="changeLang"
      ></v-select>
    </div>
  </div>
</template>
<style lang="scss">
.select-language-container {
  width: 100%;
  height: 60px;
  background-color: #007f8c;
  display: flex;
  justify-content: flex-end;
  color: white;
  position: absolute;
  top: 0;
  left: 0;

  &--select {
    width: 250px;
  }
}

.v-input__append {
  margin-right: 1rem;
}
</style>
