<template>
  <div class="login-container">
    <h2 class="title">系统登录</h2>
    <el-form :model="sysUser" ref="sysUser" label-position="left" class="demo-ruleForm">
      <el-form-item prop="username" :rules="[{ required: true, message: '用户名不能为空'}]">
        <el-input v-model="sysUser.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
        <el-input v-model="sysUser.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button style="width:48%" type="primary" @click="submitForm()">登 录</el-button>
        <el-button style="width:49%" @click="resetForm()">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../../api/login/index.js'

export default {
  data () {
    return {
      sysUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.sysUser.validate((valid) => {
        if (valid) {
          login(this.sysUser).then(res => {
            if (res.result) {
              localStorage.setItem('pvToken', res.param)
              localStorage.setItem('username', this.sysUser.username)
              this.$router.push({ path: '/' })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.sysUser.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 200px auto;
    width: 400px;
    padding: 35px 35px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px 0 #cac6c6;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
    padding-left: 22px;
  }
</style>
