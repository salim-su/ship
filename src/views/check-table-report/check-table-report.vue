<template>
  <div>
    <div class="con">
      <div class="index-bg">
        <div class="index-content flex flex-column">
          <van-nav-bar
            title="防疫检查"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
          >
          </van-nav-bar>

          <div class="real-content">

            <div class="real-content-1">
              <div class="fs16 mb10">
                {{record.name}}
              </div>
              <van-radio-group v-model="isAccord" direction="horizontal">
                <van-radio name="1" class="fs14">符合</van-radio>
                <van-radio name="0" class="fs14">不符合</van-radio>
              </van-radio-group>
            </div>

            <div class="real-content-1" v-if="isAccord === '0'">
              <div class="fs16 mb10">
                详情描述
              </div>
              <van-field
                v-model="remark"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入详情"
                show-word-limit
              />
            </div>

            <div class="real-content-1" v-if="record.isHavePhotograph">
              <div class="fs16 mb10">
                上传图片
              </div>
              <van-uploader :after-read="afterRead" v-model="fileList"/>

            </div>

            <div class="real-content-1 bd0 mt15">
              <van-button type="primary" block @click="log()">
                <span>保 &nbsp;&nbsp;存</span>
              </van-button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { checkDetail, checkUpdate } from '../../api/user'

export default {
  name: 'check-table-report',
  data() {
    return {
      isAccord: '1',
      fileList: [],
      remark: '',
      record: {},
      attach: [],
      editInfo: {}
    }
  },
  mounted() {
    this.record = JSON.parse(this.$route.query.objAdd)
    console.log(this.record)
    if (this.record['remark']) {
      this.remark = this.record['remark']
    }
    if (this.record['isAccord'].toString()) {
      this.isAccord = this.record['isAccord'].toString()
    }

    const data = {
      id: this.record.id
    }
    console.log(data)
    checkDetail(data).then(res => {
      if (res['data']['ossLinks'].length > 0) {
        const aaa = res['data']['ossLinks']
        this.attach = res['data']['ossIds'].split(',')
        aaa.forEach(e => {
          this.fileList.push({ url: e })
        })
      }
    })
  },
  methods: {
    onClickLeft() {
      const objAdd = JSON.stringify(this.record)
      console.log(objAdd)
      this.$router.replace({ path: '/check-table?objAdd=' + encodeURIComponent(objAdd) })
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
    afterRead(file) {
      console.log(file)
    },
    log() {
      if (this.fileList.length === 0) {
        Toast('请上传图片')
        return
      }

      this.fileList.forEach(res => {
        if (res['file']) {
          this.myUpload(res['file'])
        }
      })

      setTimeout(res => {
        const postData = {
          id: this.record.id,
          isAccord: this.isAccord,
          remark: this.remark,
          ossIds: this.attach.join(',')
        }
        console.log(postData)

        checkUpdate(postData).then(res => {
          Toast('保存成功')
          const objAdd = JSON.stringify(this.record)
          this.$router.replace({ path: '/check-table?objAdd=' + encodeURIComponent(objAdd) })
        })
      }, 500)
    },
    myUpload(event) {
      const file = event
      const param = new FormData()
      param.append('file', file)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$axios.post('api/blade-resource/oss/endpoint/put-file-attach', param, config).then((res) => {
        this.attach.push(res.data.data.attachId)
      }).catch(e => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .real-content-1{
    border-bottom: 1px solid #EAEAEA;
    padding: 10px;
  }
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
  .real-content-1 .van-field{
    padding: 0;
  }
</style>
