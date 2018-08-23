import Vue from 'vue'

const app = new Vue({
  el: '#root', // beforeMount mounted 执行一遍
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this, this.$el, 'beforeCreate')
  }, // 服务端渲染时被调用,不要去修改data数据
  created () {
    console.log(this, this.$el, 'created')
  }, // 服务端渲染时被调用,最早去ajax请求数据的时候
  beforeMount () {
    console.log(this, this.$el, 'beforeMount')
  }, // 在服务端渲染的时候是不会被调用的
  mounted () {
    console.log(this, this.$el, 'mounted')
  }, // 在服务端渲染的时候是不会被调用的
  updated () {
    console.log(this, this.$el, 'updated')
  },
  activated () {
    console.log(this, this.$el, 'activated')
  },
  deactivated () {
    console.log(this, this.$el, 'deactivated')
  },
  destroyed () {
    console.log(this, this.$el, 'destroyed')
  },
  render (h) {
    // throw new TypeError('render error') // renderError使用
    console.log('render function invoked') // beforeMount之后,beforeMount之前执行
    return h('div', {}, this.text)
  }, // 和上面给的template方式是一样的
  renderError (h, err) {
    return h('div', {}, err.stack)
  }, // 只有在开发环境时本组件render出现错误时才会使用，如果下面有子组件报错，是不会显示的
  errorCaptured () {

  } // 可以用在正式环境中，而且子组件报错也可以捕获，除非子组件关闭掉向上冒泡
})
app.$mount('#root')
// setInterval(() => {
//   app.text += 1
// }, 1000) // 数据更新时执行，updated和beforeupdated

// setTimeout(() => {
//   app.$destroy()
// }, 1000) // 销毁时执行，beforeDestory和destory
