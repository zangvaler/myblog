<template>
  <div>
    <a-card class="blogList">
      <div class="title">
        <p>写博客</p>
      </div>
      <div class="form">
        <div class="inputAndtree">
          <a-input v-model="blogtitle" class="a-inputtitle" placeholder="标题" />
          <!--多选标签-->
          <a-select @change="handleChange" class="a-select" mode="multiple" placeholder="选择标签">
            <a-select-option v-for="(item, index) in $store.state.taglist" :key="index">
              {{item.tagname}}
            </a-select-option>
          </a-select>
          <!--多选分类-->
          <a-select @change="kindChange" class="kindselect" placeholder="选择分类">
            <a-select-option v-for="(item, index) in $store.state.classifylist" :key="index">
              {{item.classifyname}}
            </a-select-option>
          </a-select>
          <a-textarea v-model="briefcontent" class="summary" placeholder="文章概要" :rows="8" />
        </div>
        <div class="Markdownarticle">
          <a-textarea @input="getMarkdownarticle" class="article" v-model="Markdownarticle" placeholder="markdown格式的文章内容" :rows="16" />
        </div>
      </div>
      <a-button @click="publish" class="publish" type="primary" block>发布</a-button>
    </a-card>
  </div>
</template>

<script>
import { insertblog, getbloglist } from '../api/index'
import { statusCode } from '../api/api.cfg.js'
import moment from 'moment'
import { TreeSelect } from 'ant-design-vue'
import marked from 'marked'

// var toc = require('markdown-toc');
require('../viewstyle/blogging.scss')
var rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  baseUrl: null,
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: "",
  highlight: null,
  langPrefix: "language-",
  mangle: true,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tables: true,
  xhtml: false
})
export default {
  data () {
    return {
      blogtitle: '',          // 文章标题
      Markdownarticle: '',    // Markdown文章
      briefcontent: '',      // 简要介绍
      selectedTag: [],    // 已选中标签
      selectedkind: [],   // 已选中类别
      MdToHTML: '',    // 转换后的HTML
      catalog: '' // 博客目录
    }
  },
  methods: {
    // 初始数据
    initdata () {
      this.blogtitle = '';
      this.Markdownarticle = '';
      this.briefcontent = '';
      this.selectedTag = [];
      this.selectedkind = [];
      this.MdToHTML = '';
      this.catalog = ''
    },
    // Markdown转html
    getMarkdownarticle () {
      this.MdToHTML = ''
      this.MdToHTML = marked(this.Markdownarticle, { sanitize: true });
    },
    // 标签选择项
    handleChange (value) {
      this.selectedTag = []
      for (let key of value) {
        this.selectedTag.push(this.$store.state.taglist[key])
      }
      console.log(this.selectedTag)
    },
    // 分类选择项
    kindChange (value) {
      this.selectedkind = []
      console.log("种类数:")
      console.log(value)
      this.selectedkind.push(this.$store.state.classifylist[value])
      console.log(this.selectedkind)
    },
    // 发布，存储到数据库中
    async publish () {
      
      // 博客标题为空
      if (this.blogtitle == '') {
        this.$message.error('博客标题为空，请重新填写');
      } else {
        let publishTime = moment().format('YYYY-M-DD') //博客发布时间
        let watchnum = 0; //观看数
        const res = await insertblog({
          methods: 'insert',
          publishTime: publishTime,   // 博客发布时间
          watchnum: watchnum,         // 观看数
          blogtitle: this.blogtitle,  // 博客标题
          tagList: this.selectedTag,  // 标签组
          selectedkind: this.selectedkind, // 类别
          briefcontent: this.briefcontent, // 简要介绍
          blogcontent: this.MdToHTML,    // 博客内容HTML形式
          markdowncontent: this.Markdownarticle,
          catalog: this.catalog
        })
        if (res.status == statusCode.OK) {
          this.updatebloglist();
        }
        this.$message.success('发布成功');
        this.initdata();
      }
    },
    // 发布博客并更新
    async updatebloglist () {
      const res = await getbloglist()
      if (res.status == statusCode.OK) {
        let blog = res.data;
        this.$store.commit({
          type: 'changebloglist',
          blogList: blog
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>


