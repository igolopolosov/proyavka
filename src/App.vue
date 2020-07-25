<template>
  <div id="app" class="App">
    <Timer />
    <div class="App_Version">version: 1.1.1-beta</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Timer from './components/Timer.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Timer
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
