const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'wyc' && user.password === 'wyc123') {
    ctx.session.user = {
      username: 'wyc'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'wyc'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
