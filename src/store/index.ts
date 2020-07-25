import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

enum ACTION {
  PROYAVKA_START = 'PROYAVKA_START',
  PROYAVKA_SPINNING = 'PROYAVKA_SPINNING',
  PROYAVKA_WAITING = 'PROYAVKA_WAITING',
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
  { timeSpan: 45, action: ACTION.PROYAVKA_SPINNING }, { timeSpan: 15, action: ACTION.PROYAVKA_WAITING }
]

const timeLine: TimeLine[] = [{
  timeCode: 0,
  timeSpan: 10,
  action: ACTION.PROYAVKA_START
}]
timeDiff.forEach((time, index) => {
  const previousTime = timeLine && timeLine[index]
  const previousTimeCode = previousTime?.timeCode || 0
  const previousTimeSpan = previousTime?.timeSpan || 0

  timeLine.push({
    timeCode: previousTimeCode + previousTimeSpan,
    timeSpan: time.timeSpan,
    action: time.action
  })
})

console.log(timeLine)

export default new Vuex.Store({
  state: {
    timer: -1
  },
  mutations: {
    addSecond (state) {
      state.timer++
    }
  },
  actions: {
    startTimer (context) {
      const timerStep = () => {
        context.commit('addSecond')
        const action = timeLine.find(time => time.timeCode === context.state.timer)
        console.log(action)
        if (action?.action === ACTION.PROYAVKA_SPINNING) {
          new Audio('sound/proyavka-spin-start.mp3').play()
        }

        if (action?.action === ACTION.PROYAVKA_WAITING) {
          new Audio('sound/proyavka-spin-stop.mp3').play()
        }
      }

      timerStep()
      setInterval(timerStep, 1000)
    }
  },
  modules: {
  }
})
