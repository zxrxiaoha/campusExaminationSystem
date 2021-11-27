<template>
  <div id="app">
    <keep-alive :include="['TestPaperEdit']">
      <router-view />
    </keep-alive>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
