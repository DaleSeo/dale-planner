<template>
  <div class="ui items">
    <Item
      :key="bookmark._id"
      :bookmark="bookmark"
      @edit="edit(bookmark)"
      @reset="$emit('reset')"
      v-for="bookmark in bookmarks"
    />
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {Item},
  props: ['bookmarks'],
  methods: {
    edit (bookmark) {
      this.$emit('edit', bookmark)
    }
  }
}
</script>
