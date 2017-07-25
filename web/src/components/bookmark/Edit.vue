<template>
  <div class="ui form">
    <div class="field">
      <label>URL</label>
      <input v-model="bookmark.url"/>
    </div>
    <div class="field">
      <label>Title</label>
      <input v-model="bookmark.title"/>
    </div>
    <div class="field">
      <label>Description</label>
      <textarea v-model="bookmark.description"/>
    </div>
    <div class="field">
      <label>Tags</label>
      <TagSelection v-model="bookmark.tags"/>
    </div>
  </div>
</template>

<script>
import TagSelection from './TagSelection.vue'

export default {
  components: {TagSelection},
  props: ['bookmark']
}
</script>
