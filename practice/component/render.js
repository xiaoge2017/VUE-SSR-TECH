import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  // <div :style="style">
  //   <slot></slot>
  // </div>
  // `,
  // render (createElement) {
  //   return createElement('div', {
  //     style: this.style
  //   }, this.$slots.default)
  // },
  // render (createElement) {
  //   return createElement('div', {
  //     style: this.style
  //   }, [
  //     this.$slots.default,
  //     this.props1])
  // }, // 添加props
  render (createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      this.$slots.header,
      this.props1])
  }, // 绑定事件
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'comp值'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    compOne: component
  },
  data () {
    return {
      value: 'Vue值'
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.comp.value, this.$refs.span) // 第一个打印出来的是VueComponent
  },
  // template: `
  // <div>
  //   <comp-one ref = "comp">
  //     <span ref='span'>{{value}}</span>
  //   </comp-one>
  // </div>
  // `,
  // render () {
  //   return this.$createElement()
  // },
  // render (createElement) {
  //   return createElement('comp-one', {
  //     ref: 'comp'
  //   }, [createElement('span', {
  //     ref: 'span'
  //   }, this.value)]) // 第三个参数必须作为数组传入
  // }, // 参数1：节点；参数2：节点上的属性-对象标识；参数3：组件的内容（节点-数组表明，字符串-不需要数组）
  render (createElement) {
    return createElement('comp-one', {
      ref: 'comp',
      props: {
        props1: this.value
      }, // 添加props
      // on: {
      //   click: this.handleClick
      // },
      nativeOn: {
        click: this.handleClick
      } // nativeOn会绑定到组件的根节点的原生dom上
    }, [createElement('span', {
      ref: 'span',
      slot: 'header',
      domProps: {
        innerHTML: '<span>345</span>'
      }, // domProps替换掉，导致后面声明的this.value就无效了
      attrs: {
        id: 'test-id'
      }
    }, this.value)])
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})
// template最终是会被编译成这样一个render的方法的
// createElement就是vue创造的虚拟dom的概念，创建的并不是真正的html节点，而是一个叫做v-node的一个类，在内存里会存储的类似dom结构，如果发现这部分需要被更新，才会转换成真正的dom，填充到真正的dom里
