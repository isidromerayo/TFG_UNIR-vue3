<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import SliderComponent from './components/SliderComponent.vue';

</script>

<template>

  <HeaderComponent></HeaderComponent>
  
  <main id="main">
    <RouterView />
  </main>

    <FooterComponent></FooterComponent>
</template>