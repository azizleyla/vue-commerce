<script setup>
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<style scoped>
</style>
