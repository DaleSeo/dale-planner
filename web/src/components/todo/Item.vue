<template>
  <div class="ui message">
    <i class="close icon" @click="$emit('del')"/>
    <div class="header">
      {{task.title}}
    </div>
    <i class="wait icon"/>
      {{taskDate}}
  </div>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    taskDate () {
      return moment(this.task.createdAt).format('HH:mm:ss')
    }
  }
}
</script>
