<template>
  <div class="layout">
    <div class="ui left vertical menu sidebar">
      <a class="item">
        Item 1
      </a>
      <a class="item">
        Item 2
      </a>
      <a class="item">
        Item 3
      </a>
    </div>
    <div class="pusher">
      <div class="ui button" @click="toggleMenu">Menu</div>
      <Home id="app"/>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  components: {Home},
  methods: {
    toggleMenu () {
      $('.ui.sidebar')
        .sidebar({
          context: $('.layout')
        })
        .sidebar('attach events', '.layout .menu .item')
        .sidebar('toggle')
    }
  }
}
</script>

<style>
</style>
