<template>
  <div>
    <mt-header title="登录">
      <!-- 按钮组件 -->
      <mt-button icon="back" slot="left">返回</mt-button>
      <router-link to="/register" slot="right">注册</router-link>
    </mt-header>

    <mt-field
      v-model="username"
      :state="usernameState"
      @blur.native.capture="checkUsername"
      type="text"
      label="用户名"
      placeholder="请输入用户名"
      disbaleClear
    ></mt-field>
    <mt-field
      v-model="pwd"
      :state="pwdState"
      @blur.native.capture="checkpwd"
      type="password"
      label="密码"
      placeholder="请输入密码"
      disbaleClear
    ></mt-field>
    <mt-button @click="checkForm" type="primary" size="large">登录</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //1.验证用户名
      //2.获取文本框的值
      username: "",
      usernameState: "",
      pwd: "",
      pwdState: ""
    };
  },
  methods: {
    //验证密码
    checkpwd() {
      let reg = /^\d{6}$/;
      if (reg.test(this.pwd)) {
        //4.如果合法？
        this.pwdState = "success";
        return true;
      } else {
        //不合法？
        this.pwdState = "error";
        return false;
      }
    },
    //验证账号
    checkUsername() {
      //3.通过正则，验证文本框
      let reg = /^\w{6,15}$/;
      if (reg.test(this.username)) {
        //4.如果合法？
        this.usernameState = "success";
        return true;
      } else {
        //不合法？
        this.usernameState = "error";
        return false;
      }
    },
    checkForm() {
      //验证用户名
      this.checkUsername();
      //验证密码
      this.checkpwd();

      if (this.checkUsername() && this.checkpwd()) {

        //发送请求，执行登录业务
        this.axios.post('/login',`username=${this.username}&password=${this.pwd}`)
        .then(result=>{
          console.log(result)
          if(result.data.code==200){
            this.$toast({
              message:'登录成功',
              position:'bottom',
              duration:3000
            })
            //访问vuex，更新登录状态
            //把服务端响应中保存的用户名，传给loginOk
            let username = result.data.result.username;
            this.$store.commit('loginOk',username);

            //向sessionstorage中存储islogin和username
            sessionStorage.setItem('islogin','true');
            sessionStorage.setItem('username',username)

            //跳转到主页
            this.$router.push('/')
          }else if(result==201){  //失败
            this.$toast({
              message:'用户账号密码不匹配',
              position:'bottom',
              duration:3000
            })
          }
        })
      }
    }
  }
};
</script>
