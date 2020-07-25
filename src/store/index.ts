import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const TIMER_INITIAL_STATE = -11

enum ACTION {
  PROYAVKA_START = 'PROYAVKA_START',
  PROYAVKA_SPINNING = 'PROYAVKA_SPINNING',
  PROYAVKA_WAITING = 'PROYAVKA_WAITING',
  FIRST_FLUSHING = 'FIRST_FLUSHING',
}

export const ACTION_DESCRIPTION: {
  [key: string]: string;
} = {
  [ACTION.PROYAVKA_START]: 'Готовимся к проявке',
  [ACTION.PROYAVKA_SPINNING]: 'Вращаем',
  [ACTION.PROYAVKA_WAITING]: 'Ждём',
  [ACTION.FIRST_FLUSHING]: 'Промываем первый раз'
}

const ACTION_SOUND: {
  [key: string]: string;
} = {
  [ACTION.PROYAVKA_START]: 'sound/1-hello-darkness.mp3',
  [ACTION.PROYAVKA_SPINNING]: 'sound/2-bell.mp3',
  [ACTION.PROYAVKA_WAITING]: 'sound/3-bazinga.mp3',
  [ACTION.FIRST_FLUSHING]: 'sound/4-run-vine.mp3'
}

interface TimeDiff {
  timeSpan: number;
  action: ACTION;
}

interface TimeLine {
  timeSpan: number;
  timeCode: number;
  action: ACTION;
}

const timeDiff: TimeDiff[] = [
  { timeSpan: 45, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 15, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 15, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 45, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 15, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 45, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 15, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 45, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 15, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 45, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 45, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 15, action: ACTION.PROYAVKA_WAITING },
  { timeSpan: 60, action: ACTION.FIRST_FLUSHING }
]

const timeLine: TimeLine[] = [{
  timeCode: TIMER_INITIAL_STATE + 1,
  timeSpan: 10,
  action: ACTION.PROYAVKA_START
}]
timeDiff.forEach((time, index) => {
  const previousTime = timeLine && timeLine[index]
  const previousTimeCode = previousTime?.timeCode
  const previousTimeSpan = previousTime?.timeSpan

  timeLine.push({
    timeCode: previousTimeCode + previousTimeSpan,
    timeSpan: time.timeSpan,
    action: time.action
  })
})

console.log(timeLine)

let timerId: number
let audio: HTMLAudioElement

export default new Vuex.Store({
  state: {
    timer: TIMER_INITIAL_STATE,
    action: timeLine[0].action
  },
  mutations: {
    addSecond (state) {
      state.timer++
    },
    setAction (state, action) {
      state.action = action
    },
    reset (state) {
      state.timer = TIMER_INITIAL_STATE
    }
  },
  actions: {
    startTimer (context) {
      const timerStep = () => {
        context.commit('addSecond')
        const action = timeLine.find(time => time.timeCode === context.state.timer)
        console.log(action)

        if (action) {
          context.commit('setAction', action.action)
          const actionSound = ACTION_SOUND[action.action]

          if (audio) {
            audio.pause()
          }
          audio = new Audio(actionSound)
          audio.play()
        }
      }

      timerStep()
      timerId = setInterval(timerStep, 100)
    },
    stopTimer (context) {
      clearInterval(timerId)
      context.commit('reset')
    }
  },
  modules: {
  }
})
