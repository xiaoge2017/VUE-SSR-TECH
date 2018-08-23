import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
    <p>Name:{{firstName + ' ' + lastName}}</p>
    <p>Name:{{name}}</p>
    <p>Name:{{getName()}}</p>
    <p>Number:{{number}}</p>
    <p>FullName:{{fullName}}</p>
    <p><input type="text" v-model="number"></p>
    <p>firstName:<input type="text" v-model="firstName"></p>
    <p>lastName:<input type="text" v-model="lastName"></p>
    <p>Name:<input type="text" v-model="name"></p>
    <p>Obj.a:<input type="text" v-model="obj.a"></p>
  </div>
  `,
  data: {
    number: 0,
    firstName: 'jocky',
    lastName: 'Lou',
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    // name () {
    //   console.log('new name')
    //   return `${this.firstName} ${this.lastName}`
    // }
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      }, // computed被重新渲染，会提升应用性能,computed依赖的值有变化，就会重新计算
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      } // computed也可以做设置值操作，但是不推荐，一般用于组合计算
    }
  }, // computed方法调用，有缓存
  mounted () {
    this.obj = {
      a: '234'
    }
  }, // 只有个obj赋值的时候，才会监听到，内部属性不能触发
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true // 当值变化，立刻执行
    },
    obj: {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true, // 当值变化，立刻执行
      deep: true // 可以遍历obj，就可以监听到，但是性能开销比较大
    } // obj是一个对象，对象里面有很多的属性，默认情况下handler只监听obj属性引用的变化
    // 'obj.a': {
    //   handler () {
    //     console.log('obj.a changed')
    //     this.obj.a += 1
    //   },
    //   immediate: true
    // } // 出现了一个无限循环的错误
  }, // 不适用于要显示某个数据的拼装，适合监听到一个值得变换发送到后台请求
  // 不要在computed和watched里面修改依赖的值，computed尽量只是修改新值
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    } // getName（）被重新渲染
  }
})
