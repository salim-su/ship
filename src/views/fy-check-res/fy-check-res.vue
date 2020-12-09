<template>
  <div class="con">
    <div class="index-bg">
      <div class="index-content flex flex-column">
        <van-nav-bar
          title="船舶列表"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="real-content">

          <div @click="clickItem(item)" class="real-content-item" v-for="(item,index) of shipListInfo" :key="index">
            <div class="mb10 fs14">
              {{item.name}}
            </div>

            <div class="mb10 fs14">
              {{item.startingTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'vant'
import { shipList } from '../../api/user'

export default {
  name: 'fy-check-res',
  data() {
    return {
      shipListInfo: [],
      startingTime: ''
    }
  },
  mounted() {
    this.startingTime = JSON.parse(this.$route.query.objAdd).startingTime
    this.shipList()
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/fy-check-search')
    },
    remove() {
      Toast('删除删除')
    },
    edit() {
      Toast('编辑编辑')
    },
    add() {
      this.$router.replace('/fy-check-search')
    },
    clickItem(item) {
      const objAdd = JSON.stringify({ shipId: item.id })
      this.$router.replace({ path: '/check-table?objAdd=' + encodeURIComponent(objAdd) })
    },
    shipList() {
      const getData = {
        startDate: this.startingTime
      }
      shipList(getData).then(res => {
        this.shipListInfo = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .real-content{
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .real-content-item{
    border-bottom: 1px solid #C6E0FF;
    padding-top: 15px;
    /*margin-top: 10px;*/
  }
  .van-swipe-cell__right .van-button{
    height: 100%;
  }
  .fy-check,.ship-record{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    img{
      width: 31.5px;
      height: 34.5px;
    }
  }
  .fy-check{
    img{
      width: 31.5px;
      height: 34.5px;
    }
  }
  .ship-record{
    img{
      width: 34.5px;
      height: 33.5px;
    }
  }
  .index-bg {
    width: 100vw;
    height: 100%;
    background-image: url('../../../static/shipimg/app-menu.png');
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
  }

  .index-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: #e3e3e3 1px 0px 3px;
  }
  .con {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }

</style>
