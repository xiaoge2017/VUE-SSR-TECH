import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 去掉#号
    // base: '/base', // 在配置的所有路径都配置/base/(没有base也能显示，base路由不是强制的)
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link-qqq', // exact 匹配模式
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }, // 下次跳转的路由滚动
    // parseQuery (query) {

    // },
    // stringifyQuery (query) {

    // } // 提供自定义查询字符串的解析/反解析函数
    fallback: true // true是vue自动提供的hash的模式,当设置为false的时候单页应用就变成了多页应用，每次页面的跳转都会到后端再去返回内容.并不是所有浏览器都支持，这样的页面跳转内容切换的路由
  })
}
