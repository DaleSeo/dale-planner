require('./monitor')

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.filter('formatDate', function (date) {
    return moment(date).format('YY/MM/DD')
})

// import Home from './components/home/Index.vue'
import Test from './components/test/Index.vue'
import Todos from './components/todo/Index.vue'
import Bookmarks from './components/bookmark/Index.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    // {path: '/', component: Home},
    {path: '/test', component: Test},
    {path: '/todos', component: Todos},
    {path: '/bookmarks', component: Bookmarks}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
