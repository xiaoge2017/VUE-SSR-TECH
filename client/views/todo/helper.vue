<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="clear" @click="clearAllCompleted">
      Clear Completed
    </span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearAllcompleted')
    },
    toggleFilter (state) {
      this.$emit('toggle', state)
    }
  },
  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    }
  }
}
</script>
<style lang="stylus" scoped>
.helper{
  text-align center
  .left{width:18%;display inline-block}
  .tabs{
    width 50%
    display inline-block
    margin 10px auto
    span{
      min-width 33%
      display inline-block
      }
    span:hover{
      cursor pointer
      color orange
    }
    span.actived{
      color red
      }
    }
  .clear{
    width 30%
    display inline-block
    color:grey
    border none
    outline none
    }
  .clear:hover{
    color black
    cursor pointer
    }
  input[type='button']{
    border-width 0
  }
}
</style>



