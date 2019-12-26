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
      <a-button type="primary" block class="buttom" @click="RegisterHandle()">注册</a-button>
    </a-card>
  </div>
</template>

<script>
import { RegisterHandle } from '../api/index.js'
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
    async RegisterHandle () {
      const res=await RegisterHandle({
        methods: 'RegisterHandle',
        username: this.username,
        password: this.password
      })

      if(res.status == statusCode.OK) {
        this.$store.commit({
          type: 'getToken',
          token: this.username
        })
        this.$router.push('/main')
      }
    }
  }
}
</script>
