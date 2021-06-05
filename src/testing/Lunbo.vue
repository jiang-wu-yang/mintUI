<template>
  <div>
    <mt-swipe class="my" 
    :speed="3000" 
    :auto="200" 
    :showIndicators="false" :style="{height:h}">

    
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
  </div>
</template>

<script>
export default {
  data(){
    return{
      h:'210px'
    }
  },
  //页面挂在完成后，动态计算轮播图高度，并设置h
  mouented(){
    let picw = 1242;
    let pich = 698;
    let screenw = window.screen.width;
    let height = Math.floor((pich * screenw) / picw) + 'px';
    this.h = height;
  }
}
</script>


<style>
.my{
    height: 210px;
}
.my img{
    width: 100%;
}
</style>
