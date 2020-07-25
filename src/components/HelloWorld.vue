<template>
  <div class="Timer">

    <button
      v-if="!running"
      v-on:click="startTimer"
      class="Timer_StartButton"
    >Start</button>

    <button
      v-if="running"
      v-on:click="stopTimer"
      class="Timer_StopButton"
    >Stop</button>

    <div
      v-if="running"
      class="Timer_Time"
    >
      <span>Time: </span>
      <span >{{ timer }}</span>
    </div>
    <div
      v-if="running"
      class="Timer_Action"
    >
      <span >{{ currentAction }}</span>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TIMER_INITIAL_STATE, ACTION_DESCRIPTION } from '../store'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    startTimer () {
      this.$store.dispatch('startTimer')
    },
    stopTimer () {
      this.$store.dispatch('stopTimer')
    }
  },
  computed: {
    timer () {
      return (this.$store as any).state.timer
    },
    running () {
      return (this.$store as any).state.timer !== TIMER_INITIAL_STATE
    },
    currentAction () {
      const action = (this.$store as any).state.action as any
      return ACTION_DESCRIPTION[action]
    }
  }
})
</script>

<style scoped lang="scss">
.Timer {
  &_StartButton,
  &_StopButton {
    padding: 10px 30px;
    border: 0;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    font-size: 48px;
  }

  &_StartButton {
    color: #ffffff;
    background: #42b983;
  }

  &_StopButton {
    color: #ffffff;
    background: #e94242;
  }

  &_Time {
    margin-top: 20px;
    font-size: 64px;
    font-weight: 900;
  }

  &_Action {
    margin-top: 20px;
    font-size: 48px;
  }
}
</style>
