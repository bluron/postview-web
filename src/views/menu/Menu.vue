<template>
  <div>
    <el-form :inline="true" :model="sysMenuVo" class="demo-form-inline">
      <el-form-item label="上级菜单">
        <select-plus v-model="sysMenuVo.supMenuId" :selectUrl="selectUrl" :selectParam="selectParam"></select-plus>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="sysMenuVo.state" clearable placeholder="状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <tablePlus :tableData="tableData" :colConfigs="colConfigs" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"
      :pageSize="pageSize" :total="total" :pageNo="pageNo">
      <template v-slot:opt>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleEnable(scope.$index, scope.row)">启用</el-button>
            <el-button size="mini" type="danger" @click="handleDisabled(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </template>
    </tablePlus>
    <!-- 编辑 -->
    <dialogPlus :show.sync="showEdit" @submit="edit">
      <template v-slot:title>编辑菜单</template>
      <template v-slot:content>
        <el-form :model="sysMenuEdit" label-width="100px">
          <el-form-item label="菜单名称">
            <el-input v-model="sysMenuEdit.menuName" placeholder="菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单地址">
            <el-input v-model="sysMenuEdit.menuUrl" placeholder="菜单地址"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="sysMenuEdit.menuIcon" placeholder="菜单图标"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
              <select-plus v-model="sysMenuEdit.supMenuId" :selectUrl="selectUrl" :selectParam="selectParam"></select-plus>
          </el-form-item>
        </el-form>
      </template>
    </dialogPlus>
  </div>
</template>

<script>
import selectPlus from '../../components/SelectPlus.vue'
import tablePlus from '../../components/TablePlus.vue'
import dialogPlus from '../../components/DialogPlus.vue'
import { menuEnable, menuDisable, menuSelect, menuQuery, menuUpdate } from '../../api/menu/index.js'

export default {
  data () {
    return {
      tableData: [],
      sysMenuVo: {
        supMenuId: '',
        state: '',
        pageSize: 10,
        pageNo: 1
      },
      sysMenuEdit: {
        menuId: '',
        menuName: '',
        menuUrl: '',
        menuIcon: '',
        subMenuId: ''
      },
      selectUrl: menuSelect,
      selectParam: { level: 0 },
      colConfigs: [
        { prop: 'menuId', label: '菜单ID', minWidth: '10%' },
        { prop: 'menuName', label: '菜单名称', minWidth: '10%' },
        { prop: 'menuUrl', label: '菜单地址', minWidth: '20%' },
        { prop: 'subMenuName', label: '上级菜单名称', minWidth: '10%' },
        { prop: 'menuIcon', label: '菜单图标', minWidth: '20%' },
        { prop: 'state', label: '状态', minWidth: '10%', formatter: this.formatState },
        { slot: 'opt' }
      ],
      showEdit: false,
      total: 0,
      pageNo: 1,
      pageSize: 10
    }
  },
  methods: {
    query () {
      menuQuery(this.sysMenuVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
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
    handleEdit (index, row) {
      this.sysMenuEdit.menuId = row.menuId
      this.sysMenuEdit.menuName = row.menuName
      this.sysMenuEdit.menuUrl = row.menuUrl
      this.sysMenuEdit.menuIcon = row.menuIcon
      this.sysMenuEdit.subMenuId = row.subMenuId
      this.showEdit = true
    },
    edit () {
      menuUpdate(this.sysMenuEdit).then(res => {
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
      menuEnable('?menuId=' + row.menuId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDisabled (index, row) {
      menuDisable('?menuId=' + row.menuId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange (val) {
      this.sysMenuVo.pageSize = val
      menuQuery(this.sysMenuVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    handleCurrentChange (val) {
      this.sysMenuVo.pageNo = val
      menuQuery(this.sysMenuVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    }
  },
  components: {
    selectPlus,
    tablePlus,
    dialogPlus
  }
}
</script>
