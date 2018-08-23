import Vuex from 'vuex'

import defaultState from './state/state' // defaultState没有任何和业务相关的内容，只是一个默认的
import mutations from './mutations/mutations' // 操作的定义
import getters from './getters/getters' // getters可以理解是一个造vuex里面的computed

// 返回一个对象变量
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })

// export default store

// 返回一个方法
export default () => {
  return new Vuex.Store({
    // state: {
    //   count: 0
    // },
    state: defaultState, // defaultState而不是state，是因为有服务端渲染的过程，服务端渲染的的时候会有一些数据传到客户端，会让这部分数据覆盖掉defaultState的数据。
    // mutations: {
    //   updateCount (state, num) {
    //     state.count = num
    //   }
    // }
    mutations,
    getters
  })
}
