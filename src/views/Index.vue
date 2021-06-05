<template>
  <div>
    <!-- 页头 -->
    <mt-header title="前端学习" fixed>
      <div slot="left" v-if="$store.state.islogin">欢迎:{{$store.state.username}}</div>
      <!-- 按钮组件 -->
      <div slot="right" v-else>
        <router-link to="/login" class="rl">登录</router-link>
        <router-link to="/register" class="rl">注册</router-link>
      </div>
      <div slot="right">注销</div>
    </mt-header>

    <!-- 导航 -->
    <mt-navbar v-model="navactive" fixed style="margin-top:40px;">
      <mt-tab-item :id="item.id+''" v-for="(item,i) in category" :key="i">{{item.category_name}}</mt-tab-item>
    </mt-navbar>

    <mt-tab-container style="margin:90px 0 55px 0;">
      <mt-tab-container-item
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="30"
        infinite-scroll-disbaled="busy"
        :infinite-scroll-immediate-check="true"
      >
        <!-- 轮播 -->
        <mt-swipe
          class="my"
          :speed="3000"
          :auto="3000"
          :showIndicators="false"
          :continuous="true"
          :style="{height:h}"
        >
          <mt-swipe-item>
            <img src="../assets/img/1.jpg" alt>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../assets/img/2.jpg" alt>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../assets/img/3.jpg" alt>
          </mt-swipe-item>
        </mt-swipe>

        <!-- 文章列表 -->
        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item,i) in articles" :key="i">
          <router-link :to="`/details?id=${item.id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">{{item.subject}}</div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg">
                <img :src="item.image" v-if="item.image">
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">{{item.description}}</div>
              <!-- 文章简介结束 -->
            </div>
            <!-- 文章图文信息结束 -->
          </router-link>
        </div>
        <!-- 单一文章信息结束 -->
      </mt-tab-container-item>
    </mt-tab-container>

    <!-- 底部 -->
    <mt-tabbar v-model="selected" fixed>
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
      selected: "index",
      h: "",
      category: [], //存储导航显示的类别列表
      articles: [], //存储当前页面显示的文章列表
      busy: false,
      page: 1 //存储当前页码
    };
  },
  methods: {
    //封装重复代码

    //加载文章列表   cid：类别id    page：页码    callback：拿到文章列表后的回调函数，返回articles数组
    loadArticles(cid, page, callback) {
      this.$indicator.open("加载中...");

      this.axios.get(`/articles?cid=${cid}&page=${page}`).then(result => {
        //处理文章的图片路径
        let articles = result.data.results;
        //遍历articles中的图片路径
        articles.forEach(item => {
          if (item.image != null) {
            item.image = require("../assets/articles/" + item.image);
          }
        });
        callback(articles); //回调callback

        this.$indicator.close();
      });
    },

    //加载下一页
    loadMore() {
      this.busy = true; //禁止无限滚动，防止重复执行
      // this.$indicator.open("加载中...");
      //发送请求
      let cid = this.navactive;
      this.page++;
      //加载列表
      this.loadArticles(cid, this.page, articles => {
        //追加
        this.articles = [...this.articles, ...articles];
        this.busy = false;
      });

      // this.axios.get(`/articles?cid=${cid}&page=${this.page}`).then(result => {
      //   console.log(result);
      //   //把result中的文章数组
      //   let articleAry = result.data.results;
      //   //处理图片路径
      //   articleAry.forEach(item => {
      //     if (item.image != null) {
      //       item.image = require("../assets/articles/" + item.image);
      //     }
      //   });
      // 追加到当前列表末尾
      //   this.articles = this.articles.concat(articleAry);

      //   this.busy = false;
      //   this.$indicator.close();
      // });
    },

    //初始化轮播图高度方法
    initSwipeHeight() {
      console.log(window.screen.width);
      let picw = 1242;
      let pich = 698;
      let screenw = window.screen.width;
      let height = Math.floor((pich * screenw) / picw) + "px";
      this.h = height;
    }
  },
  mounted() {
    this.initSwipeHeight();

    //发送请求，加载类别列表，更新UI
    this.axios.get("/category").then(result => {
      // console.log(result);
      //把类别列表存入data，使用v-for遍历输出
      this.category = result.data.results;
    });

    // //发送请求，加载文章列表
    this.loadArticles(1, 1, articles => {
      //把data中的artices替换掉
      this.articles = articles;
    });
    // this.axios.get("/articles?cid=1&page=1").then(result => {
    //   // console.log(result);
    //   //从响应中获取文章列表，存入articles中
    //   this.articles = result.data.results;
    //   //遍历文章列表中的图片路径
    //   this.articles.forEach(item => {
    //     //把图片路径经过require处理，从而获得新的图片路径
    //     if (item.image != null) {
    //       item.image = require("../assets/articles/" + item.image);
    //     }
    //   })
    // })
  },
  watch: {
    //监听顶部导航的切换
    navactive(newval) {
      //把page初始化为1
      this.page = 1;
      //控制窗口到顶部
      window.scrollTo(0, 0);

      //newval：就是当前选中项的id
      //发送axios请求，获取新类别下的第一页
      this.loadArticles(newval, 1, articles => {
        this.articles = articles;
      });
      // this.axios.get(`/articles?cid=${newval}&page=1`).then(result => {
      //   console.log(result);
      //   //从响应中获取文章列表，存入articles中
      //   this.articles = result.data.results;

      //   //遍历文章列表中的图片路径
      //   this.articles.forEach(item => {
      //     //把图片路径经过require处理，从而获得新的图片路径
      //     if (item.image != null) {
      //       item.image = require("../assets/articles/" + item.image);
      //     }
      //   })
      // })
    },

    //监听底部选项卡
    selected(newval, oldval) {
      //根据newval执行路由跳转
      if (newval == "index") {
        this.$router.push("/");
      } else if (newval == "me") {
        this.$router.push("/me");
      }
    }
  }
};
</script>

<style>
.rl {
  color: #fff;
  margin-right: 10px;
}
.my img {
  width: 100%;
}
/* 文章 */
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>


