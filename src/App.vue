<template>
  <user-search />
</template>

<script>

import UserSearch from "@/components/UserSearch.vue";

export default {
  name: 'App',
  components: {
    UserSearch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
