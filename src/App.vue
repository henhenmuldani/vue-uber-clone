<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="slide" mode="out-in"> <component :is="Component" /> </transition>
  </RouterView>
</template>

<style scoped>
.slide-leave-active {
  transition: transform 0.175s ease-in-out;
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
