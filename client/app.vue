<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>state:{{count}}</p>
        <p>getters:{{fullName}}</p>
        <p>命名空间:{{textA}}_{{textPlus}}</p>
        <p>注册模块:{{textC}}</p>
        <button @click="notify">click me</button>
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to='/app/123'>app123</router-link>
        <router-link to='/app/456'>app456</router-link>
        <!-- <router-link to='/app'>app</router-link> -->
        <router-link to='/login'>login</router-link>
        <router-link to='/login/exact'>login exact1</router-link>
        <!-- <todo></todo> -->
        <!-- <notification content = 'test notify'></notification> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
        <!-- <router-view name="a"/> --> <!-- 命名空间-路由转换 -->
    </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Jock\'s Todo App'
  },
  components: {
    Header, Footer, Todo
  },
  mounted () {
    console.log(this.$route) // 打印路由匹配的信息Query键值对内容
    console.log(this.$store) // 打印store
    // this.$store.state.count = 3 // store在外面也可以修改，但是vue官方不建议
    // console.log(this.$store.state.count)
    // this.$store.dispatch('updateCountAsnyc', {
    //   num: 5,
    //   time: 2000
    // }) // dispatch用来触发actions
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++) // commit用来触发mutations
    // }, 1000) // router和store不能每次都用同一个，会导致内存溢出的问题
    this.updateCountAsync({
      num: 10,
      time: 2000
    })
    // this.updateText('123')
    this['a/updateText'](456)
    console.log('textPlus', this['a/textPlus'])
    this['a/add']()
    this.testAction()
    // let i = 1
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000) // 测试store.subscribe
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    // ...mapMutations(['updateCount', 'updateText']) // vuex会默认把所有的mutations放在全局中
    ...mapMutations(['updateCount', 'a/updateText']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  computed: {
    // 便利引用
    // ...mapState(['count']),
    ...mapState({
      count: (state) => state.count,
      textA: state => state.a.text, // 命名空间
      textC: state => state.c.text // 注册模块
    }),
    // ...mapGetters(['fullName', 'a/textPlus']) // 在模板里使用不方便，mounted可以打印
    ...mapGetters({
      'fullName': 'fullName',
      textPlus: 'a/textPlus'
    }) // 使用对象的方式。在模板里使用方便，mounted打印undefined
    // ...mapMutations(['updateCount']),
    // ...mapActions(['updateCountAsync']),
    // 简单直接引用
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // },
    // textA () {
    //   return this.$store.state.a.text
    // }
  }
}
</script>
<style lang = "stylus" scoped>
#app{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    color grey
}
</style>
