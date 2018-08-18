<template>
  <section class="real-app">
    <input 
      type="text"
      class="add-input"
      autofocus='autofocus'
      placeholder="接下来要做什么"
      @keyup.enter="addTodo"
    >
    <item 
      :todo='todo'
      v-for="todo in filterdTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <!-- @keyup 也就等于 v-on:keyup -->
    <tabs 
      :filter = 'filter' 
      :todos="todos"
      @toggle='toggleFilter'
      @clearAllcompleted="clearAllcompleted"
    
    />
  </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllcompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    filterdTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      // 判断
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item, Tabs
  }
}
</script>
<style lang=stylus scoped>
.real-app{
  width 70%
  min-width 500px
  padding 10px
  background #ffffff
  color #555555
  margin 20px auto
  box-shadow 0 0 10px 5px rgba(0,0,0,0.5)
  .add-input{
    width 84%
    font-size 24px
    border none
    margin 0 6%
    padding 20px 2%
    outline none
    border-bottom 1px solid #fff
  }
  .add-input:hover{
    color #333
    border-bottom 1px solid #ccc
    cursor pointer
  }
}
</style>

