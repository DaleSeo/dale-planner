<template>
  <div class="item">
    <div class="content">
      <div class="header">
        <div class="ui labeled button">
          <div class="ui icon labeled button" @click="visit">
            <i class="world icon"/>{{bookmark.url}}
          </div>
          <div class="ui basic left pointing label" @click="toggleDetails">{{bookmark.title}}</div>
        </div>
        <TagLabels :tags="bookmark.tags"/>
      </div>
      <div class="meta" v-show="showDetails">
        <i class="green check icon"/> {{bookmark.visits || 0}} visits
      </div>
      <div class="ui segment description" v-show="showDetails">
        <span class="pre-wrap">{{bookmark.description}}</span>
      </div>
      <div class="extra" v-show="showDetails">
        <div class="ui teal mini icon labeled button" @click="edit">
          <i class="edit icon"/>Edit
        </div>
        <i class="calendar icon"/>
        <span v-if="bookmark.visited">visited on {{bookmark.visited | formatDate}}</span>
        <span v-if="bookmark.updated">updated on {{bookmark.updated | formatDate}}</span>
        created on {{bookmark.created | formatDate}}
      </div>
    </div>
  </div>
</template>

<script>
import Edit from './Edit.vue'
import TagLabels from './TagLabels.vue'

export default {
  components: {Edit, TagLabels},
  props: ['bookmark'],
  data () {
    return {
      showDetails: false,
    }
  },
  methods: {
    visit () {
      window.open(this.bookmark.url, '_blank')
      this.$http.patch(`/bookmarks/${this.bookmark._id}/visit`)
      this.$emit('reset')
    },
    toggleDetails () {
      this.showDetails = !this.showDetails
    },
    edit () {
      this.$emit('edit')
    }
  }
}
</script>

<style>
.pre-wrap {
  white-space: pre-wrap;
}
</style>
