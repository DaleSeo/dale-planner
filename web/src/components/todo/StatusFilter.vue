<template>
  <div class="ui large fluid buttons">
    <button class="ui button" :class="{active: activeIdx === 0}" @click="$emit('input', '')">All</button>
    <button class="ui button" :class="{active: activeIdx === 1}" @click="$emit('input', false)">ToDo</button>
    <button class="ui button" :class="{active: activeIdx === 2}" @click="$emit('input', true)">Done</button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      activeIdx: 0
    }
  },
  watch: {
    value (newVal) {
      switch (newVal) {
        case true:
          this.activeIdx = 2
          break
        case false:
          this.activeIdx = 1
          break
        default:
          this.activeIdx = 0
      }
      this.$emit('fetch')
    }
  }
}
</script>
