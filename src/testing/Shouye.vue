<template>
  <div>
    <!-- 页头 -->
    <mt-header title="前端学习">
      <!-- 按钮组件 -->
      <div slot="right">
        <router-link to="/login" class="rl">登录</router-link>
        <router-link to="/register" class="rl">注册</router-link>
      </div>
    </mt-header>

    <!-- 导航 -->
    <mt-navbar v-model="navactive">
      <mt-tab-item id="1">人文</mt-tab-item>
      <mt-tab-item id="2">数码</mt-tab-item>
      <mt-tab-item id="3">监控</mt-tab-item>
      <mt-tab-item id="4">国际</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="navactive" style="margin-top:10px;">
      <mt-tab-container-item id="1">面板1</mt-tab-container-item>
      <mt-tab-container-item id="2">面板2</mt-tab-container-item>
      <mt-tab-container-item id="3">面板3</mt-tab-container-item>
      <mt-tab-container-item id="4">面板4</mt-tab-container-item>
    </mt-tab-container>

    <!-- 底部 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="shouye">
        <img slot="icon" v-if="selected!='shouye'" src="../assets/img/main_0.png">
        <img slot="icon" v-else src="../assets/img/main_1.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="wode">
        <img slot="icon" v-if="selected!='wode'" src="../assets/img/me_0.png">
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
      selected: "shouye"
    };
  },
  watch: {
    selected(newval, oldval) {
      //根据newval执行路由跳转
      this.$router.push("/" + newval);
    }
  }
};
</script>

<style>
.rl {
  color: #fff;
}
.rl:first-child {
  margin-right: 10px;
}
</style>


