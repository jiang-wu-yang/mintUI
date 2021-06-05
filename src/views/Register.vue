<template>
  <div>
    <mt-header title="注册">
      <!-- 按钮组件 -->
      <mt-button icon="back" slot="left">返回</mt-button>
      <router-link to="/login" slot="right">登录</router-link>
    </mt-header>

    <!-- 表单 -->
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
    <mt-field
      v-model="repwd"
      :state="repwdState"
      @blur.native.capture="checkrepwd"
      type="password"
      label="确认密码"
      placeholder="请确认密码"
      disbaleClear
    ></mt-field>
    <mt-button @click="checkForm" type="primary" size="large">注册</mt-button>
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
      pwdState: "",
      repwd: "",
      repwdState: ""
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
    //验证确认密码
    checkrepwd() {
      let reg = /^\d{6}$/;
      if (this.pwd === this.repwd && reg.test(this.repwd)) {
        //4.如果合法？
        this.repwdState = "success";
        return true;
      } else {
        //不合法？
        this.repwdState = "error";
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
      //验证确认密码
      this.checkrepwd();

      if (this.checkUsername() && this.checkpwd() && this.checkrepwd()) {
        //发送http请求，执行注册业务
        this.axios.post('/register',`username=${this.username}&password=${this.pwd}`)
        .then(result=>{
          console.log(result)
          if(result.data.code==200){ //成功
            this.$toast({
              message:'注册成功',
              position:'bottom',
              duration:3000
            })
            //跳转到登录
            this.$router.push('/login')
          }else if(result==201){  //失败
            this.$toast({
              message:'用户已注册',
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

