<template>
  <div class="ui message" :class="color">
    <i class="close icon" @click="$emit('del')"/>
    <div class="header">
      {{task.title}}
    </div>
    <div>
      <i class="wait icon"/>
        {{taskDate}}
    </div>
    <div style="text-align: right">
      <div class="ui mini icon button" @click="toggleStatus">
        <i class="video play icon"/>
      </div>
    </div>
    <pre>{{task}}</pre>
  </div>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    taskDate () {
      return moment(this.task.createdAt).format('HH:mm:ss')
    },
    color () {
      switch (this.task.status) {
        case 1:
          return 'positive'
        case 2:
          return 'negative'
        default:
          return ''
      }
    }
  },
  methods: {
    toggleStatus () {
      let nextStatus = (this.task.status + 1) % 3
      this.$set(this.task, 'status', nextStatus)
      this.$http.patch(`tasks/${this.task._id}`, {status: nextStatus})
    }
  }
}
</script>
