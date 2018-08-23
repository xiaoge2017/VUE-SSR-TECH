import Vue from 'vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createStore from './store/store'
import createRouter from './config/router'

// 测试使用
// import './assets/styles/test.css'
// import './assets/styles/test-stylus.styl'
// import './assets/images/bg.jpg'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 直接设置根节点
// const root = document.createElement('div')
// document.body.appendChild(root)
// new Vue({
//   router,
//   render: (h) => h(App)
// }).$mount(root)

// 路由守卫(导航钩子),路由配置时增加钩子.执行顺序不同，每次跳转都会被触发
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   // next('/login')
  //   next({path: '/login', replace: true}) // replace返回的不是跳转之前那个，而是再之前的那个，这次记录被replace掉。能够传的和router-view上定义的是一样的
  // } else {
  //   next()
  // } // 可以做校验。一些页面是需要用户去登陆才能显示
})
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})
router.afterEach((to, from) => {
  console.log('after each invoked')
})

// 通过模板设置根节点
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#root')
