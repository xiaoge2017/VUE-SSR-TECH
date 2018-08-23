import Vue from 'vue'

const compoent = {
  model: {
    prop: 'value1',
    event: 'change' // event就是默认组件要$emit
  },
  props: ['value', 'value1'],
  template: `
  <div>
    <input type="text" @input="handleInput" :value="value1">
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  name: 'Root',
  el: '#root',
  components: {
    compOne: compoent
  },
  data: {
    value: '123'
  },
  template: `
  <div>
    <comp-one :value="value" @input="value = arguments[0]"></comp-one>
    <comp-one v-model = 'value'></comp-one>
  </div>
  `
})
// 自定义v-model时可以给名称，扩展输入组件时使用，例如功能强大一些的编辑器
