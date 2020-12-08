<template>
  <div class="login">
    <div class="login-content">
      <img src="../../../static/shipimg/gb.png" alt="" class="gb mt15">
      <div class="mt15 fs18">船舶疫情管理系统</div>

      <van-cell-group class="mt15" :border="false">
        <van-field type="text" v-model="account" placeholder="请输入帐号"/>
      </van-cell-group>

      <van-cell-group class="flex mt15 align-items-center" :border="false">
        <van-field type="password" v-model="password" placeholder="请输入密码"/>
      </van-cell-group>

      <div class="forget">
        <span @click="forgetPassword()">忘记密码</span>
      </div>

      <van-button color="#3091FF" class="mt30" block round @click="login">登 录</van-button>
    </div>
  </div>

</template>

<script>
import { Toast } from 'vant'
import md5 from 'js-md5'
import { loginSystem } from '../../api/user'
export default {
  name: 'login',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      account: '',
      password: ''
    }
  },
  mounted() {
    if (window.localStorage.getItem('token')) {
      this.$router.replace('/')
    }
  },
  components: {
    [Toast.name]: Toast
  },
  methods: {
    login() {
      if (!this.account) {
        Toast('请输入账号')
        return
      }
      if (!this.password) {
        Toast('请输入密码')
        return
      }
      const postdata = {
        username: this.account,
        password: md5(this.password),
        tenantId: '738162',
        grant_type: 'password',
        scope: 'all',
        type: 'account'
      }
      console.log(postdata)

      // this.$router.replace('/')

      loginSystem(postdata).then(res => {
        localStorage.setItem('token', res.access_token)
        this.$router.push('/')

      }).catch(res => {
        console.log(res)
        Toast('账户或密码错误')
      })
    },
    forgetPassword() {
      Toast('忘记密码')
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background-image: url('../../../static/shipimg/login-bg.png');
    background-size:cover;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .login-content {
    display: flex;
    flex-direction: column;
    background-image: url('../../../static/shipimg/login-con.png');
    width: 273.5px;
    height: 372px;
    margin-top: 155px;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
  }

  .phone {
    font-size: 24px;
    color: #5626B8;
  }

  .van-field {
    padding-left: 0;
  }

  .spec-btn {
    width: 155px;
    height: 30px;
  }

  .van-cell::after {
    display: none;
  }

  .van-cell-group {
    border-bottom: 1px solid #e3e3e3;
  }
  .gb{
    width: 31px;
    height: 27.5px;
  }
  .forget{
    color: #FCAC48;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-size: 14px;
    margin-right: 35px;
    margin-top: 5px;
  }
</style>
