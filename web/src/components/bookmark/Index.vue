<template>
  <div class="ui container">
    <div class="ui basic segment">
      <Search :query="query" :loading="loading" @add="add"/>
      <EditModal
        :bookmark="bookmark"
        @approve="save"
        @hide="hide"
      />
      <List
        :bookmarks="bookmarks"
        @edit="edit"
        @reset="reset"
      />
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
import EditModal from './EditModal.vue'
import List from './List.vue'

export default {
  components: {Search, EditModal, List},
  data () {
    return {
      bookmarks: [],
      bookmark: null,
      query: {
        tag: '',
        keyword: ''
      },
      loading: false
    }
  },
  watch: {
    'query.keyword': function (val) {
      if (0 < val.length && val.length < 2) return
      this.fetch()
    },
    'query.tag': function (val) {
      this.fetch()
    }
  },
  created () {
    this.fetch()
  },
  mounted () {
    $(`#new.ui.modal`)
      .modal({
        onApprove: this.add
      })
  },
  methods: {
    initBookmark () {
      return {
        url: '',
        title: '',
        description: '',
        tags: []
      }
    },
    reset () {
      console.log('#reset')
      this.bookmark = null
      this.query = {
        tag: '',
        keyword: ''
      }
      this.fetch()
    },
    fetch () {
      console.log('#fetch')
      this.loading = true
      let url = `/bookmarks?keyword=${this.query.keyword}&tag=${this.query.tag}`
      this.$http.get(url)
        .then(res => res.body)
        .then(bookmarks => this.bookmarks = bookmarks)
        .then(_ => this.loading = false)
    },
    save () {
      console.log('#save')
      let http
      if (this.bookmark._id) {
        http = this.$http.put(`/bookmarks/${this.bookmark._id}`, this.bookmark)
      } else {
        http = this.$http.post(`/bookmarks`, this.bookmark)
      }
      http.then(_ => {
        this.fetch()
        this.bookmark = null
      })
    },
    hide () {
      console.log('#hide')
      this.bookmark = null
    },
    add () {
      console.log('#add')
      this.bookmark = this.initBookmark()
    },
    edit (bookmark) {
      console.log('#edit')
      this.bookmark = bookmark
    }
  }
}
</script>
