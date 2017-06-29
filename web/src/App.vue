<template>
  <div id="app" class="ui segment pushable">
    <div class="ui inverted vertical icon labeled menu sidebar">
      <div class="item" @click="select('home')">
        <i class="home icon"/>Dale's Home
      </div>
      <div class="item" @click="select('planner')">
        <i class="checked calendar icon"/>Planner
      </div>
      <div class="item" @click="select('bookmarks')">
        <i class="bookmark icon"/>Bookmarks
      </div>
    </div>
    <div class="pusher">
      <div class="ui basic segment">
        <div class="ui icon button" @click="toggleMenu">
          <i class="sidebar icon"/>
        </div>
        <Bookmarks v-show="menuItem === 'bookmarks'"/>
        <Home v-show="menuItem !== 'bookmarks'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Bookmarks from './Bookmarks.vue'

export default {
  components: {Home, Bookmarks},
  data () {
    return {
      menuItem: 'home'
    }
  },
  mounted () {
    $('#app .ui.sidebar')
      .sidebar({
        context: $('#app')
      })
      .sidebar('attach events', '#app .menu .item')
  },
  methods: {
    toggleMenu () {
      $('#app .ui.sidebar')
        .sidebar('toggle')
    },
    select (menuItem) {
      console.log('#selected:', menuItem)
      this.menuItem = menuItem
    }
  }
}
</script>

<style>
</style>
