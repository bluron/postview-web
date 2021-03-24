<template>
  <div>
    <div class="logo"><img src="../../assets/logo.png"></div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">{{username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="modifyPass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <dialog-plus :show.sync="showModify" @submit="modifyPass()">
      <template v-slot:title>修改密码</template>
      <template v-slot:content>
        <el-form :model="sysUser" status-icon :rules="rules" ref="ref" label-width="100px">
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="sysUser.password" placeholder="密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword" label="确认密码">
            <el-input type="password" v-model="sysUser.checkPassword" placeholder="确认密码" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
  </div>
</template>

<script>
import dialogPlus from '../../components/DialogPlus.vue'
import { logout } from '../../api/login/index.js'
import { modifyPass } from '../../api/user/index.js'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.sysUser.password !== '') {
            this.$refs.ref.validateField('checkPassword')
          }
          callback()
        }
      }, 1000)
    }
    var validatePass2 = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.sysUser.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      showModify: false,
      showLogout: false,
      sysUser: {
        username: '',
        password: '',
        checkPassword: ''
      },
      ref: {
        password: '',
        checkPassword: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    }
  },
  methods: {
    modifyPass () {
      this.$refs.ref.validate((valid) => {
        if (valid) {
          this.sysUser.username = localStorage.getItem('username')
          modifyPass(this.sysUser).then(res => {
            if (res.result) {
              localStorage.removeItem('username')
              localStorage.removeItem('pvToken')
              this.$router.push({ path: '/login' })
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleCommand (command) {
      if (command === 'modifyPass') {
        this.showModify = true
      } else {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          logout().then(res => {
            if (res.result) {
              localStorage.removeItem('username')
              localStorage.removeItem('pvToken')
              this.$router.push({ path: '/login' })
              this.$message({
                type: 'success',
                message: '登出成功'
              })
            } else {
              this.$message({
                type: 'info',
                message: '登出失败'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  },
  components: {
    dialogPlus
  }
}
</script>

<style>
  header.el-header {
    padding: 0 0px;
    background-color: #14889A;
    line-height: 50px;
  }
  .logo {
    width: 200px;
    height: 50px;
    background-color: #545c64;
    position: relative;
    float: left;
  }
  img {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .user-info {
    float: right;
    padding-right: 25px;
  }
  .el-dropdown-link {
    color: #FFFFFF;
    cursor: pointer;
  }
</style>
