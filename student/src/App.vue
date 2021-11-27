<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
@import "./assets/css/style.css";
html,
body {
  background-color: rgb(245 245 245);
}
</style>
