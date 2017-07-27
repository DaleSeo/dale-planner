<template>
  <div class="ui segment">
    <h2 class="ui center aligned icon header">
      <i class="list icon"/>Todos
      <div class="sub header">{{tasks.length}} items</div>
    </h2>
    <StatusFilter v-model="query.completed" @fetch="fetch"/>
    <div class="ui list">
      <Item
        :key="task._id"
        :task="task"
        @del="del(task._id)"
        @fetch="fetch"
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
import Item from './Item.vue'
import StatusFilter from './StatusFilter.vue'

export default {
  components: {Item, StatusFilter},
  data () {
    return {
      tasks: [],
      newTask: {
        title: ''
      },
      query: {
        completed: false,
        keyword: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      let url = `tasks?completed=${this.query.completed}`
      return this.$http.get(url)
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
