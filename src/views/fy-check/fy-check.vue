<template>
  <div class="con">

    <div class="index-bg">
      <div class="index-content flex flex-column">

        <van-nav-bar
          @click-left="onClickLeft"
          left-arrow
          left-text="返回"
          title="防疫检查"
        >
          <template #right>
            <van-icon @click="add()" name="add" size="22"/>
          </template>
        </van-nav-bar>

        <div class="real-content">
          <van-swipe-cell :key="index" v-for="(item,index) of this.checkPageList">
            <div class="real-content-item">
              <div class="mb10 fs14">
                {{item.shipName}}
              </div>

              <div class="mb10 fs14">
                {{item.createTime}}
              </div>
            </div>
            <template #right>
              <van-button @click="remove(item)" square text="删除" type="danger"/>
              <van-button @click="edit(item)" square text="编辑" type="primary"/>
            </template>
          </van-swipe-cell>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'
import { checkPage, checkRemove } from '../../api/user'

export default {
  name: 'fy-check',
  data() {
    return {
      checkPageList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const getData = {
        current: 1,
        size: 10
      }
      checkPage(getData).then(res => {
        this.checkPageList = res.data.records
      })
    },
    onClickLeft() {
      this.$router.replace('/home')
    },
    remove(item) {
      console.log(item)
      const postData = {
        ids: item.id
      }
      checkRemove(postData).then(res => {
        this.getList()
      })
    },
    edit(item) {
      console.log(item)
      const data = {
        edit: true,
        examineId: item.id
      }
      const objAdd = JSON.stringify(data)
      this.$router.replace({ path: '/check-table?objAdd=' + encodeURIComponent(objAdd) })
    },
    add() {
      this.$router.replace({ path: '/fy-check-search', query: { router: '/fy-check' }})
    }
  }
}
</script>

<style lang="scss" scoped>
  .real-content {
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  .real-content-item {
    border-bottom: 1px solid #C6E0FF;
    padding-top: 15px;
    /*margin-top: 10px;*/
  }

  .van-swipe-cell__right .van-button {
    height: 100%;
  }

  .fy-check, .ship-record {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;

    img {
      width: 31.5px;
      height: 34.5px;
    }
  }

  .fy-check {
    img {
      width: 31.5px;
      height: 34.5px;
    }
  }

  .ship-record {
    img {
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
