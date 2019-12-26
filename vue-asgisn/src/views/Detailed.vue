<template>
  <div class="detailed">
    <HeadTop />
    <div class="text">
      <div class="context" ref="helpDocs">
        <h1>{{detialData.blogtitle}}</h1>
        <div class="more_xx">
          <p>
            <span class="icon_box"><img src="../assets/date.svg"></span><span>{{detialData.publishTime.slice(0, 10)}}</span>
          </p>
          <p>
            <span class="icon_box"><img src="../assets/type.svg"></span><span v-for="(itemType, i) in farmterdata(detialData.selectedkind)" :key='i'>{{itemType.classifyname}}</span>
          </p>
          <p>
            <span class="icon_box"><img src="../assets/fire.svg"></span><span>{{detialData.watchnum}}人</span>
          </p>
        </div>
        <div class="markdownText" v-html="compiledMarkdown"></div>
      </div>
      <div class="detailed-nav">
        <Author />
        <div class="nav-title">文章目录</div>
        <hr/>
        <div class="toc-list">
          <detail-menu :mdContent='$route.query.markdowncontent'/>
        </div>
      </div>
    </div>
    <Footered />
  </div>
</template>
<script>
// @ is an alias to /src
import HeadTop from '@/components/HeadTop.vue'
import Author from '@/components/Author.vue'
import detailMenu from '@/components/detailMenu.vue'
import Footered from '@/components/Footer.vue'
import 'highlight.js/styles/monokai-sublime.css'
let marked = require('marked')
let hljs = require('highlight.js')
let rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'detailed',
  components: {
    HeadTop,
    Author,
    detailMenu,
    Footered
  },
  data () {
    return {
      detialData: this.$route.query,
      detialMarkerDown: this.$route.query.markdowncontent
    }
  },
  computed: {
    content () {
      return this.detialMarkerDown
    },
    compiledMarkdown: function () {
      let index = 0
      rendererMD.heading = function (text, level) {
        if (level <= 2) {
          return `<h${level} id="data-${index++}">${text}</h${level}>`
        } else {
          return `<h${level}>${text}</h${level}>`
        }
      }
      rendererMD.code = function (code, language) {
        code = code.replace(/\r\n/g, '<br>')
        code = code.replace(/\n/g, '<br>')
        return `<div class="text">${code}</div>`
      }
      return marked(this.content)
    }
  },
  methods: {
    clickinfo (id) {
      this.$refs.helpDocs.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 80
    },
    farmterdata (val) {
      return JSON.parse(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.detailed {
  height: 100%;
  background: #e9e8e8;
  .text {
    height: calc(100% - 110px);
    margin: 10px 80px 0;
    clear: both;
    &:after{
      content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .context {
      padding: 15px 30px 15px;
      background: #fff;
      height: calc(100% - 30px);
      width: calc(100% - 320px);
      float: left;
      overflow: scroll;
      .icon_box {
        margin-right: 5px;
        vertical-align: middle;
        img {
          width: 18px;
        }
      }
      .more_xx {
        p {
          margin: 0px 0;
          padding: 0 20px 0 0;
          display: inline-block;
        }
      }
      .look_more {
        text-align: right;
        span {
          text-decoration: none;
          margin-right: 40px;
          color: cornflowerblue;
        }
        span:hover {
          color: indianred;
        }
      }
    }
    .detailed-nav {
      display: inline-block;
      .nav-title{
        padding: 10px 0 0 15px;
        font-size: 17px;
      }
    }
  }
}
</style>
