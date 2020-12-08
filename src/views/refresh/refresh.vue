<template>
  <div class="con">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        @load="onLoad"
        :offset="offset"
      >
        <div class="content">
          <ul>
            <li v-for="(item, index) in datacontent" :key="index">
              <div class="left">
                <p class="rank" :style="{background: 'green', color: 'red'}">111111111</p>
                <p class="score">分数：<br/><span>22222222222222</span></p>
              </div>
              <div class="right">
                <p class="title">3333333333333</p>
                <p class="classify">4444444444444444</p>
                <p class="author">55555555555555</p>
                <p class="date">666666666666666</p>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { checkPage } from '../../api/user'

export default {

  data() {
    return {

      data: [], // 自己定义的数组，里面存放数据，用于v-for循环

      datacontent: [], // 空数组，用来储存循环出来的内容，因为没有造假数据，所以就反复循环这个数组里的内容了，懒～～～嘻嘻

      isLoading: false, // 下拉刷新

      isUpLoading: false, // 上拉加载

      upFinished: false, // 上拉加载完毕

      finished: false,

      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件

      page: 1
    }
  },

  mounted() {
    for (var i = 0; i < 5; i++) {
      this.datacontent.push(this.data[i])
    }
    const getData = {
      current: 1,
      size: 10
    }
    checkPage(getData).then(res => {
      console.log(res)
    })
  },

  methods: {
    onRefresh() { // 下拉调用此函数
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    onLoad() {
      setTimeout(() => {
        this.$toast('加载成功')
        this.isUpLoading = false
        for (var i = 0; i < 3; i++) {
          this.datacontent.push(this.data[i])
        }
      }, 500)
    }
  }
}

</script>
<style scoped>
  .con{
    height: 100vh;
    width: 100vw;
    overflow: auto;
  }
</style>
