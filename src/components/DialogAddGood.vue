<template>
  <el-dialog
    v-model="visible"
    :visible.sync="visible"
    :title="type == 'add' ? '添加商品' : '修改商品'"
    width="400px"
  >
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="100px" class="good-form">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="ruleForm.link" type="text" />
      </el-form-item>
      <el-form-item label="商品编号" prop="id">
        <el-input v-model="ruleForm.id" type="number" min="0" />
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
import { hasEmoji } from '@/utils/index'
import { Message } from 'element-ui'
export default {
  name: 'DialogAddHotGood',
  props: {
    type: String,
    configType: Number,
    reload: Function
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        name: '',
        link: '',
        id: '',
        sort: ''
      },
      rules: {
        name: [
          { required: 'true', message: '名称不能为空', trigger: ['change'] }
        ],
        id: [
          { required: 'true', message: '编号不能为空', trigger: ['change'] }
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
      axios.get(`/indexConfigs/${id}`).then(res => {
        this.ruleForm = {
          name: res.configName,
          id: res.goodsId,
          link: res.redirectUrl,
          sort: res.configRank
        }
      })
    },
    // 开启弹窗
    open(id) {
      this.visible = true
      if (id) {
        this.id = id
        this.getDetail(id)
      } else {
        this.ruleForm = {
          name: '',
          id: '',
          link: '',
          sort: ''
        }
      }
    },
    // 关闭弹窗
    close() {
      this.visible = false
    }, submitForm() {
      this.$refs.formRef.value.validate((valid) => {
        if (valid) {
          if (hasEmoji(this.ruleForm.name) || hasEmoji(this.ruleForm.link)) {
            Message.error('不要输入表情包，再输入就打死你个龟孙儿~')
            return
          }
          if (this.ruleForm.sort < 0 || this.ruleForm.sort > 200) {
            Message.error('排序值不能小于 0 或大于 200')
            return
          }
          if (this.props.type === 'add') {
            axios.post('/indexConfigs', {
              configType: this.props.configType || 3,
              configName: this.ruleForm.name,
              redirectUrl: this.ruleForm.link,
              goodsId: this.ruleForm.id,
              configRank: this.ruleForm.sort
            }).then(() => {
              Message.success('添加成功')
              this.visible = false
              if (this.props.reload) this.props.reload()
            })
          } else {
            axios.put('/indexConfigs', {
              configId: this.id,
              configType: this.props.configType || 3,
              configName: this.ruleForm.name,
              redirectUrl: this.ruleForm.link,
              goodsId: this.ruleForm.id,
              configRank: this.ruleForm.sort
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
  //     visible: false,
  //     ruleForm: {
  //       name: '',
  //       link: '',
  //       id: '',
  //       sort: ''
  //     },
  //     rules: {
  //       name: [
  //         { required: 'true', message: '名称不能为空', trigger: ['change'] }
  //       ],
  //       id: [
  //         { required: 'true', message: '编号不能为空', trigger: ['change'] }
  //       ],
  //       sort: [
  //         { required: 'true', message: '排序不能为空', trigger: ['change'] }
  //       ]
  //     },
  //     id: ''
  //   })
  //   // 获取详情
  //   const getDetail = (id) => {
  //     axios.get(`/indexConfigs/${id}`).then(res => {
  //       state.ruleForm = {
  //         name: res.configName,
  //         id: res.goodsId,
  //         link: res.redirectUrl,
  //         sort: res.configRank
  //       }
  //     })
  //   }
  //   // 开启弹窗
  //   const open = (id) => {
  //     state.visible = true
  //     if (id) {
  //       state.id = id
  //       getDetail(id)
  //     } else {
  //       state.ruleForm = {
  //         name: '',
  //         id: '',
  //         link: '',
  //         sort: ''
  //       }
  //     }
  //   }
  //   // 关闭弹窗
  //   const close = () => {
  //     state.visible = false
  //   }
  //   const submitForm = () => {
  //     formRef.value.validate((valid) => {
  //       if (valid) {
  //         if (hasEmoji(state.ruleForm.name) || hasEmoji(state.ruleForm.link)) {
  //           Message.error('不要输入表情包，再输入就打死你个龟孙儿~')
  //           return
  //         }
  //         if (state.ruleForm.sort < 0 || state.ruleForm.sort > 200) {
  //           Message.error('排序值不能小于 0 或大于 200')
  //           return
  //         }
  //         if (props.type === 'add') {
  //           axios.post('/indexConfigs', {
  //             configType: props.configType || 3,
  //             configName: state.ruleForm.name,
  //             redirectUrl: state.ruleForm.link,
  //             goodsId: state.ruleForm.id,
  //             configRank: state.ruleForm.sort
  //           }).then(() => {
  //             Message.success('添加成功')
  //             state.visible = false
  //             if (props.reload) props.reload()
  //           })
  //         } else {
  //           axios.put('/indexConfigs', {
  //             configId: state.id,
  //             configType: props.configType || 3,
  //             configName: state.ruleForm.name,
  //             redirectUrl: state.ruleForm.link,
  //             goodsId: state.ruleForm.id,
  //             configRank: state.ruleForm.sort
  //           }).then(() => {
  //             Message.success('修改成功')
  //             state.visible = false
  //             if (props.reload) props.reload()
  //           })
  //         }
  //       }
  //     })
  //   }
  //   return {
  //     ...toRefs(state),
  //     open,
  //     close,
  //     formRef,
  //     submitForm
  //   }
  // }
}
</script>

<style scoped>
</style>
