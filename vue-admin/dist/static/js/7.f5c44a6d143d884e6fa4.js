webpackJsonp([7],{"/XpT":function(e,t){},EYlr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Xxa5"),a=i.n(n),l=i("exGp"),s=i.n(l),r=(i("k0Tf"),{data:function(){return{previewVisible:!1,previewImage:"",data:{},fileList:[]}},mounted:function(){},methods:{handleCancel:function(){this.previewVisible=!1},handlePreview:function(e){this.previewImage=e.url||e.thumbUrl,this.previewVisible=!0},handleChange:function(e){e.file;var t=e.fileList;this.fileList=t},customRequest:function(e){var t=this;return s()(a.a.mark(function i(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,uploadHandle({tupian:e.file});case 2:t.sent,e.onSuccess();case 4:case"end":return t.stop()}},i,t)}))()}}}),c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"clearfix"},[i("a-upload",{attrs:{action:"http://localhost:7070/uploadImg/saveImg",listType:"picture-card",fileList:e.fileList},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileList.length<5?i("div",[i("a-icon",{attrs:{type:"plus"}}),e._v(" "),i("div",{staticClass:"ant-upload-text"},[e._v("Upload")])],1):e._e()]),e._v(" "),i("a-modal",{attrs:{visible:e.previewVisible,footer:null},on:{cancel:e.handleCancel}},[i("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1)},staticRenderFns:[]};var u=i("VU/8")(r,c,!1,function(e){i("/XpT")},null,null);t.default=u.exports}});
//# sourceMappingURL=7.f5c44a6d143d884e6fa4.js.map