<script setup lang="ts">
const props = defineProps<{
  isSelected: boolean
}>()
</script>

<template>
  <div class="French">
    <div :class="props.isSelected ? 'French__flag' : 'French__flag__is-not-selected'">
      <img src="../../../assets/france.png" alt="french">
      <span>FR</span>
    </div>
  </div>
</template>

<style lang="scss">
.French {

  &__flag {
    display: flex;
    align-items: center;
    font-size: 16px;
    width: max-content;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

    &__is-not-selected {
      opacity: 0.3;
      display: flex;
      align-items: center;
      font-size: 16px;
      width: max-content;
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
