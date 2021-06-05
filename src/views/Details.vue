<template>
  <div class="article">
    <!-- 顶部导航开始 -->
    <header>
      <mt-header title="学前端，上学问">
        <router-link slot="left" to="/">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </header>
    <!-- 导航导航结束 -->
    <!-- 正文区域开始 -->
    <div class="question">
      <!-- 标题开始 -->
      <div class="question-header">
        <div class="question-header-title">{{article.subject}}</div>
        <div class="question-header-datetime">{{moment.unix(article.created_at).format('YYYY/MM/DD HH:mm')}}</div>
      </div>
      <!-- 标题结束 -->
      <!-- 作者信息开始 -->
      <div class="author-info">
        <img
          :src="article.avatar"
          class="author-info-avatar"
        >
        <div class="author-info-detail">
          <div class="author-info-nickname">{{article.nickname}}</div>
          <div class="author-info-badge">
            共
            <mt-badge type="primary" size="small">{{article.article_number}}</mt-badge>篇
          </div>
        </div>
      </div>
      <!-- 作者信息结束 -->
      <!-- 内容开始 -->
      <div class="question-content">
        <div class="rich-content" v-html="article.content"></div>
      </div>
      <!-- 内容结束 -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      article:{}
    }
  },
  //页面挂载完毕后
  mounted(){
    //用于获取请求参数
    let id = this.$route.query.id;
    console.log(id)
    //发送http请求，加载当前文章的详细内容
    this.axios.get('/detail?id='+id).then(result=>{
      console.log(result)
      //把文章详情保存在data中
      this.article = result.data.result;

      //处理头像
      //路径是动态的 ：src    相对路径  用require
      this.article.avatar = require('../assets/avatar/'+this.article.avatar)
    })
    
  },
  methods:{

  }
}
</script>

<style>
.article {
  background: #f6f6f6;
  height: 100vh;
}
.question-header {
  margin-bottom: 5px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.question-header-title {
  font-size: 18px;
  color: #1a1a1a;
  line-height: 1.5;
}
.question-header-datetime {
  margin-top: 5px;
  font-size: 14px;
  color: #646464;
}
.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 8px 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.author-info-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.author-info-detail {
  margin-left: 15px;
}
.author-info-nickname {
  font-size: 15px;
  margin-bottom: 6px;
}
.author-info-badge {
  font-size: 14px;
}
.question-content {
  padding: 10px;
  background-color: #fff;
}

.rich-content p {
  padding: 5px 0;
  line-height: 1.7;
}
.rich-content img {
  max-width: 100%;
}
</style>
