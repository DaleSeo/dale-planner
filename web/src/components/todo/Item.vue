<template>
  <div class="ui message" :class="color">
    <i class="close icon" @click="$emit('del')"/>
    <div class="header">
      <TitleInput v-model="task.title"/>
    </div>
    <div>
      <i class="wait icon"/>
        {{createdAt}}
      <span v-if="task.completedAt">
        <i class="wait icon"/>
          {{completedAt}}
      </span>
    </div>
    <div style="text-align: right">
      <div class="ui tiny icon button" @click="toggleComplete">
        <i class="icon" :class="completeClass"/>
      </div>
      <div class="ui tiny icon button" @click="toggleStatus">
        <i class="video play icon"/>
      </div>
    </div>
    <!-- <pre>{{task}}</pre> -->
  </div>
</template>

<script>
import TitleInput from './TitleInput.vue'

export default {
  components: {TitleInput},
  props: ['task'],
  computed: {
    createdAt () {
      return 'Created At ' + moment(this.task.createdAt).format('YY/MM/DD HH:mm:ss')
    },
    completedAt () {
      return 'Completed At ' + moment(this.task.completedAt).format('YY/MM/DD HH:mm:ss')
    },
    color () {
      return this.task.completedAt ? 'black' : ''
    },
    completeClass () {
      if (this.task.completedAt) {
        return 'checkmark box'
      } else {
        return 'square outline'
      }
    }
  },
  watch: {
    'task.title': function (title) {
      this.updateTitle ()
    }
  },
  methods: {
    toggleStatus () {
      let nextStatus = (this.task.status + 1) % 3
      this.$set(this.task, 'status', nextStatus)
      this.$http.patch(`tasks/${this.task._id}`, {status: nextStatus})
    },
    toggleComplete () {
      let completedAt = this.task.completedAt ? null : new Date()
      this.$http.patch(`tasks/${this.task._id}`, {completedAt})
        .then(_ => this.$emit('fetch'))
    },
    updateTitle () {
      console.log('#updateTitle')
      this.$http.patch(`tasks/${this.task._id}`, {title: this.task.title})
    }
  }
}
</script>
