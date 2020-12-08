<!-- home -->
<template>
  <div class="con">
    <div class="index-bg">
      <div class="index-content flex">
        <div class="fy-check flex1 flex" >
          <img src="../../../static/shipimg/check.png" alt="" @click="clickCheck()">
          <div class="fs14">防疫检查</div>
        </div>

        <div class="ship-record flex1 flex" >
          <img src="../../../static/shipimg/ship.png" alt="" @click="clickShip()">
          <div class="fs14">船舶记录</div>

        </div>

        <div class="flex1">

        </div>
      </div>

    </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
      devicesInfoList: [],
      nickName: '',
      phone: '',
      timer: ''
    }
  },

  computed: {},

  mounted() {

  },

  methods: {
    clickCheck() {
      this.$router.replace({ path: '/fy-check', query: { router: '/home' }})
    },
    clickShip() {
    }
  }
}
</script>
<style lang="scss" scoped>
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
    padding-top: 120px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 150px;
    box-sizing: border-box;
  }

  .index-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: #e3e3e3 1px 0px 3px;
    border-radius: 5px;
  }

  .index-content-w {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .d1 {
    height: 200px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
  }

  .d2 {
    margin-top: 100px;
    width: 100%;
    height: calc(100vh - 150px);
    box-sizing: border-box;
    overflow: auto;
  }

  .d1, .d2 {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .con {
    width: 100vw;
    height: calc(100vh - 50px);
    box-sizing: border-box;
  }

  .content-item {
    height: 100px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: #999 1px 0px 3px;
    margin-top: 20px;
  }
.cell-list{
  box-shadow: #e3e3e3 1px 0px 3px;

}
.cell-content{
  height: auto;width: 100%;background: #fff;
  padding: 13px;box-sizing: border-box;
}
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
  .imgs{
    width: 18px;
    height: 18px;
  }
  .name{
    font-size: 18px;
  }
  .cell1{
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 6px;
    margin-bottom: 5px;
  }
  .cell12{
    margin-bottom: 5px;
  }
</style>
