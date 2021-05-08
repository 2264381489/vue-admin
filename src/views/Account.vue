<template>
  <div>
    <el-card class="account-container">
      <el-form
        ref="nameRef"
        :model="nameForm"
        :rules="rules1"
        label-width="80px"
        label-position="right"
        class="demo-ruleForm"
      >
        <el-form-item label="登录名：" prop="loginName">
          <el-input v-model="nameForm.loginName" style="width: 200px" />
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="nameForm.nickName" style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitName()">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-card class="account-container">
        <el-form
          ref="passRef"
          :model="passForm"
          :rules="rules2"
          label-width="80px"
          label-position="right"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码：" prop="oldpass">
            <el-input v-model="passForm.oldPass" style="width: 200px" />
          </el-form-item>
          <el-form-item label="新密码：" prop="newpass">
            <el-input v-model="passForm.newPass" style="width: 200px" />
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitPass()">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import { Message } from 'element-ui'

export default {
  name: 'Account',
  data() {
    return {
      user: null,
      nameForm: {
        loginName: '',
        nickName: ''
      },
      passForm: {
        oldPass: '',
        newPass: ''
      },
      rules1: {
        loginName: [
          { required: 'true', message: '登录名不能为空', trigger: ['change'] }
        ],
        nickName: [
          { required: 'true', message: '昵称不能为空', trigger: ['change'] }
        ]
      },
      rules2: {
        oldPass: [
          { required: 'true', message: '原密码不能为空', trigger: ['change'] }
        ],
        newPass: [
          { required: 'true', message: '新密码不能为空', trigger: ['change'] }
        ]
      }
    }
  },
  methods: {
    submitName() {
      this.$refs.nameRef.validate((valid) => {
        if (valid) {
          axios.put('/adminUser/name', {
            loginUserName: this.nameForm.loginName,
            nickName: this.nameForm.nickName
          }).then(() => {
            Message.success('修改成功')
            window.location.reload()
          })
        } else {
          Message.error('请填满原密码,新密码')
        }
      })
    },
    submitPass() {
      this.$refs.passRef.validate((valid) => {
        if (valid) {
          axios.put('/adminUser/password', {
            originalPassword: this.passForm.oldPass,
            newPassword: this.passForm.newPass
          }).then(() => {
            Message.success('修改成功')
            window.location.reload()
          })
        } else {
          Message.error('请填满原密码,新密码')
        }
      })
    }
  }

  //   const submitPass = () => {
  //     passRef.value.validate((vaild) => {
  /*      if (vaild) {*/
  /*        axios.put('/adminUser/password', {*/
  /*          originalPassword: md5(state.passForm.oldpass),*/
  /*          newPassword: md5(state.passForm.newpass)*/
  /*        }).then(() => {*/
  /*          ElMessage.success('修改成功')*/
  /*          window.location.reload()*/
  /*        })*/
  /*      }*/
  /*    })*/
  /*  }*/

// setup() {
//   const nameRef = ref(null)
//   const passRef = ref(null)
//   const state = reactive({
//     user: null,
//     nameForm: {
//       loginName: '',
//       nickName: ''
//     },
//     passForm: {
//       oldpass: '',
//       newpass: ''
//     },
//     rules: {
//       loginName: [
//         { required: 'true', message: '登录名不能为空', trigger: ['change'] }
//       ],
//       nickName: [
//         { required: 'true', message: '昵称不能为空', trigger: ['change'] }
//       ],
//       oldpass: [
//         { required: 'true', message: '原密码不能为空', trigger: ['change'] }
//       ],
//       newpass: [
//         { required: 'true', message: '新密码不能为空', trigger: ['change'] }
//       ]
//     }
//   })
//   const submitName = () => {
//     nameRef.value.validate((vaild) => {
//       if (vaild) {
//         axios.put('/adminUser/name', {
//           loginUserName: state.nameForm.loginName,
//           nickName: state.nameForm.nickName
//         }).then(() => {
//           ElMessage.success('修改成功')
//           window.location.reload()
//         })
//       }
//     })
//   }
//   const submitPass = () => {
//     passRef.value.validate((vaild) => {
  /*      if (vaild) {*/
  /*        axios.put('/adminUser/password', {*/
  /*          originalPassword: md5(state.passForm.oldpass),*/
  /*          newPassword: md5(state.passForm.newpass)*/
  /*        }).then(() => {*/
  /*          ElMessage.success('修改成功')*/
  /*          window.location.reload()*/
  /*        })*/
  /*      }*/
  /*    })*/
  /*  }*/
//   return {
//     ...toRefs(state),
//     nameRef,
//     passRef,
//     submitName,
//     submitPass
//   }
// },
}

</script>

<style>
.account-container {
  margin-bottom: 20px;
}
</style>
