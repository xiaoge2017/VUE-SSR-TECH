<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{count}}</p>
        <p>{{fullName}}</p>
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to='/app/123'>app123</router-link>
        <router-link to='/app/456'>app456</router-link>
        <!-- <router-link to='/app'>app</router-link> -->
        <router-link to='/login'>login</router-link>
        <router-link to='/login/exact'>login exact1</router-link>
        <!-- <todo></todo> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
        <!-- <router-view name="a"/> --> <!-- 命名空间-路由转换 -->
    </div>
</template>
<script>
import {
  mapState
  // mapGetters
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header, Footer, Todo
  },
  mounted () {
    console.log(this.$route) // 打印路由匹配的信息Query键值对内容
    console.log(this.$store) // 打印store
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 1000) // router和store不能每次都用同一个，会导致内存溢出的问题
  },
  computed: {
    // 便利引用
    ...mapState(['count']),
    // 简单直接引用
    // count () {
    //   return this.$store.state.count
    // },
    fullName () {
      return this.$store.getters.fullName
    }
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
