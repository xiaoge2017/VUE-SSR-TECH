<template>
  <div :class="['todo-item',todo.completed ? 'completed' : '']">
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click="deleteTodo">删除</button>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang=stylus scoped>
.todo-item{
  vertical-align text-top
  border none
  padding 15px 2%
  width 88%
  margin 10px 4%
  border-bottom 1px solid #eee
  font-size 28px
  input[type="checkbox"],input[type="checkbox"]:checked{
    vertical-align text-top
    width 30px
    height 30px
  }
  .destory{
    min-width 40px
    height 30px
    color #aaa
    float  right
    background none
    border 1px solid #ccc
  }
  .destory:hover{
    cursor pointer
    color #666
    border 1px solid red

  }
}
</style>

