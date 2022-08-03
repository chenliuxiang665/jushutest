<template>
  <div id="app">
    <Tax/>
  </div>
</template>

<script>
import Tax from "./components/Tax.vue"
export default {
  name: 'App',
  components: {
    Tax
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
