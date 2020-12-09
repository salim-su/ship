<template>
  <div class="con">
    <div class="index-bg">
      <div class="index-content flex flex-column">
        <van-nav-bar
          title="防疫检查表"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
          <template #right v-if="flag">
            <span>下一步</span>
          </template>
        </van-nav-bar>
        <div class="real-content">

          <div class="real-content-item" @click="goCheckTableReport(item)" v-for="(item,index) of examineItemVOList" :key="index">
            <div class="mb10 fs16">
              {{index+1}}、{{item.name}}
            </div>
            <div class="mb10 fs14 flex">
              <van-icon v-if="item.isAccord == 0" name="clear" color="#DA5662" class="fs16"/>
              <van-icon v-if="item.isAccord == 1" name="checked" color="#4CC58F" class="fs16"/>
              <div v-if="item.isAccord == -1">未填报</div>
              <div v-if="item.isAccord == 1">符合</div>
              <div v-if="item.isAccord == 0">不符合</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'vant'
import { checkItem, CheckSave } from '../../api/user'

export default {
  name: 'check-table',
  data() {
    return {
      examineItemVOList: [],
      examineId: '',
      flag: false
    }
  },
  mounted() {
    if (JSON.parse(this.$route.query.objAdd)['edit'] || JSON.parse(this.$route.query.objAdd)['check']) {
      this.examineId = JSON.parse(this.$route.query.objAdd).examineId
      checkItem({ examineId: this.examineId }).then(res => {
        this.examineItemVOList = res['data']
        console.log(this.examineItemVOList)
        if (this.examineItemVOList.filter(p => p.status === 2).length === 12) {
          this.flag = true
        } else {
          this.flag = false
        }
      })
    } else {
      const data = {
        shipId: JSON.parse(this.$route.query.objAdd).shipId
      }
      CheckSave(data).then(res => {
        this.examineItemVOList = res['data']['examineItemVOList']
        this.examineId = res['data']['id']
      })
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/fy-check')
    },
    onClickRight() {
      const data = {
        id: this.examineId
      }
      const objAdd = JSON.stringify(data)
      this.$router.replace({ path: '/signature?objAdd=' + encodeURIComponent(objAdd) })
    },
    remove() {
      Toast('删除删除')
    },
    edit() {
      Toast('编辑编辑')
    },
    goCheckTableReport(item) {
      console.log(item)
      const data = {
        shipId: JSON.parse(this.$route.query.objAdd).shipId,
        id: item.id,
        isHavePhotograph: item.isHavePhotograph,
        name: item.name,
        ossIds: item.ossIds,
        isAccord: item.isAccord,
        remark: item.remark,
        examineId: this.examineId
      }
      if (JSON.parse(this.$route.query.objAdd)['edit']) {
        data['edit'] = true
      }
      if (JSON.parse(this.$route.query.objAdd)['check']) {
        data['check'] = true
      }
      console.log(data)
      const objAdd = JSON.stringify(data)
      this.$router.replace({ path: '/check-table-report?objAdd=' + encodeURIComponent(objAdd) })
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
