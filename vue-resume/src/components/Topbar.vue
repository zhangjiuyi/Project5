/**
* Created by jiuyi on 2017/2/6.
*/

<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <div class="userActions" v-if="logined">
          <span class="welcome">你好, {{user.username}}</span>
          <a href="#" class="button" @click.prevent="signOut">登出</a>
        </div>
        <div class="userActions" v-else>
          <a class='button primary' href="#" @click.prevent="signUpDialogVisible = true">注册</a>
          <a class='button' href="#" @click.prevent="signInDialogVisible = true">登录</a>
        </div>
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
    </div>

    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="signIn($event)"/>
    </MyDialog>
    <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
  </div>
</template>

<script>

  import MyDialog from './MyDialog'
  import SignUpForm from './SignUpForm'
  import SignInForm from './SignInForm'

  import AV from '../lib/leancloud'
  console.log('我是topbar')

  export default {
    name: 'Topbar',
    data() {
    	return {
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    components: {
    	MyDialog,
      SignUpForm,
      SignInForm
    },
    computed: {
    	user() {
    		return this.$store.state.user
      },
      logined() {
    		return this.user.id
      }
    },
    methods: {
    	signOut() {
        AV.User.logOut()
        this.$store.commit('removeUser')
      },
    	signIn(user) {
    		this.signUpDialogVisible = false
    		this.signInDialogVisible = false
        this.$store.commit('setUser',user)
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>

  #topbar{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    .wrapper{
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo{
      color: #000;
      font-size: 24px;
    }
    .button{
      width: 72px;
      height: 32px;
      border: none;
      font-size: 18px;
      background: #ddd;
      color: #222;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      &:hover{
        box-shadow: 1px 1px 1px hsla(0,0,0,0.5);
      }
      &.primary{
        background: #02af5f;
        color: #fff;
      }
    }
    .actions{
      display: flex;
      .userActions{
        margin-right: 3em;
        .welcome{
          margin-right: .5em;
        }
      }
    }
  }



</style>
