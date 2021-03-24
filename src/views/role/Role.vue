<template>
  <div>
    <el-form :inline="true" :model="sysRoleVo" class="demo-form-inline">
      <el-form-item label="角色">
          <select-plus v-model="sysRoleVo.roleId" :selectUrl="selectUrl" :selectParam="selectParam"></select-plus>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="sysRoleVo.state" placeholder="状态" clearable>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="primary" icon="el-icon-check" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-check" @click="distMenu">分配资源</el-button>
      </el-form-item>
    </el-form>
    <table-plus :tableData="tableData" :colConfigs="colConfigs" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"
      :pageSize="pageSize" :total="total" :pageNo="pageNo" @selectRow="selectRow">
      <template v-slot:opt>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleEnable(scope.$index, scope.row)">启用</el-button>
            <el-button size="mini" type="danger" @click="handleDisable(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </template>
    </table-plus>
    <!-- 新增 -->
    <dialog-plus :show.sync="showAdd" @submit="save">
      <template v-slot:title>新增角色</template>
      <template v-slot:content>
        <el-form :model="sysRole" ref="addRef" label-width="100px">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="sysRole.roleName" placeholder="角色名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
    <!-- 编辑 -->
    <dialog-plus :show.sync="showEdit" @submit="edit">
      <template v-slot:title>修改角色</template>
      <template v-slot:content>
        <el-form :model="sysRoleEdit" label-width="100px">
          <el-form-item label="角色名称">
            <el-input v-model="sysRoleEdit.roleName" placeholder="角色名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
    <!-- 资源配置 -->
    <dialog-plus :show.sync="showDist" @submit="dist">
      <template v-slot:title>资源配置</template>
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
import { roleSelect, roleQuery, roleSave, roleUpdate, roleEnable, roleDisable, getMenuByRoleId, saveRoleMenu } from '../../api/role/index.js'
import { menuTree } from '../../api/menu/index.js'

export default {
  data () {
    return {
      tableData: [],
      treeData: [],
      sysRole: {
        roleName: ''
      },
      sysRoleVo: {
        roleId: '',
        state: '',
        pageSize: 10,
        pageNo: 1
      },
      sysRoleEdit: {
        roleName: ''
      },
      colConfigs: [
        { prop: 'roleName', label: '角色名称', minWidth: '40%' },
        { prop: 'state', label: '状态', minWidth: '40%', formatter: this.formatState },
        { slot: 'opt' }
      ],
      selectUrl: roleSelect,
      selectParam: { pageSize: 10 },
      showAdd: false,
      showEdit: false,
      showDist: false,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      selectedRow: null,
      checkedKeys: []
    }
  },
  methods: {
    query () {
      roleQuery(this.sysRoleVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    save () {
      roleSave(this.sysRole).then(res => {
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
    dist () {
      const roleId = this.selectedRow.roleId
      const menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join()
      saveRoleMenu({ roleId: roleId, menuIds: menuIds }).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showDist = false
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
    selectRow (val) {
      this.selectedRow = val
    },
    distMenu (index, row) {
      this.showDist = true
      menuTree().then(res => {
        this.treeData = res
      })
      getMenuByRoleId('?roleId=' + this.selectedRow.roleId).then(res => {
        this.$refs.tree.setCheckedKeys(res)
      })
    },
    handleEdit (index, row) {
      this.sysRoleEdit.roleName = row.roleName
      this.sysRoleEdit.password = row.password
      this.showEdit = true
    },
    edit () {
      roleUpdate(this.sysRoleEdit).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showEdit = false
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEnable (index, row) {
      roleEnable('?roleId=' + row.roleId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDisable (index, row) {
      roleDisable('?roleId=' + row.roleId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    add () {
      this.showAdd = true
    },
    handleSizeChange (val) {
      this.sysRoleVo.pageSize = val
      roleQuery(this.sysRoleVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    handleCurrentChange (val) {
      this.sysRoleVo.pageNo = val
      roleQuery(this.sysRoleVo).then(res => {
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
