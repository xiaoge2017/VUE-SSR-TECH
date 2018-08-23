import Vue from 'vue'

// 全局变量报错property or method "globalVar" is not defined
var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  template: `
    <div>
      <div ref="div">{{isActive ? 'active' : 'not active'}}</div>
      <div>{{arr.join(' ')}}</div>
      <p>{{Date.now()}}</p>
      <p>{{html}}</p>
      <p>{{globalVar}}</p>
      <div v-bind:id = 'aaa' v-on:click = "handleClick">
        <p v-html = 'html'></p>
      </div>
      <div :id = 'aaa' @click = "handleClick">
        <p v-html = 'html'></p>
      </div>
      <div :class = "{active: !Active}">
        <p v-html = 'html'></p>
      </div>
      <div :class = "[isActive ? 'active' : '']">
        <p v-html = 'html'></p>
      </div>
      <div :class = "[{active: isActive}]">
        <p v-html = 'html'></p>
      </div>
      <div :class = "[{active: isActive}]"
        :style = "styles"
      >
        <p>{{getJoinedArr(arr)}}</p>
      </div>
      <div :class = "[{active: isActive}]"
        :style = "[styles, styles2]"
      >
        <p>{{getJoinedArr(arr)}}</p>
      </div>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>', // 防止注入攻击
    aaa: 'main',
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'blue',
      appearance: 'none'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join('')
    }
  }
})
