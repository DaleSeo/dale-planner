<template>
  <span class="ui teal tiny labels">
    <div class="ui tag label" v-for="tag in tags">{{tag}}</div>
  </span>
</template>

<script>
export default {
  props: ['tags']
}
</script>
