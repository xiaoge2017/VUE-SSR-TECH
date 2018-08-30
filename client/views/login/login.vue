<template>
  <div class="login-box">
    <form action="login-form" @submit="doSubmit" autocomplete="off">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">
        {{errorMsg}}
      </span>
    </h1>
    <input type="text" class="login-input"
    placeholder="User Name"
    v-model="username">
    <input type="password" class="login-input"
    placeholder="PassWord"
    v-model="password">
    <button class="login-btn" type="submit">登 录</button>
  </form>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  metaInfo: {
    title: 'Login Page'
  },
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    doSubmit (e) {
      e.preventDefault()
      if (this.validate()) {
        // 调用接口
        this.login({
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.$router.replace('/app')
          })
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-box
  max-width 400px
  padding 10px 2% 50px 2%
  margin 0 auto
  text-align center
  background #fff
  box-shadow  0 0 3px 3px rgba(0,0,0,0.2)
  border-radius 5px
.login-form
  display flex
  flex-direction column
  align-items flex-start
  width 350px
  margin 0 auto
  padding 10px
  background-color #fff
  h1
    font-weight 100
    color #3d3d3d
.login-input
  appearance none
  padding 6px 2%
  line-height 30px
  margin-bottom 20px
  border 1px solid #aaa
  width 96%
  border-radius 0
  box-shadow 0 0 0
.login-btn
  appearance none
  width 100%
  line-height 40px
  text-align center
  background-color #0d60c7
  color #eaeaea
  cursor pointer
  border-color #0d60c7
  transition all .3s
  &:hover
    color #fff
    background-color darken(#0d60c7, 10)
.error-msg
  font-size 12px
  color red

@media screen and (max-width: 600px) {
  .login-form {
    width 90%
  }
  .login-input{
    line-height 40px
  }
}
</style>

