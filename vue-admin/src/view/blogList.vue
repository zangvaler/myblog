<template>
  <div>
    <a-card class="blogList">
      <div class="title">
        <p>博客列表</p>
      </div>
      <div class="content">
        <!-- 博客列表项 -->
        <div class="blogitem" v-for="(item, index) in $store.state.bloglist" :key="index">
          <!-- 博客标题 -->
          <p class="blogtitle">{{item.blogtitle}}</p>
          <!-- 博客简要介绍 -->
          <p class="blogbriefcontent">
            {{item.briefcontent}}
          </p>
          <div class="operation">
            <!-- 删除按钮 -->
            <div class="delete" @click="getindex(index)">
              <p>删除</p>
            </div>
            <!-- 编辑按钮 -->
            <div class="Edit" @click="Modify(index)">
              <p>编辑</p>
            </div>
            <!-- 发布时间 -->
            <div class="time">
              <a-icon class="timeicon" type="clock-circle" />
              <p>{{item.publishTime?item.publishTime.slice(0,10):''}}</p>
            </div>
            <!-- 观看数 -->
            <div class="eye">
              <a-icon type="eye" class="eyeicon" />
              <p>{{item.watchnum}}</p>
            </div>
            <!-- 具体分类标签 -->
            <div class="quote">
              <a-icon type="tags" class="quoteicon" v-show='item.tagList.length>0' />
            </div>
            <!-- 循环罗列 -->
            <div class="quoteList" v-for="(itemtag, indextag) in item.tagList" :key="'info-'+indextag">
              <a-tag class="tag" style="width:100%;height:100%" :color="itemtag.color">{{itemtag.tagname}}</a-tag>
            </div>
            <!-- 分类标签 -->
            <div class="app">
              <a-icon type="appstore" class="appstoreicon" v-show='item.selectedkind.length>0' />
            </div>
            <!-- 循环罗列 -->
            <div class="appList" v-for="(itemkind,indexkind) in item.selectedkind" :key="'info2-'+indexkind" :style="{backgroundColor:itemkind.backgroundColor}">
              <a-tag class="tag" style="width:100%;height:100%" :color="itemkind.color">{{itemkind.classifyname}}</a-tag>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="page">
          <a-pagination @change="changepage" v-model="current" :total="pageCount" :pageSize="5" center />
        </div>
      </div>
    </a-card>

    <!--删除博客确认框-->
    <a-modal title="Delete Blog" :visible="DeleteBlog" class="Deletemodal" okText="确认删除" cancelText="取消" @ok="Delete(Deleteindex)" @cancel="closeDeleteModal" style="margin-top:7%;">
      <p>您要删除此条博客吗?</p>
    </a-modal>

    <!--编辑-->
    <a-modal title="修改博客" width="80vw" class="modifymodal" v-model="visible" @ok="confirmModify" cancelText="退出" okText="确认修改">
      <div class="content">
        <div class="ModifybasicInfo">
          <a-input class="title" placeholder="标题" v-model="modifyblogList.blogtitle" />
          <a-select class="treeSelect" @change="tagchange" mode="multiple" v-model="Modifytag" placeholder="Please select">
            <a-select-option v-for="(item, index) in $store.state.taglist" :key="index">
              {{item.tagname}}
            </a-select-option>
          </a-select>
          <a-select @change="classifychange" class="kind" v-model="Modifyclassify">
            <a-select-option v-for="(item, index) in $store.state.classifylist" :key="index">
              {{item.classifyname}}
            </a-select-option>
          </a-select>
          <a-textarea v-model="modifyblogList.briefcontent" class="brief" placeholder="文章概要" :rows="9" />
        </div>
        <div class="Edit">
          <a-textarea v-model="modifyblogList.markdowncontent" class="Markdown" placeholder="Markdown格式的文章内容" :rows="18" />
        </div>
      </div>
    </a-modal>
    <!--回到顶部按钮-->
    <a-back-top :visibilityHeight="80" />
  </div>
</template>
<script>
import { getbloglist,blog,Deleteblog,modifyblog,getPersonalInfo } from '../api/index'
import { statusCode } from '../api/api.cfg.js'

require('../viewstyle/blogList.scss')
export default {
  data () {
    return {
      current: 1,
      visible: false,
      DeleteBlog: false,
      Deleteindex: 0,
      blogList: [],        // 所有博客
      modifyblogList: {},  // 修改博客
      Modifytag: [],
      Modifyclassify: [],
      selectedTag: [],
      selectedkind: [],
      page: 1,
      pageCount: 0,
    }
  },
  methods: {
    // 页数变化
    async changepage (page,pageSize) {
      this.page=page
      const res=await blog({
        methods: 'listblog',
        page: page,
        pageSize: pageSize
      })
      window.scrollTo(0,0); // 回到顶部
      if(res.status==statusCode.OK) {
        this.blogList=res.data;
        this.$store.commit({
          type: 'changebloglist',
          blogList: this.blogList
        })
      }
    },
    classifychange (value) {
      this.modifyblogList.selectedkind=[]
      this.modifyblogList.selectedkind.push(this.$store.state.classifylist[value])
    },
    tagchange (value) {
      this.modifyblogList.tagList=[]
      for(const item of this.$store.state.taglist) {
        for(let key of value) {
          if(item.tagname==key) {
            this.modifyblogList.tagList.push(item)
          }
        }
      }
    },
    closeDeleteModal () {
      this.DeleteBlog=false;
    },
    getindex (index) {
      this.Deleteindex=index
      this.DeleteBlog=true
    },
    // 删除博客
    async Delete (index) {
      // 获取删除项的id值
      let Deleteblogitemid='';
      this.blogList.forEach((item,indexone) => {
        if(index==indexone) {
          Deleteblogitemid=item._id
        }
      })
      this.DeleteBlog=false
      const res=await Deleteblog({
        methods: 'Delete',
        id: Deleteblogitemid
      })
      if(res.status==statusCode.OK) {
        this.blogList.splice(index,1)
        this.initList(this.page)
        this.ListAllblog();
      }
    },
    // 修改博客
    async Modify (index) {
      this.Modifytag=[];
      this.Modifyclassify=[];
      this.blogList.forEach((item,indexone) => {
        if(indexone==index) {
          this.modifyblogList=item
        }
      })
      // 只是为其显示模态框,实际传的是 this.modifyblogList.selectedkind
      this.modifyblogList.selectedkind.forEach((item,indextow) => {
        this.Modifyclassify.push(item.classifyname)
      })
      this.modifyblogList.tagList.forEach((item,indexthree) => {
        this.Modifytag.push(item.tagname)
      })
      this.visible=true;
    },
    // 所有博客
    async ListAllblog () {
      const res=await getbloglist();
      if(res.status==statusCode.OK) {
        this.blogList=res.data;
        this.$store.commit({
          type: 'changebloglist',
          blogList: this.blogList
        })
      }
    },
    // 确认修改
    async confirmModify () {
      const res=await modifyblog({
        id: this.modifyblogList._id,
        publishTime: this.modifyblogList.publishTime,
        watchnum: this.modifyblogList.watchnum,
        blogtitle: this.modifyblogList.blogtitle,  // 博客标题
        tagList: this.modifyblogList.tagList,  // 标签组
        selectedkind: this.modifyblogList.selectedkind, // 类别
        briefcontent: this.modifyblogList.briefcontent, // 简要介绍
        blogcontent: this.modifyblogList.blogcontent,    // 博客内容HTML形式
        markdowncontent: this.modifyblogList.markdowncontent,
        catalog: this.modifyblogList.catalog
      })
      this.initList(this.page)
      this.$message.success('修改成功');
      this.visible=false;
    },
    // 初始化第一页
    async initList (num) {
      const res=await blog({
        methods: 'listblog',
        page: num,
        pageSize: 5
      })
      if(res.status==statusCode.OK) {
        // this.ListAllblog();
        if(res.data.length>0) {
          this.blogList=res.data;
          this.$store.commit({
            type: 'changebloglist',
            blogList: this.blogList
          })
        }
      }
    },
    async PersonalInfo () {
      const res=await getPersonalInfo();
      if(res.status==statusCode.OK) {
        this.pageCount=res.data[0].blognum
      }
    }
  },
  mounted () {
    this.initList(1);
    this.PersonalInfo()
  }
}
</script>

<style lang="less" scoped>
.page {
  text-align: center;
  ul {
    display: table;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>


