<template>
  <div>
    <a-layout>
      <a-layout-header :style="{height: 128+'px'}">
        <a-row :style="{height: 128+'px'}">
          <a-col :span="8"></a-col>
          <a-col :span="8">
            <a-upload style="text-align:center"
                      name="avatar"
                      listType="picture-card"
                      class="avatar-uploader"
                      :showUploadList="false"
                      action="/xserver/img/upload"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
            >
              <img :style="{height: 128+'px'}" v-if="imageUrl" :src="imageUrl" alt="avatar"/>
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>

      </a-layout-header>
      <a-layout-content :style="{height: 128+'px'}">
        <a-row :style="{height: 128+'px'}">
          <a-col :span="8"></a-col>
          <a-col :span="8">点击上传更换头像
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer :style="{height: 128+'px'}">
        <a-row :style="{height: 128+'px'}">
          <a-col :span="8"></a-col>
          <a-col :span="8">
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>

  </div>
</template>
<script>
  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  export default {
    data() {
      return {
        loading: false,
        imageUrl: '',
      }
    },mounted() {
      // imageUrl = this.user.userface;
    },computed: {
      user() {
        // console.log(this.$store.state.user)
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routesstore
      }
    },
    methods: {
      uploa: function () {

      }
      ,
      handleChange(info) {
        console.log(info)

        /*this.postRequest("/xserver/user/getlogin").then(resp=>{
          if (resp && resp.status == 200) {
            var data = resp.data;
            /!**
             * 将返回的user对象放入前端的容器中
             *!/
            _this.$store.commit('login', data.obj);
            }
        });*/
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }

        if (info.file.status === 'done') {
          // Get this url from response in real world.

          getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrl = imageUrl
            this.loading = false
          })
        }
      },
      beforeUpload(file) {
        console.log(file)

        this.postRequest("/xserver/user/updataFace",{"username":this.user.username,"userface":file.name});
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJPG) {
          this.$message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
        }
        return isJPG && isLt2M
      },
    },
  }
</script>
<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
