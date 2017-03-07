/**
* Created by zhangjiuyi on 2017/3/4.
*/
<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class="errorMessage">{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>


<script>
  console.log('我是signup')
  import AV from '../lib/leancloud'

  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'



  export default {
  	name: 'SignUlForm',
    data() {
  		return {
  			formData: {
  				username: '',
          password: ''
        },
        errorMessage: ''
      }
    },

    methods: {
  		signUp() {
  			let {username, password} = this.formData
        var user = new AV.User();
  			user.setUsername(username);
  			user.setPassword(password);
  			user.signUp().then(() => {
          this.$emit('success', getAVUser())
        },(error) =>{
          this.errorMessage  = getErrorMessage(error)
        })
      }
    }
  }

  console.log('我是signup')

</script>


<style>

</style>

