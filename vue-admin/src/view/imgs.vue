<template>
  <div class="clearfix">
    <a-upload action="http://localhost:7070/uploadImg/saveImg" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange">
      <div v-if="fileList.length < 5">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { upUrl } from '../api/api.cfg.js'
export default {
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      data: {},
      fileList: [
      ],
    };
  },
  mounted () {
  },

  methods: {
    handleCancel () {
      this.previewVisible = false;
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange ({ file, fileList }) {
      this.fileList = fileList;
    },
    async customRequest (detail) {
      const res = await uploadHandle({ tupian: detail.file });
      detail.onSuccess()
    }

  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>