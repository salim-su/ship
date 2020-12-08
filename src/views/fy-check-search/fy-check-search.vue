<template>
  <div class="con">

    <div class="index-bg">
      <div class="index-content flex flex-column">

        <van-nav-bar
          title="防疫检查"
          left-text="返回"
          left-arrow
          right-text="下一步"
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
<!--          <template #right>-->
<!--            <van-icon name="add" size="22" />-->
<!--          </template>-->
        </van-nav-bar>

        <div class="real-content">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="value"
            label="开工日期"
            placeholder="请选择开工日期"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              type="date"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'fy-check-search',
  data() {
    return {
      value: '',
      showPicker: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/fy-check')
      // Toast('左左左')
    },
    onClickRight() {
      if (!this.value) {
        Toast('请选择开工时间')
      } else {
        const objAdd = JSON.stringify({ startingTime: this.value })
        this.$router.replace({ path: '/fy-check-res?objAdd=' + encodeURIComponent(objAdd), query: { router: '/fy-check-search' }})
      }
    },
    remove() {
      Toast('删除删除')
    },
    edit() {
      Toast('编辑编辑')
    },
    onConfirm(time) {
      this.value = this.$moment(time).format('YYYY-MM-DD')
      this.showPicker = false
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

