<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider breakpoint="lg" collapsedWidth="0" @collapse="onCollapse" @breakpoint="onBreakpoint" style="z-index:100;">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['4']">
        <a-menu-item v-for="(item, index) in menuList" :key="index" @click="SelectedItem(index)">
          <a-icon :type="item.icontype" />
          <span class="nav-text">{{item.label}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{background: '#fff', padding: 0 }">
        <a-icon class="alignleft" type="align-left" />
        <span class="userModel">
          <span class="username">{{this.$store.state.token}}</span>
          <a-button class="unLogin" type="danger" @click="unLogin">退出</a-button>
        </span>

      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <bloglist v-show="menuList[0].show === true"></bloglist>
        <blogging v-show="menuList[1].show === true"></blogging>
        <classify v-show="menuList[2].show === true"></classify>
        <tag v-show="menuList[3].show === true"></tag>
        <imgs v-show="menuList[4].show === true"></imgs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import bloglist from './blogList'
import blogging from './blogging'
import tag from './tag'
import classify from './classify'
import imgs from './imgs'

require('../viewstyle/main.scss')
export default {
  components: {
    bloglist,
    blogging,
    tag,
    classify,
    imgs
  },
  data () {
    return {
      menuList: [
        {
          icontype: 'home',
          label: '首页',
          show: true
        },
        {
          icontype: 'edit',
          label: '写博客',
          show: false
        },
        {
          icontype: 'folder-open',
          label: '分类',
          show: false
        },
        {
          icontype: 'tags',
          label: '标签',
          show: false
        },
        {
          icontype: 'picture',
          label: '上传图片',
          show: false
        }]
    }
  },
  methods: {
    unLogin () {
      this.$router.push('/')
      localStorage.removeItem("userName")
    },
    onCollapse (collapsed, type) {
    },
    onBreakpoint (broken) {
    },
    SelectedItem (index) {
      this.menuList.forEach((item, indexone) => {
        if (index === indexone) {
          item.show = true
        } else {
          item.show = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>