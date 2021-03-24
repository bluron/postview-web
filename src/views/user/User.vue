<template>
  <div>
    <el-form :inline="true" :model="sysUserVo" class="demo-form-inline">
      <el-form-item label="用户">
        <selectPlus v-model="sysUserVo.userId" :selectUrl="selectUrl" :selectParam="selectParam"></selectPlus>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="sysUserVo.state" clearable placeholder="状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="primary" icon="el-icon-check" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-check" @click="distRole">分配角色</el-button>
      </el-form-item>
    </el-form>
    <table-plus :tableData="tableData" :colConfigs="colConfigs" @sizeChange="sizeChange" @currentChange="currentChange"
      :pageSize="pageSize" :total="total" :pageNo="pageNo" @selectRow="selectRow">
      <template v-slot:opt>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="resetPass(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" type="success" @click="enable(scope.$index, scope.row)">启用</el-button>
            <el-button size="mini" type="danger" @click="disable(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </template>
    </table-plus>
    <!-- 新增 -->
    <dialog-plus :show.sync="showAdd" @submit="save">
      <template v-slot:title>新增用户</template>
      <template v-slot:content>
        <el-form :model="sysUser" status-icon :rules="rules" ref="addRef" label-width="100px">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="sysUser.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="sysUser.password" placeholder="密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword" label="确认密码">
            <el-input type="password" v-model="sysUser.checkPassword" placeholder="确认密码" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
    <!-- 分配角色 -->
    <dialog-plus :show.sync="showDist" @submit="dist">
      <template v-slot:title>分配角色</template>
      <template v-slot:content>
        <tree-plus ref="tree" :treeData="treeData"></tree-plus>
      </template>
    </dialog-plus>
  </div>
</template>

<script>
import selectPlus from '../../components/SelectPlus.vue'
import tablePlus from '../../components/TablePlus.vue'
import dialogPlus from '../../components/DialogPlus.vue'
import treePlus from '../../components/TreePlus.vue'
import { userSave, userEnable, userDisable, userSelect, userQuery, resetPass, getRoleByUserId, saveUserRole } from '../../api/user/index.js'
import { roleTree } from '../../api/role/index.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.sysUser.password !== '') {
            this.$refs.addRef.validateField('password')
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
      tableData: [],
      treeData: [],
      sysUserVo: {
        userId: '',
        state: ''
      },
      sysUser: {
        username: '',
        password: ''
      },
      selectUrl: userSelect,
      selectParam: { pageSize: 10 },
      colConfigs: [
        { prop: 'username', label: '用户名', minWidth: '40%' },
        { prop: 'state', label: '状态', minWidth: '40%', formatter: this.formatState },
        { slot: 'opt' }
      ],
      showAdd: false,
      showEdit: false,
      showDist: false,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      addRef: {
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
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedRow: null,
      checkedKeys: []
    }
  },
  methods: {
    query () {
      userQuery(this.sysUserVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    add () {
      this.showAdd = true
    },
    distRole () {
      this.showDist = true
      roleTree().then(res => {
        this.treeData = res
      })
      getRoleByUserId('?userId=' + this.selectedRow.userId).then(res => {
        this.$refs.tree.setCheckedKeys(res)
      })
    },
    dist () {
      const roleId = this.$refs.tree.getCheckedKeys()
      if (roleId.length !== 1) {
        this.$message.warning('只能选择一个角色')
        return
      }
      const userId = this.selectedRow.userId
      saveUserRole({ userId: userId, roleId: roleId[0] }).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showDist = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    selectRow (val) {
      this.selectedRow = val
    },
    save () {
      userSave(this.sysUser).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showAdd = false
          this.$refs.addRef.resetFields()
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatState (row, column) {
      let stateName = ''
      if (row.state === 1) {
        stateName = '启用'
      } else {
        stateName = '禁用'
      }
      return stateName
    },
    enable (index, row) {
      userEnable('?userId=' + row.userId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    disable (index, row) {
      userDisable('?userId=' + row.userId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetPass (index, row) {
      resetPass('?userId=' + row.userId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    sizeChange (val) {
      this.sysUserVo.pageSize = val
      userQuery(this.sysUserVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    currentChange (val) {
      this.sysUserVo.pageNo = val
      userQuery(this.sysUserVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    }
  },
  components: {
    selectPlus,
    tablePlus,
    dialogPlus,
    treePlus
  }
}
</script>
