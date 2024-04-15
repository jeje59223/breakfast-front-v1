<script setup lang="ts">
import Button from '@/components/atoms/button/Button.vue'
import { fakeUsers2 } from '../../../tests/data/user'
import { onBeforeMount, ref } from 'vue'
import i18n from '@/i18n'
import type { User } from '@/models/user'

const first = ref<string>('')
const second = ref<string>('')
const third = ref<string>('')
function getTopNbBreakfast(users: User[]) {
  users.sort((a, b) => b.nbBreakfast - a.nbBreakfast)
  return users.slice(0, 3);
}

onBeforeMount(() => {
  first.value = `${getTopNbBreakfast(fakeUsers2)[0].firstname} ${getTopNbBreakfast(fakeUsers2)[0].lastname.charAt(0)}`
  second.value = `${getTopNbBreakfast(fakeUsers2)[1].firstname} ${getTopNbBreakfast(fakeUsers2)[1].lastname.charAt(0)}`
  third.value = `${getTopNbBreakfast(fakeUsers2)[2].firstname} ${getTopNbBreakfast(fakeUsers2)[2].lastname.charAt(0)}`
})

</script>
<template>
  <div class="Top-container justify-center align-center d-flex">
    <div class="Top-container--podium" >
      <h1>{{ i18n.global.t('podium.title') }}</h1>
      <img src="@/assets/podium.png" alt="podium">
      <div class="Top-container--number-one">{{ first }}</div>
      <div class="Top-container--number-two">{{ second }}</div>
      <div class="Top-container--number-three">{{ third }}</div>
    </div>
  </div>

  <div class="justify-center align-center d-flex">
    <Button :text="i18n.global.t('podium.rankingLabelButton')" color="#007f8c" />
  </div>
</template>
<style lang="scss">
.Top-container {
  margin-top: 150px;
  width: 100%;
  h1 {
    position: absolute;
    top: -60px;
  }

  &--podium {
    img {
      width: 100%;
      height: 350px;
      margin-top: 50px;
    }
    display: flex;
    justify-content: center;
    position: relative;
  }

  &--number-one {
    position: absolute;
    top: 40px;
    font-size: 30px;
  }

  &--number-two {
    position: absolute;
    font-size: 30px;
    top: 100px;
    left: 5%
  }

  &--number-three {
    position: absolute;
    font-size: 30px;
    top: 130px;
    right: 5%;
  }
}
</style>
