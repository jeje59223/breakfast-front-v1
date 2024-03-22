<script setup lang="ts">
import { useJokesStore } from '@/stores/jokes'
import { onMounted, ref, watch } from 'vue'
import Button from '@/components/atoms/button/Button.vue'
import i18n from '@/i18n'

const { joke, getRandomJoke, isLoading } = useJokesStore()
const displayResponse = ref<boolean>(false)
const lang = ref(i18n.global.locale)
const isLoad = ref<boolean>(isLoading)

onMounted(async () => {
  try {
    isLoad.value = true
    await getRandomJoke(lang.value)
  } catch (err) {
    console.error(err)
  }
  finally {
    isLoad.value = false
  }
})

const showDelivery = () => {
  displayResponse.value = !displayResponse.value
}

watch(() => lang.value, async (newVal) => {
  i18n.global.locale = newVal
  try {
    isLoad.value = true
    await getRandomJoke(newVal)
  } catch (err) {
    console.error(err)
  }
  finally {
    isLoad.value = false
  }
})
</script>

<template>
  <div tnr-id="home-page" class="mt-12">
    <h1 tnr-id="home-page-title">{{ i18n.global.t('homePageComponent.title') }}</h1>
    <div class="joke" tnr-id="home-page-joke-container">
      <h2 class="joke-title" tnr-id="home-page-joke-container-title">{{ i18n.global.t('homePageComponent.jokeOfDay') }}</h2>
      <div>
        <v-progress-circular v-if="isLoad" class="my-5" indeterminate color="#007f8c"></v-progress-circular>
      </div>
      <p class="joke-question" tnr-id="home-page-joke-container-question" v-if="joke && !isLoad">{{ joke.setup }}</p>
      <Button class="joke-button" tnr-id="home-page-joke-container-button" :text="!displayResponse ? i18n.global.t('homePageComponent.seeResponse') : i18n.global.t('homePageComponent.hideResponse')" color="#007f8c" @click="showDelivery"  size="large"/>
      <div class="joke-response" tnr-id="home-page-joke-container-response" v-if="joke && displayResponse">
        <p class="joke-response-text" tnr-id="home-page-joke-container-response-text">{{ joke.delivery }}</p>
        <img class="joke-response-image" src="https://media.giphy.com/media/xUA7b30EbtkaMHvRgk/giphy.gif" width="300" height="300"/>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
h1 {
  text-align: center;
}

.joke {
  text-align: center;
  margin-top: 30px;
  border: 1px #007f8c solid;
  padding: 40px;
  border-radius: 4px;
  width: 100%;

  &-title {
    font-weight: bold;
    color: #007f8c;
  }

  &-question {
    margin: 20px;
  }

  &-response {
    margin: 20px;
    font-size: 20px;
    color: #007f8c;

    &-text {
      font-weight: bold;
    }

    &-image {
      margin-top: 20px;
      border-radius: 4px;
    }
  }
}
</style>
