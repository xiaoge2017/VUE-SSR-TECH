import Vue from 'vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createStore from './store/store'
import createRouter from './config/router'
// import mutations from './store/mutations/mutations'

// 测试使用
// import './assets/styles/test.css'
// import './assets/styles/test-stylus.styl'
// import './assets/images/bg.jpg'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 动态注册模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

// 解绑注册模块
// store.unregisterModule('c')

// store.watch((state) => state.count + 1, (newCount) => { // store.watch接受2各参数，必须是方法
//   console.log('new count watched:', newCount)
// })

// store.subscribe((mutations, state) => {
//   console.log('subscribe-mutations.type:', mutations.type)
//   console.log('subscribe-mutations.payload:', mutations.payload)
// }) // 任何mutations被调用的时候，都可以拿到回调，在回调里做记录

store.subscribeAction((action, state) => {
  console.log('subscribeAction-action.type:', action.type)
  console.log('subscribeAction-action.payload:', action.payload)
}) // 任何action被调用的时候，都可以拿到回调(命名空间里的时undefined？)

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
