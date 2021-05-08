<template>
  <el-dialog
    v-model="visible"
    :visible.sync="visible"
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    width="400px"
  >
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="100px" class="good-form">
      <el-form-item label="图片" prop="url">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :headers="{
            token: token
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <img v-if="ruleForm.url" style="width: 200px; height: 100px; border: 1px solid #e9e9e9;" :src="ruleForm.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="ruleForm.link" type="text" />
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input v-model="ruleForm.sort" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// import { reactive, ref, toRefs } from 'vue'
import axios from '@/utils/axios'
import { localGet, uploadImgServer, hasEmoji } from '@/utils'
import { Message } from 'element-ui'

export default {
  name: 'DialogAddSwiper',
  props: {
    type: String,
    reload: Function
  },
  data() {
    return {
      uploadImgServer,
      token: localGet('token') || '',
      visible: false,
      ruleForm: {
        url: '',
        link: '',
        sort: ''
      },
      rules: {
        url: [
          { required: 'true', message: '图片不能为空', trigger: ['change'] }
        ],
        sort: [
          { required: 'true', message: '排序不能为空', trigger: ['change'] }
        ]
      },
      id: ''
    }
  },
  methods: {
    // 获取详情
    getDetail(id) {
      axios.get(`/carousels/${id}`).then(res => {
        this.ruleForm = {
          url: res.carouselUrl,
          link: res.redirectUrl,
          sort: res.carouselRank
        }
      })
    },
    handleBeforeUpload(file) {
      const sufix = file.name.split('.')[1] || ''
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        Message.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
    },
    // 上传图片
    handleUrlSuccess(val) {
      this.ruleForm.url = val.data || ''
    },
    // 开启弹窗
    open(id) {
      this.visible = true
      if (id) {
        this.id = id
        this.getDetail(id)
      } else {
        this.ruleForm = {
          url: '',
          link: '',
          sort: ''
        }
      }
    },
    // 关闭弹窗
    close() {
      this.visible = false
    },
    submitForm() {
      console.log(this.$refs.formRef.value.validate)
      this.$refs.formRef.value.validate((valid) => {
        if (valid) {
          if (hasEmoji(this.ruleForm.link)) {
            Message.error('不要输入表情包，再输入就打死你个龟孙儿~')
            return
          }
          if (this.props.type === 'add') {
            axios.post('/carousels', {
              carouselUrl: this.ruleForm.url,
              redirectUrl: this.ruleForm.link,
              carouselRank: this.ruleForm.sort
            }).then(() => {
              Message.success('添加成功')
              this.visible = false
              if (this.props.reload) this.props.reload()
            })
          } else {
            axios.put('/carousels', {
              carouselId: this.id,
              carouselUrl: this.ruleForm.url,
              redirectUrl: this.ruleForm.link,
              carouselRank: this.ruleForm.sort
            }).then(() => {
              Message.success('修改成功')
              this.visible = false
              if (this.props.reload) this.props.reload()
            })
          }
        }
      })
    }
  }
  // setup(props) {
  //   const formRef = ref(null)
  //   const state = reactive({
  //     uploadImgServer,
  //     token: localGet('token') || '',
  //     visible: false,
  //     ruleForm: {
  //       url: '',
  //       link: '',
  //       sort: ''
  //     },
  //     rules: {
  //       url: [
  //         { required: 'true', message: '图片不能为空', trigger: ['change'] }
  //       ],
  //       sort: [
  //         { required: 'true', message: '排序不能为空', trigger: ['change'] }
  //       ]
  //     },
  //     id: ''
  //   })
  //   // 获取详情
  //   const getDetail = (id) => {
  //     axios.get(`/carousels/${id}`).then(res => {
  //       state.ruleForm = {
  //         url: res.carouselUrl,
  //         link: res.redirectUrl,
  //         sort: res.carouselRank
  //       }
  //     })
  //   }
  //   const handleBeforeUpload = (file) => {
  //     const sufix = file.name.split('.')[1] || ''
  /*    if (!['jpg', 'jpeg', 'png'].includes(sufix)) {*/
  /*      Message.error('请上传 jpg、jpeg、png 格式的图片')*/
  /*      return false*/
  /*    }*/
  /*  }*/
  /*  // 上传图片*/
  /*  const handleUrlSuccess = (val) => {*/
  /*    state.ruleForm.url = val.data || ''*/
  /*  }*/
  /*  // 开启弹窗*/
  /*  const open = (id) => {*/
  /*    state.visible = true*/
  /*    if (id) {*/
  /*      state.id = id*/
  /*      getDetail(id)*/
  /*    } else {*/
  /*      state.ruleForm = {*/
  /*        url: '',*/
  /*        link: '',*/
  /*        sort: ''*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*  // 关闭弹窗*/
  /*  const close = () => {*/
  /*    state.visible = false*/
  /*  }*/
  /*  const submitForm = () => {*/
  /*    console.log(formRef.value.validate)*/
  /*    formRef.value.validate((valid) => {*/
  /*      if (valid) {*/
  /*        if (hasEmoji(state.ruleForm.link)) {*/
  /*          Message.error('不要输入表情包，再输入就打死你个龟孙儿~')*/
  /*          return*/
  /*        }*/
  /*        if (props.type === 'add') {*/
  /*          axios.post('/carousels', {*/
  /*            carouselUrl: state.ruleForm.url,*/
  /*            redirectUrl: state.ruleForm.link,*/
  /*            carouselRank: state.ruleForm.sort*/
  /*          }).then(() => {*/
  /*            Message.success('添加成功')*/
  /*            state.visible = false*/
  /*            if (props.reload) props.reload()*/
  /*          })*/
  /*        } else {*/
  /*          axios.put('/carousels', {*/
  /*            carouselId: state.id,*/
  /*            carouselUrl: state.ruleForm.url,*/
  /*            redirectUrl: state.ruleForm.link,*/
  /*            carouselRank: state.ruleForm.sort*/
  /*          }).then(() => {*/
  /*            Message.success('修改成功')*/
  /*            state.visible = false*/
  /*            if (props.reload) props.reload()*/
  /*          })*/
  /*        }*/
  /*      }*/
  /*    })*/
  /*  }*/
  //   return {
  //     ...toRefs(state),
  //     open,
  //     close,
  //     formRef,
  //     handleBeforeUpload,
  //     handleUrlSuccess,
  //     submitForm
  //   }
  // }
}
</script>

<style scoped>
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>
