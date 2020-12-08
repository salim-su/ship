<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  .van-nav-bar{
    background: #FAFAFA !important;
    color: #485379;
  }
  .van-hairline--bottom::after{
    visibility: hidden;
  }
  /*.van-nav-bar__title{*/
  /*  color: #fff !important;*/
  /*}*/
  /*.van-nav-bar .van-icon{*/
  /*  color: #fff;*/
  /*}*/
  /*.van-nav-bar__text{*/
  /*  color: #fff;*/
  /*}*/
  .tabbar{
    .van-icon__image{
      width: 45px;
      height: 45px;
      margin-top: -20px;
      position: relative;
      z-index: 999;
      background-color: #fff;
      padding: 5px;
      border: 1px solid #e3e3e3;
      border-radius: 50%;
    }
  }
  .van-nav-bar .van-icon{
    color: #485379!important;
  }
  .van-nav-bar__text{
    color: #485379 !important;
  }
  .van-tabbar-item--active{
    color: #287EFF !important;
  }
    .van-nav-bar__right .van-icon{
      color: #EB6100 !important;
    }
</style>
