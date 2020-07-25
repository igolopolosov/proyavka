<template>
  <div id="app" class="App">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div class="App_Version">version: 1.0.0-alpha</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style lang="scss">
.App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  &_Version {
    margin-top: 20px;
  }
}
</style>
