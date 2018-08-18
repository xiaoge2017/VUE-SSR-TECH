<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header, Footer, Todo
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