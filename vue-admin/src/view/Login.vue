<template>
  <div class="beijing">
    <a-card class="Login">
      <div class="Avatar">
        <img src="/static/admin.png" />
      </div>
      <a-input type="text" class="userinput" placeholder="username" v-model="username">
        <a-icon class="user" slot="prefix" type="user" />
      </a-input>
      <a-input type="password" class="passwordinput" placeholder=" password" v-model="password">
        <a-icon class="password" slot="prefix" type="lock" />
      </a-input>
      <p class="registerBtn" @click="registerInfo">注册</p>
      <a-button type="primary" block class="buttom" @click="Login()">登录</a-button>
    </a-card>
  </div>
</template>

<script>
import { Login,gettoken } from '../api/index.js'
import { statusCode } from '../api/api.cfg.js'
import axios from 'axios'

require('../viewstyle/Login.scss')
export default {
  data () {
    return {
      username: '',
      password: '',
      adminList: []
    }
  },
  methods: {
    async Login () {
      const res=await Login({
        methods: 'Login',
        username: this.username,
        password: this.password
      })

      if(res.status==statusCode.OK&&res.data.codeState==0&&res.data.message) {
        localStorage.setItem('userName',this.username)
        this.$store.commit({
          type: 'getToken',
          token: this.username
        })
        this.$router.push('/main')

      } else if(res.status==statusCode.OK&&res.data.codeState==0&&!res.data.message) {
        this.$notification['error']({
          message: '错误',
          description: '密码错误，请重新输入',
        });
      } else if(res.data.codeState==1) {
        this.$notification['error']({
          message: '错误',
          description: '用户名不存在，请重新输入',
        });
      } else if(res.data.codeState==2) {
        this.$notification['error']({
          message: '错误',
          description: '密码错误，请重新输入',
        });
      } else if(res.data.codeState==3) {
        this.$notification['error']({
          message: '错误',
          description: '系统错误',
        });
      }
      //   this.getToken();
    },
    async getToken () {
      const res=await gettoken();
      if(res.status==statusCode.OK) {
        console.log(res.data)
        this.$store.commit({
          type: 'getToken',
          token: res.data
        })
        // 有返回Token证明有登录成功
        if(res.data!=='') {

        } else {
          this.$notification['error']({
            message: '错误',
            description: '用户名或者密码错误，请重新输入',
          });
        }
      }
    },
    registerInfo () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="less">
.registerBtn {
  margin-top: 15px;
  margin-bottom: 0;
  text-align: right;
  padding-right: 50px;
  font-size: 12px;
}
.registerBtn:hover {
  color: #1890ff;
}
.beijing .Login .buttom {
  margin-top: 15px;
}
</style>
