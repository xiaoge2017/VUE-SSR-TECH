import Vuex from 'vuex'

import defaultState from './state/state' // defaultState没有任何和业务相关的内容，只是一个默认的
import mutations from './mutations/mutations' // 操作的定义,mutations是用来修改state的数据的，必须要同步操作
import getters from './getters/getters' // getters可以理解是一个造vuex里面的computed
import actions from './actions/actions' // 操作的定义,actions用来处理异步修改数据

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
const isDev = process.env.NODE_ENV === 'development'

// 返回一个方法-index.js写引入+use || 返回一个变量-模块热更替
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // true,这样外部无法修改state，规范开发人员。最好不要在正式环境这么使用。
    // state: {
    //   count: 0
    // },
    state: defaultState, // defaultState而不是state，是因为有服务端渲染的过程，服务端渲染的的时候会有一些数据传到客户端，会让这部分数据覆盖掉defaultState的数据。
    // mutations: {
    //   updateCount (state, num) {
    //     state.count = num
    //   }
    // }
    mutations, // 只接受2个参数，参数1：mutations的名称，参数2：一个对象。
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugin invoked')
      }
    ], // 定义插件
    modules: {
      a: {
        namespaced: true, // 如果不想不同空间相同名字下冲突，需要namespaced:true
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a-updateText')
            state.text = text
          }
        },
        // getters: {
        //   textPlus (state) {
        //     return state.text + 1
        //   }
        // }
        getters: {
          textPlus (state, getters, rootState) { // 参数1：state；参数2：所有的getters方法；参数3：全局的state
            // return state.text + rootState.count
            return state.text + rootState.b.text // 模块内部拿到全局的方法，同样的拿到b空间下的
          }
        },
        actions: {
          add ({state, commit, rootState}) {
            // commit('updateCount', rootState.count) // 在本a空间去找count, 可以显示，但是红色警告
            commit('updateCount', {num: 32}, {root: true})
          }
        }
      },
      b: {
        // namespaced: true, // true时，testAction 不执行
        state: {
          text: 2
        },
        actions: {
          testAction ({commit}) {
            commit('a/updateText', 'test text') // 去掉root：true依然成功
          }
        }
      }
    } // 模块，作用域不同
  })
  // 热更替，不用刷新修改
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
