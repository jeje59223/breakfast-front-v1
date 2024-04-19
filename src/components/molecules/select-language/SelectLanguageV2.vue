<script setup lang="ts">
import French from '@/components/atoms/french/French.vue'
import English from '@/components/atoms/english/English.vue'
import { ref } from 'vue'
import i18n from '@/i18n'
import { useLocaleStore } from '@/stores/locale'

const { setCurrentLocale } = useLocaleStore()

const isFrenchLanguageSelected = ref<boolean>(true)
const isEnglishLanguageSelected = ref<boolean>(false)
const selectedLang = ref(i18n.global.locale)

const selectFrenchLanguage = () => {
  isFrenchLanguageSelected.value = true
  isEnglishLanguageSelected.value = false
  selectedLang.value = 'fr'
  setCurrentLocale('fr')
  i18n.global.locale = selectedLang.value
}

const selectEnglishLanguage = () => {
  isEnglishLanguageSelected.value = true
  isFrenchLanguageSelected.value = false
  selectedLang.value = 'en'
  setCurrentLocale('en')
  i18n.global.locale = selectedLang.value
}
</script>
<template>
  <div class="SelectLanguageContainer">
    <div class="SelectLanguageContainer__choice">
      <French @click="selectFrenchLanguage" :is-selected="isFrenchLanguageSelected" />
      <English @click="selectEnglishLanguage" :is-selected="isEnglishLanguageSelected" />
    </div>
  </div>
</template>
<style lang="scss">
.SelectLanguageContainer {
  width: 100%;
  height: 70px;
  background-color: #007f8c;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  &__choice {
    display: flex;
    gap: 20px;
    padding: 20px;
  }
}
</style>
