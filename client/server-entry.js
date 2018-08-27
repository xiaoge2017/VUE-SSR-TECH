import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()
    router.push(context.url) // 前面还都是对象，只有router.push服务端才会执行
    router.onReady(() => { // outer.onReady在所有异步操作都做完了后才会执行这个回调
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
