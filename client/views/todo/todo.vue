<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value='filter' @change="handleChangeTab">
        <tab :label='tab' :index='tab' v-for="tab in stats" :key='tab'>
          <!-- <span>tab1 content{{inputContent}}</span> -->
        </tab>
      </tabs>
      <!-- <tabs :value='tabValue' @change="handleChangeTab">
        <tab label='tab1' index='1'>
          <span>tab1 content{{inputContent}}</span>
        </tab>
        <tab index='2'>
          <span slot="label" style="color:red">tab2</span>
          <span>tab2 content</span>
        </tab>
        <tab label='tab1' index='3'>
          <span>tab3 content</span>
        </tab>
      </tabs> -->
    </div>
    <input
      type="text"
      class="add-input"
      autofocus='autofocus'
      placeholder="接下来要做什么"
      @keyup.enter="handleAdd"
    >
    <!-- <input
      type="text"
      class="add-input"
      autofocus='autofocus'
      placeholder="接下来要做什么"
      @keyup.enter="addTodo"
    > -->
    <!-- <input
      type="text"
      class="add-input"
      v-model="inputContent"
      autofocus='autofocus'
      placeholder="接下来要做什么"
      @keyup.enter="addTodo"
    > -->
    <item
      :todo='todo'
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      @toggle ="toggleTodoState"
    />
    <!-- @keyup 也就等于 v-on:keyup -->
    <Helper
      :filter = 'filter'
      :todos="todos"
      @clearAllcompleted="clearAllCompleted"
    />
    <!-- <Helper
      :filter = 'filter'
      :todos="todos"
      @toggle='toggleFilter'
      @clearAllcompleted="clearAllcompleted"
    /> -->
    <router-view />
  </section>
</template>
<script>
import {
  mapState,
  mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
// let id = 0
export default {
  metaInfo: {
    title: 'The Todo App'
  },
  // 组件内部增加路由钩子
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this)
    // next()
    next(vm => {
      console.log('after enter vm.id is', vm.id)
    }) // 数据获取塞进组件
  }, // 这里没有通过next（）前，组件是没有被创建的，是拿不到组件的this的，不能调用this，因为没有上下文
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  }, // <router-link to='/app/123'>app</router-link>beforeRouterUpdate切换到app456时被触发
  // 即在使用同样的路由形式进行切换时才会被真正触发。应用场景：根据应用id去获取对应数据时，控制错误，弹框处理等
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    if (global.confirm('are you sure?')) {
      next()
    } // 用户填写很大的表单，一不小心点击别路由链接，导致表单修改问题。判断提醒是否离开。
  }, // 控制页面离开行为
  props: ['id'], // 相当于和vue-rooter代码进行耦合
  data () {
    return {
      // todos: [], // 联调就不需要了
      filter: 'all',
      // tabValue: '1',
      tabValue: 'all',
      // inputContent: '',
      stats: ['all', 'active', 'completed']
    }
  },
  mounted () {
    this.fetchTodos()
    // console.log(this.id) // 打印id
    console.log('todo mounted') // 路由跳转时，两个参数不同，但是显示的内容是同一个组件时，第二次路由不会被触发
  },
  // watch: {
  //   id
  // }, // 监听很麻烦
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteAllCompleted']),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // addTodo (e) {
    //   this.todos.unshift({
    //     id: id++,
    //     content: e.target.value.trim(),
    //     completed: false
    //   })
    //   e.target.value = ''
    // },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    // toggleFilter (state) {
    //   this.filter = state
    // },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
    },
    // clearAllcompleted () {
    //   this.todos = this.todos.filter(todo => !todo.completed),
    // },
    handleChangeTab (value) {
      // this.tabValue = value
      this.filter = value
    }
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      // 判断
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item, Helper
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
/* .tab-container{
  background #ffffff
  padding 0 15px
} */
</style>

