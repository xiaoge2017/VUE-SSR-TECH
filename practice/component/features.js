import Vue from 'vue'

const ChildComponent = {
  // template: `
  //   <div>
  //     child component{{value}}
  //   </div>
  // `,
  template: `
    <div>
      child component{{data.value}}
    </div>
  `,
  // inject: ['yeye', 'value'],
  inject: ['yeye', 'data'], // 调用data.value，可以一起变化了.
  mounted () {
    console.log('baba:', this.$parent.$options.name)
    console.log('yeye:', this.yeye, this.value)
  }
}
const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <slot name="header"></slot>
  //     <slot name="body"></slot>
  //   </div>
  // `,
  // template: `
  // <div :style="style">
  //   <slot value='456' aaa='111'></slot>
  // </div>
  // `,
  template: `
  <div :style="style">
    <slot :value='value' aaa='111'></slot>
    <child-component/>
  </div>
  `,
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
  // provide () {
  //   return {
  //     yeye: this,
  //     value: this.value
  //   }
  // }, // 要通过function调用, 默认情况下,vue的provider是不提供reactive的属性的
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true // 可以读取
    })
    return {
      yeye: this,
      data
    }
  }, // vue的文档说明：这是一个比较hack的方法，不推荐使用，将来可能会改变，升级vue易出错
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
  //   <comp-one>
  //     <span slot='header'>this is header</span>
  //     <span slot='body'>this is body</span>
  //     <span>{{value}}</span>
  //   </comp-one>
  // </div>
  // `
  template: `
  <div>
    <comp-one ref = "comp">
      <span slot-scope='props'>{{props.value}}{{props.aaa}}{{value}}</span>
    </comp-one>
    <input type='text' v-model='value' />
  </div>
  `
})
// slot='' 具名插槽
// value和aaa属性作为props的内容放在solt-scope里
