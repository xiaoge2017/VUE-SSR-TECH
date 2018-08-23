// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app',
    path: '/app/:id',
    props: true, // id传到Todo的组件里,
    // props: {
    //   id: '456'
    // }, // 指定props传递内容,会覆盖传参,建议使用props：true
    // props: (route) => ({id: true.query.b}), // 拿到query，项目中用不到，暂时注释
    // component: Todo,
    component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'sadd'
    } // 利于seo优化，具体在路由守卫里讲
    // beforeEnter (to, from, next) {
    //   console.log('app route before enter')
    //   next()
    // }
    // children: [
    //   {
    //     path: 'rrr',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
    // component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // } // 路由转换.适用于：三栏布局（顶部栏，左侧菜单栏，右侧内容栏），点击顶部栏，左侧的菜单栏要做大的切换加一个router-view。用的不是很多，但是比较灵活。
  }
]
