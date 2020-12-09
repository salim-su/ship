<template>

  <div class="con">
    <div class="index-bg">
      <div class="index-content flex flex-column">
        <van-nav-bar
          title="检查人签字"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
<!--          <template #right>-->
<!--            <span>下一步</span>-->
<!--          </template>-->
        </van-nav-bar>
        <div class="real-content">

              <div id="canvas" ref="canvas">
                <p id="clearCanvas" ref="clearCanvas">清除</p>
                <p id="saveCanvas" ref="saveCanvas">保存</p>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { checkExamineFinished } from '../../api/user'

export default {

  data() {
    return {
      isSign: false,
      signSrc: '',
      id: ''
    }
  },
  created() {

  },
  mounted() {
    this.id = JSON.parse(this.$route.query.objAdd).id
    this.lineCanvas({
      el: this.$refs.canvas, // 绘制canvas的父级div
      clearEl: this.$refs.clearCanvas, // 清除按钮
      saveEl: this.$refs.saveCanvas// 保存按钮
    })
  },
  methods: {
    lineCanvas(obj) {
      this.linewidth = 2
      this.color = '#000000'
      this.background = '#ffffff'
      for (var i in obj) {
        this[i] = obj[i]
      }
      this.canvas = document.createElement('canvas')
      this.el.appendChild(this.canvas)
      this.cxt = this.canvas.getContext('2d')
      this.canvas.width = this.el.clientWidth
      this.canvas.height = this.el.clientHeight
      this.cxt.fillStyle = this.background
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width)
      this.cxt.strokeStyle = this.color
      this.cxt.lineWidth = this.linewidth
      this.cxt.lineCap = 'round'
      // 开始绘制
      this.canvas.addEventListener('touchstart', function(e) {
        this.cxt.beginPath()
        this.cxt.moveTo(e.changedTouches[0].pageX - 50, e.changedTouches[0].pageY - 100)
      }.bind(this), false)
      // 绘制中
      this.canvas.addEventListener('touchmove', function(e) {
        this.cxt.lineTo(e.changedTouches[0].pageX - 50, e.changedTouches[0].pageY - 100)
        this.cxt.stroke()
      }.bind(this), false)
      // 结束绘制
      this.canvas.addEventListener('touchend', function() {
        this.cxt.closePath()
        const imgBase64 = this.canvas.toDataURL()
        // console.log(imgBase64);
        this.signSrc = imgBase64
        this.isSign = true
      }.bind(this), false)
      // 清除画布
      this.clearEl.addEventListener('click', function() {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }.bind(this), false)
      // 保存图片，直接转base64
      this.saveEl.addEventListener('click', function() {
        const imgBase64 = this.canvas.toDataURL()
        this.signSrc = imgBase64
        const postData = {
          id: this.id,
          signatureId: this.signSrc
        }
        checkExamineFinished(postData).then(res => {
          this.$router.replace({ path: '/fy-check' })
        })
        this.isSign = true
      }.bind(this), false)
    },
    onClickLeft() {
      this.$router.replace('/')
    },
    onClickRight() {
      const data = {
        id: this.examineId
      }
      const objAdd = JSON.stringify(data)
      this.$router.replace({ path: '/signature?objAdd=' + encodeURIComponent(objAdd) })
    }
  }
}
</script>

<style scoped lang="scss">
  #canvas{
    width: 100%;
    height: 400px;
    position: relative;
    canvas{
      display: block;
    }
    #clearCanvas{
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      border: 1px solid #DEDEDE;
      z-index: 1;
    }
    #saveCanvas{
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid #DEDEDE;
      z-index: 1;
    }
  }
  .mySign{
    width: 100%;
    height: 300px;
    img{
      width: 100%;
      height: 300px;
    }
  }
  .test{
    width: 100%;
    height:200px;
    font-size:14px;
    font-weight:600;
    text-align:center;

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
</style>
