<template>
  <div>
    <a-card class="blogList">
      <div class="title">
        <p>分类</p>
      </div>
      <div class="content">
        <div class="taglist">
          <div class="tag" v-for="(item, index) in taglist" :key="index">
            <a-tag class="atag" :color="item.color">{{item.classifyname}}
              <a-icon class="delete" type="close" @click="Deleteclassify(index)" />
            </a-tag>
          </div>
          <div class="addtag" @click="addclassify">
            <a-icon class="add" type="plus" />
            <p>New Classify</p>
          </div>
        </div>
      </div>
    </a-card>
    <a-modal title="添加分类" class="kindmodal" v-model="addclassifymodal" okText="确认添加" cancelText="取消" @ok="confirmadd">
      <div style="display:flex;">
        <p style="width:50px;font-size:15px;line-height:30px;">分类:</p>
        <a-input style="width:200px;" v-model="inputclassify" class="input" placeholder="请输入您要添加的分类" />
      </div>

    </a-modal>
    <a-modal title="删除分类" class="Deletemodal" v-model="Deletemodal" okText="确认删除" cancelText="取消" @ok="confirmDelete">
      <p>您确定要删除此条分类吗?</p>
    </a-modal>
  </div>
</template>

<script>
import { statusCode } from '../api/api.cfg.js'
import { Deleteclassify,classifyList,addclassify } from '../api/index.js'
import axios from 'axios'

require('../viewstyle/classify.scss')
export default {
  data () {
    return {
      color: ['green','red','orange',
        'cyan','blue','purple'],
      background: ['green','red','orange',
        'cyan','blue','purple'],
      addclassifymodal: false,
      Deletemodal: false,
      inputclassify: '',
      taglist: [],
      index: 0
    }
  },
  methods: {
    Deleteclassify (index) {
      this.index=index
      this.Deletemodal=true
    },
    // 确认删除
    async confirmDelete () {
      let Deleteid;
      this.taglist.forEach((item,indexone) => {
        if(this.index==indexone) {
          Deleteid=item._id;
        }
      })
      const res=await Deleteclassify({
        methods: 'Deleteclassify',
        id: Deleteid
      })
      if(res.status==statusCode.OK) {
        this.taglist.splice(this.index,1) // 删除
        this.listclassify();
      }
      this.Deletemodal=false
    },
    async listclassify () {
      const res=await classifyList()
      if(res.status==statusCode.OK) {
        this.taglist=res.data;
        if(res.data.length>0) {
          this.$store.commit({
            type: 'changeclassifylist',
            tagList: this.taglist
          })
        }
      }
    },
    addclassify () {
      this.addclassifymodal=true
    },
    // 确认添加分类
    async confirmadd () {
      let colornum=Math.floor(Math.random()*6);
      let backgroundnum=Math.floor(Math.random()*6);
      let addclassifyitem={
        methods: 'insertclassify',
        classifyname: this.inputclassify,
        color: this.color[colornum],
        backgroundColor: this.background[backgroundnum]
      }
      const res=await addclassify({
        methods: 'insertclassify',
        classifyname: this.inputclassify,
        color: this.color[colornum],
        backgroundColor: this.background[backgroundnum]
      })
      if(res.status==statusCode.OK) {
        this.taglist.push(addclassifyitem)  // 添加项
        this.listclassify();
      }
      this.addclassifymodal=false
    }
  },
  mounted () {
    this.listclassify();
  }
}
</script>

<style lang="less" scoped>
</style>


