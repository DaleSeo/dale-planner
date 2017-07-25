<template>
  <div>
    <TagFilter v-model="query.tag"/>
    <div class="ui left icon input" :class="{loading}">
      <i class="search icon"/>
      <input type="text" placeholder="Search..." v-model="query.keyword">
    </div>
    <div class="ui teal right floated icon labeled button" @click="$emit('add')">
      <i class="plus icon"/>New
    </div>
    <div class="ui divider"></div>
  </div>
</template>

<script>
import TagFilter from './TagFilter.vue'

export default {
  components: {TagFilter},
  props: ['query', 'loading']
}
</script>
