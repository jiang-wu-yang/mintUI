<template>
  <div>
    <!-- 底部 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <img slot="icon" v-if="selected!='index'" src="../assets/img/main_0.png">
        <img slot="icon" v-else src="../assets/img/main_1.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="me">
        <img slot="icon" v-if="selected!='me'" src="../assets/img/me_0.png">
        <img slot="icon" v-else src="../assets/img/me_1.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navactive: "1",
      selected: "me"
    };
  },
  watch: {
    selected(newval, oldval) {
      //根据newval执行路由跳转
      if(newval=='index'){
          this.$router.push('/')
      }else if(newval=='me'){
          this.$router.push('/me')
      }
    }
  }
};
</script>
