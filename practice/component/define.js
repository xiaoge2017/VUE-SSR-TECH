import Vue from 'vue'

const compoent = {
  // props: ['active', 'propOne'], // 这种定义也可以，相对来说不太严谨
  props: {
    active: {
      // type: Boolean,
      // required: true, // 不传就会报错
      // default: true // 一般情况下，default就不需要required，不会同时出现.
      // default () {
      //   return {} // 如果props里面是一个对象,default要return一个方法
      // }
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String
    // onChange: Function
  },
  template: `
  <div>
    This is Component<input v-model="text">
    <p><span v-show='active'>see</span></p>
    <p @click ='handleChange'>{{propOne}}</p>
  </div>
  `,
  // mounted () {
  //   this.propOne = 'propOne changed'
  // }, // 虽然修改成功了，但是会有警告.作为子节点不应该去修改父节点给的约束，如果要修改父节点定义，说明组件本身行为定义就没做好
  // data: {
  //   text: 123
  // } // 报错：在使用data定义逐渐数据时候，如果不是通过new一个vue的方式，而是要注册到全局或者某个实例里，必须要使用一个function
  data () {
    return {
      text: 0
    }
  }, // 不使用return一个单独的对象，会导致使用上的问题
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }
  }
}
// Vue.component('CompOne', compoent) // 外部定义组件
new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  }, // 内部定义组件
  data () {
    return {
      // propOne: 'inner',
      prop1: 'text1'
    }
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log('refs.comp1', this.$refs.comp1)
  },
  template: `
  <div>
    <comp-one ref='comp1' :active='true' :prop-one="prop1" @change="handleChange"></comp-one>
    <comp-one :active='false' prop-one='text2'></comp-one>
  </div>
  `
})
