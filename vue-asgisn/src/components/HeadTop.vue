<template>
  <div class="HeadTop">
    <div class="logo">
      BLOG
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/detailed">detailed</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadTop',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.HeadTop {
  margin: 0 80px;
  height: 60px;
  line-height: 60px;
  background: rgb(46, 45, 45);
  font-size: 20px;
  .logo,
  .nav {
    display: inline-block;
  }
  .logo {
    width: 30%;
    padding-left: 50px;
    font-weight: bold;
    color: #666;
    box-sizing: border-box;
  }
  .nav {
    width: 70%;
    text-align: right;
    padding-right: 200px;
    box-sizing: border-box;
    a {
      padding: 0 10px;
      font-weight: bold;
      color: #666;
      text-decoration: none;
      &.router-link-exact-active {
        color: #ffffff;
      }
    }
  }
}
</style>
