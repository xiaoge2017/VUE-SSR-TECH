import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: {
      required: true
    }
  },
  template: `
  <div>
    This is Component<input v-model="text">
    <p><span v-show='active'>see</span></p>
    <p @click ='handleChange'>{{propOne}}</p>
  </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  }, // 两个都会被调用，但是先调用的是内部的，然后是instance的
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// const CompVue = Vue.extend(compoent)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '1234'
//   }, // 通过new传入的会覆盖默认值的
//   mounted () {
//     console.log('instance munted')
//   } // 两个都会被调用，但是先调用的是内部的，然后是instance的
// })

const parent = new Vue({
  name: 'parent'
})

const compoent2 = {
  parent: parent, // parent没有改变，依然是root实例
  extends: compoent,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    // console.log('comp2 mounted') // 同样是先调用继承之前的，再调用之后的
    console.log('this.$parent.$options.name:', this.$parent.$options.name)
    this.$parent.text = '12345' // 可以在子组件内部通过this.$parent调用父组件
  }
}

new Vue({
  parent: parent, // 只有在通过new vue的时候才能指定他的parent。如果通过声明一个组件，组件是通过模板方式编译的，得到的parent是通过vue渲染的时候指定的，没有办法进行修改
  name: 'Root',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name)
  },
  components: {
    Comp: compoent2
  },
  data: {
    text: 2333
  },
  template: `
  <div>
    <span>{{text}}</span>
    <comp></comp>
  </div>
  `
})
