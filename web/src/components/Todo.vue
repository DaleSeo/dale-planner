<template>
  <div class="ui segment">
    <h2 class="ui center aligned icon header">
      <i class="list icon"/>Todos
      <div class="sub header">{{tasks.length}} items</div>
    </h2>
    <div class="ui list">
      <Item
        :key="task._id"
        :task="task"
        @del="del(task._id)"
        v-for="task in tasks"
      />
    </div>
    <div class="ui fluid action input">
      <input type="text" placeholder="Enter a new task" v-model="newTask.title" @keyup.enter="add"/>
      <button class="ui icon button" @click="add">
        <i class="plus icon"/>
      </button>
    </div>
    <!-- <pre>{{tasks}}</pre> -->
  </div>
</template>

<script>
import Item from './todo/Item.vue'

export default {
  components: {Item},
  data () {
    return {
      tasks: [],
      newTask: {
        title: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return this.$http.get('tasks')
        .then(res => res.body)
        .then(tasks => this.tasks = tasks)
    },
    add () {
      if (!this.newTask) return
      this.$http.post('tasks', this.newTask)
        .then(this.newTask.title = '')
        .then(this.fetch)
    },
    del (_id) {
      console.log('#_id:', _id)
      this.$http.delete(`tasks/${_id}`)
        .then(this.fetch)
    }
  }
}
</script>
