<template>
  <div>
    <a-card class="blogList">
      <div class="title">
        <p>标签</p>
      </div>
      <div class="content">
        <div class="taglist">
          <div class="tag" v-for="(item, index) in taglist" :key="index">
            <a-tag class="atag" :color="item.color">{{item.tagname}}
              <a-icon class="delete" type="close" @click="DeleteTag(index)" />
            </a-tag>
          </div>
          <div class="addtag" @click="addTag">
            <a-icon class="add" type="plus" />
            <p>New Tag</p>
          </div>
        </div>
      </div>
    </a-card>
    <a-modal title="添加标签" :visible="addModal" okText="确认添加" cancelText="取消" @ok="comfirmAddTag" @cancel="cancel" class="addmodal">
      <div class="tag">
        <p>标签名:</p>
        <a-input v-model="Tagname" class="tagname" placeholder="请输入要添加的标签名" />
      </div>
    </a-modal>
    <a-modal title="删除标签" :visible="DeleteModal" okText="确认删除" cancelText="取消" @ok="openTagmodal" @cancel="CancelTagmodal">
      <p>您要删除此条标签吗?</p>
    </a-modal>
  </div>
</template>

<script>
import { Deletetag,fingtag,addtag } from '../api/index.js'
import { statusCode } from '../api/api.cfg.js'

require('../viewstyle/tag.scss')
export default {
  data () {
    return {
      color: ['green','red','orange',
        'cyan','blue','purple'],
      background: ['green','red','orange',
        'cyan','blue','purple'],
      addModal: false,
      DeleteModal: false,
      index: 0,
      Tagname: '',
      taglist: []
    }
  },
  methods: {
    async openTagmodal () {
      let id=''
      this.taglist.forEach((item,indexone) => {
        if(this.index==indexone) {
          id=item._id
        }
      })
      const res=await Deletetag({
        methods: 'DeleteTag',
        tagid: id
      })
      if(res.status==statusCode.OK) {
        this.taglist.splice(this.index,1)
      }
      this.DeleteModal=false
    },
    CancelTagmodal () {
      this.DeleteModal=false
    },
    // 删除标签
    DeleteTag (index) {
      this.DeleteModal=true
      this.index=index
    },
    // 获得标签
    async getTag () {
      const res=await fingtag()
      if(res.status==statusCode.OK) {
        if(res.data.length>0) {
          this.taglist=res.data
          this.$store.commit({
            type: 'changetaglist',
            tagList: this.taglist
          })
        }
      }
    },
    addTag () {
      this.addModal=true
    },
    // 确认添加
    async comfirmAddTag () {
      let colornum=Math.floor(Math.random()*6);
      let backgroundnum=Math.floor(Math.random()*6);
      // 添加的对象
      let addTag={
        methods: 'Taginsert',
        tagname: this.Tagname,
        color: this.color[colornum],
        backgroundColor: this.background[backgroundnum]
      }
      const res=await addtag({
        methods: 'Taginsert',
        tagname: this.Tagname,
        color: this.color[colornum],
        backgroundColor: this.background[backgroundnum]
      })
      if(res.status==statusCode.OK) {
        this.taglist.push(addTag)
        // 刷新获取数据库
        this.getTag();
      }
      this.addModal=false
    },
    // 取消
    cancel () {
      this.addModal=false
    }
  },
  mounted () {
    this.getTag();
  }
}
</script>

<style lang="less" scoped>
</style>


