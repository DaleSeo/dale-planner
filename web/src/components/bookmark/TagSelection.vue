<template>
  <div id="TagSelection" class="ui fluid multiple search selection dropdown">
    <input type="hidden">
    <i class="dropdown icon"></i>
    <span class="default text">Select Tags</span>
    <div class="menu">
      <div class="item" :data-value="tag" v-for="tag in tags">{{tag}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.$http.get('/bookmarks/tags')
      .then(res => this.tags = res.body)
  },
  mounted () {
    console.log('#mounted')
    $('#TagSelection.ui.dropdown').dropdown({
      allowAdditions: true,
      onChange: (value, text, $choice) => {
        console.log('#onChange:', value)
        let arr = value ? value.split(',') : []
        if (arr != this.value) this.$emit('input', arr)
      }
    })
    let str = this.value ? this.value.join() : ''
    console.log('#str:', str)
    $('#TagSelection.ui.dropdown').dropdown('set selected', this.value)
  },
  updated () {
    console.log('#updated')
    $('#TagSelection.ui.dropdown').dropdown({
      allowAdditions: true,
      onChange: (value, text, $choice) => {
        console.log('#onChange:', value)
        let arr = value ? value.split(',') : []
        if (arr != this.value) this.$emit('input', arr)
      }
    })
    let str = this.value ? this.value.join() : ''
    console.log('#str:', str)
    $('#TagSelection.ui.dropdown').dropdown('set selected', this.value)
  }
  // methods: {
  //   change (event) {
  //     console.log('#change:', event.target.value)
  //     let arr = event.target.value ? event.target.value.split(',') : []
  //     console.log('arr:', arr)
  //     console.log('this.vlaue:', this.value)
  //     if (arr !== this.value) this.$emit('input', arr)
  //   }
  // }
}
</script>
