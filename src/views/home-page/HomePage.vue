<script setup lang="ts">
import { useJokesStore } from '@/stores/jokes'
import { onBeforeMount, ref } from 'vue'
import Button from '@/components/atoms/button/Button.vue'

const { joke, getRandomJoke } = useJokesStore()
const displayResponse = ref<boolean>(false)

onBeforeMount(async () => {
  await getRandomJoke()
})

const showDelivery = () => {
  displayResponse.value = true
}
</script>

<template>
  <div tnr-id="home-page">
    <h1 tnr-id="home-page-title">Welcome to Breakfast Application</h1>
    <div class="joke" tnr-id="home-page-joke-container">
      <h2 class="joke-title" tnr-id="home-page-joke-container-title">Joke of day !</h2>
      <p class="joke-question" tnr-id="home-page-joke-container-question" v-if="joke">{{ joke.setup }}</p>
      <Button class="joke-button" tnr-id="home-page-joke-container-button" text="See response" color="#007f8c" @click="showDelivery"  size="large"/>
      <div class="joke-response" tnr-id="home-page-joke-container-response" v-if="joke && displayResponse">
        <p class="joke-response-text" tnr-id="home-page-joke-container-response-text">{{joke.delivery}}</p>
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
