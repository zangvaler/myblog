<template>
  <div class="home">
    <HeadTop />
    <div class="context">
      <div class="lf_content">
        <List v-for="(item, index) in blogList" :key="index" :blogList='item'/>
      </div>
      <div class="rt_content">
        <Author />
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadTop from '@/components/HeadTop.vue'
import Author from '@/components/Author.vue'
import List from '@/components/List.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    HeadTop,
    Author,
    List,
    Footer
  },
  data () {
    return {
      showList: false,
      blogList: []
    }
  },
  created () {
    this.$store.dispatch('requestBloglist').then(resolve => {
      this.blogList = this.$store.state.blogList
    })
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .context {
    margin: 0 80px;
    height: calc(100% - 105px);
    .lf_content {
      margin: 10px 0;
      padding: 0 0 10px 0;
      float: left;
      width: calc(100% - 280px);
      height: calc(100% - 10px);
      background: #fff;
      clear: both;
      overflow: scroll;
    }
    .rt_content {
      margin: 10px 0;
      height: calc(100% - 10px);
      float: right;
      margin-left: 20px;
      width: 260px;
      background: #fff;
    }
  }
}
</style>
