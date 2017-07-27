<template>
  <div class="ui segment">
    <h2 class="ui center aligned icon header">
      <i class="icon" :class="icon"/>
      {{minutes}}:{{seconds}}
      <div class="sub header">{{title}}</div>
    </h2>
    <div>
      <button class="ui mini icon button" @click="control">
        <i class="icon" :class="controlIcon"/>
      </button>
      <button class="ui mini icon button" @click="backward">
        <i class="step backward icon"/>
      </button>
      <button class="ui mini icon button" @click="forward">
        <i class="step forward icon"/>
      </button>
      <button class="ui mini icon button" @click="plus">
        <i class="step plus icon"/>
      </button>
      <button class="ui mini icon button" @click="minus">
        <i class="step minus icon"/>
      </button>
      <button class="ui mini icon button" @click="toggleSettings">
        <i class="setting icon"/>
      </button>
    </div>
    <Settings :settings="settings" v-if="showSettings"/>
    <!-- <pre>
      {{ {mode, state, ticker, remaining} }}
    </pre> -->
  </div>
</template>

<script>
import Settings from './Settings.vue'

const WORK_MODE = {
  duration: 25,
  title: 'Work',
  icon: 'student'
}

const BREAK_MODE = {
  duration: 5,
  title: 'Break',
  icon: 'coffee'
}

const STOP = 0, PLAYING = 1, PAUSED = 2

function zeroFill (n) {
  return (n < 10 ? '0' : '') + n;
}

export default {
  components: {Settings},
  data () {
    return {
      timer: {
        mode: WORK_MODE,
        state: STOP,
        remaining: 0
      },
      ticker: null,
      settings: {
        workDuration: 25,
        breakDuration: 5
      },
      showSettings: false
    }
  },
  computed: {
    minutes: {
      get () {
        return zeroFill(Math.floor(this.timer.remaining / 60))
      },
      set (val) {
        console.log('#val:' + val)
        console.log('#set:', parseInt(val) * 60 + this.seconds)
        this.timer.remaining = parseInt(val) * 60 + parseInt(this.seconds)
      }
    },
    seconds: {
      get () {
        return zeroFill(this.timer.remaining % 60)
      },
      set (val) {
        this.timer.remaining = parseInt(this.minutes) * 60 + parseInt(val)
      }
    },
    title () {
      return this.timer.mode.title
    },
    icon () {
      return this.timer.mode.icon
    },
    controlIcon () {
      return this.timer.state === PLAYING ? 'pause' : 'play'
    }
  },
  watch: {
    'settings.workDuration': function (val) {
      WORK_MODE.duration = val
    },
    'settings.breakDuration': function (val) {
      BREAK_MODE.duration = val
    }
  },
  created () {
    if (localStorage.getItem('mode')) {
      this.timer.mode = JSON.parse(localStorage.getItem('mode'))
    }
    if (localStorage.getItem('state')) {
      this.timer.state = +localStorage.getItem('state')
      if (this.timer.state === PLAYING) {
        this.ticker = setInterval(_ => this.tick(), 1000)
      }
    }
    if (localStorage.getItem('remaining')) {
      this.timer.remaining = +localStorage.getItem('remaining')
    }
  },
  methods: {
    control () {
      if (this.timer.state === PLAYING) {
        this.pause()
      } else {
        this.play()
      }
    },
    play () {
      console.log('#play')
      if (this.timer.state === STOP) {
        this.timer.remaining = this.timer.mode.duration * 60
      }
      this.timer.state = PLAYING
      this.ticker = setInterval(_ => this.tick(), 1000)
    },
    pause () {
      console.log('#pause')
      this.timer.state = PAUSED
      if (this.ticker) {
        clearInterval(this.ticker)
      }
    },
    backward () {
      console.log('#backward')
      this.timer.remaining = this.timer.mode.duration * 60
    },
    forward () {
      console.log('#forward')
      this.timer.remaining = 0
    },
    plus () {
      this.minutes++
    },
    minus () {
      this.minutes--
    },
    toggleSettings () {
      this.showSettings = !this.showSettings
    },
    tick () {
      if (this.timer.remaining <= 0) {
        this.toggleMode()
        this.notify()
      }
      localStorage.setItem('mode', JSON.stringify(this.timer.mode))
      localStorage.setItem('state', this.timer.state)
      localStorage.setItem('remaining', --this.timer.remaining)
    },
    toggleMode () {
      this.timer.mode = this.timer.mode === WORK_MODE ? BREAK_MODE : WORK_MODE
      this.timer.remaining = this.timer.mode.duration * 60
    },
    notify () {
      if (this.timer.mode === WORK_MODE) {
        new Notification('It\'s time to work!')
      } else {
        new Notification('It\'s time to break!')
      }
    }
  }
}
</script>
