import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 'text',
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')

app.text = 0
// let i = 0
setInterval(() => {
  // i++
  // app.text += 1
  // app.obj.a = app.text
  // app.obj.a = i
  // app.$forceUpdate() // 强制刷新，不建议这么使用，除非万不得已
  // app.$set(app.obj, 'a', i)
  // app.$options.data.text += 1 // 没变化，说明options的值是做过处理的
  // app.$data.text += 1 // 有变化，说明app.text += 1这个相通

  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root) // vue的instance
// console.log(app.$root === app) // true
// console.log(app.$children) // []
// console.log(app.$refs) // {}

// console.log(app.$isServer) // 只有在服务端渲染时，会做这个判断

// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })

// setTimeout(() => {
//   unWatch()
// }, 2000)

// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

// app.$emit('test', 1, 2) // 事件监听，必须是同一个对象，不会往上冒泡

// app.$once('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)
