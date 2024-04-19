<script setup lang="ts">
const props = defineProps<{
  isSelected: boolean
}>()
</script>

<template>
  <div class="English">
    <div :class="props.isSelected ? 'English__flag' : 'English__flag__is-not-selected'">
      <img src="../../../assets/english.png" alt="english">
      <span>EN</span>
    </div>
  </div>
</template>

<style lang="scss">
.English {

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
