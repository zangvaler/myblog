<template>
  <div class="blogList">
    <h3 class="title">{{blogList.blogtitle}}</h3>
    <div class="more_xx">
      <p>
        <span class="icon_box"><img src="../assets/date.svg"></span><span>{{blogList.publishTime.slice(0, 10)}}</span>
      </p>
      <p>
        <span class="icon_box"><img src="../assets/type.svg"></span><span v-for="(itemType, i) in blogList.selectedkind" :key='i'>{{itemType.classifyname}}</span>
      </p>
      <!-- <p>
        <span class="icon_box"><img src="../assets/target.svg"></span><span>1231231312</span>
      </p> -->
      <p>
        <span class="icon_box"><img src="../assets/fire.svg"></span><span>{{blogList.watchnum}}人</span>
      </p>
    </div>
    <div class="blog_jj">
      {{blogList.briefcontent}}
    </div>
    <p class="look_more"><span @click="LooksMore">查看更多...</span></p>
  </div>
</template>

<script>
export default {
  props: ['blogList'],
  name: 'blogList',
  data () {
    return {
      data: this.blogList
    }
  },
  methods: {
    LooksMore () {
      this.data.tagList = this.farmterdata(this.blogList.tagList)
      this.data.selectedkind = this.farmterdata(this.blogList.selectedkind)
      this.data.watchnum = Number(this.blogList.watchnum) + 1
      console.log(this.data);
      this.$store.dispatch('updataBlog', this.data).then(resolve => {
        this.$router.push({ path: '/detailed', query: resolve})
      })
    },
    farmterdata (val) {
      return JSON.stringify(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.blogList {
  margin: 10px 15px;
  padding: 20px 15px;
  background: #e9e8e8;
  .more_xx {
    display: table;
    .icon_box {
      margin-right: 5px;
      vertical-align: middle;
      img {
        width: 18px;
        // height: 16px;
      }
    }
    p {
      margin-top: 5px;
      padding: 0 20px 0 0;
      display: inline-block;
    }
  }
//   .blog_jj {
//   }
  .look_more {
    text-align: right;
    span {
      text-decoration: none;
      margin-right: 40px;
      color: cornflowerblue;
    }
    span:hover{
        color: indianred;
    }
  }
}
</style>
