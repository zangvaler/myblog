webpackJsonp([4],{"0ZDn":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Xxa5"),i=s.n(e),n=s("exGp"),l=s.n(n),c=s("k0Tf"),o=s("gyMJ");s("mtWM");s("2QZ1");var r={data:function(){return{color:["green","red","orange","cyan","blue","purple"],background:["green","red","orange","cyan","blue","purple"],addclassifymodal:!1,Deletemodal:!1,inputclassify:"",taglist:[],index:0}},methods:{Deleteclassify:function(t){this.index=t,this.Deletemodal=!0},confirmDelete:function(){var t=this;return l()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s=void 0,t.taglist.forEach(function(a,e){t.index==e&&(s=a._id)}),a.next=4,Object(o.b)({methods:"Deleteclassify",id:s});case 4:a.sent.status==c.b.OK&&(t.taglist.splice(t.index,1),t.listclassify()),t.Deletemodal=!1;case 7:case"end":return a.stop()}},a,t)}))()},listclassify:function(){var t=this;return l()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(o.i)();case 2:(s=a.sent).status==c.b.OK&&(t.taglist=s.data,s.data.length>0&&t.$store.commit({type:"changeclassifylist",tagList:t.taglist}));case 4:case"end":return a.stop()}},a,t)}))()},addclassify:function(){this.addclassifymodal=!0},confirmadd:function(){var t=this;return l()(i.a.mark(function a(){var s,e,n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s=Math.floor(6*Math.random()),e=Math.floor(6*Math.random()),n={methods:"insertclassify",classifyname:t.inputclassify,color:t.color[s],backgroundColor:t.background[e]},a.next=5,Object(o.f)({methods:"insertclassify",classifyname:t.inputclassify,color:t.color[s],backgroundColor:t.background[e]});case 5:a.sent.status==c.b.OK&&(t.taglist.push(n),t.listclassify()),t.addclassifymodal=!1;case 8:case"end":return a.stop()}},a,t)}))()}},mounted:function(){this.listclassify()}},d={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("a-card",{staticClass:"blogList"},[s("div",{staticClass:"title"},[s("p",[t._v("分类")])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"taglist"},[t._l(t.taglist,function(a,e){return s("div",{key:e,staticClass:"tag"},[s("a-tag",{staticClass:"atag",attrs:{color:a.color}},[t._v(t._s(a.classifyname)+"\n            "),s("a-icon",{staticClass:"delete",attrs:{type:"close"},on:{click:function(a){t.Deleteclassify(e)}}})],1)],1)}),t._v(" "),s("div",{staticClass:"addtag",on:{click:t.addclassify}},[s("a-icon",{staticClass:"add",attrs:{type:"plus"}}),t._v(" "),s("p",[t._v("New Classify")])],1)],2)])]),t._v(" "),s("a-modal",{staticClass:"kindmodal",attrs:{title:"添加分类",okText:"确认添加",cancelText:"取消"},on:{ok:t.confirmadd},model:{value:t.addclassifymodal,callback:function(a){t.addclassifymodal=a},expression:"addclassifymodal"}},[s("div",{staticStyle:{display:"flex"}},[s("p",{staticStyle:{width:"50px","font-size":"15px","line-height":"30px"}},[t._v("分类:")]),t._v(" "),s("a-input",{staticClass:"input",staticStyle:{width:"200px"},attrs:{placeholder:"请输入您要添加的分类"},model:{value:t.inputclassify,callback:function(a){t.inputclassify=a},expression:"inputclassify"}})],1)]),t._v(" "),s("a-modal",{staticClass:"Deletemodal",attrs:{title:"删除分类",okText:"确认删除",cancelText:"取消"},on:{ok:t.confirmDelete},model:{value:t.Deletemodal,callback:function(a){t.Deletemodal=a},expression:"Deletemodal"}},[s("p",[t._v("您确定要删除此条分类吗?")])])],1)},staticRenderFns:[]};var f=s("VU/8")(r,d,!1,function(t){s("RpzI")},"data-v-e22defa0",null);a.default=f.exports},"2QZ1":function(t,a){},RpzI:function(t,a){}});
//# sourceMappingURL=4.d18af640d04a1605f508.js.map