<template>
  <div>
    <el-form :inline="true" :model="sysCompanyVo" class="demo-form-inline">
      <el-form-item label="公司">
        <select-plus v-model="sysCompanyVo.companyId" :selectUrl="selectUrl" :selectParam="selectParam"></select-plus>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="primary" icon="el-icon-check" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <table-plus :tableData="tableData" :colConfigs="colConfigs" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"
      :pageSize="pageSize" :total="total" :pageNo="pageNo">
      <template v-slot:opt>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </table-plus>
    <!-- 新增 -->
    <dialog-plus :show.sync="showAdd" @submit="save">
      <template v-slot:title>新增公司</template>
      <template v-slot:content>
        <el-form :model="sysCompany" ref="addRef" label-width="100px">
          <el-form-item prop="companyName" label="公司名称">
            <el-input v-model="sysCompany.companyName" placeholder="公司名称"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
    <!-- 编辑 -->
    <dialog-plus :show.sync="showEdit" @submit="edit">
      <template v-slot:title>编辑公司</template>
      <template v-slot:content>
        <el-form :model="sysCompanyEdit" label-width="100px">
          <el-form-item label="公司名称">
            <el-input v-model="sysCompanyEdit.companyName" placeholder="公司名称"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
  </div>
</template>

<script>
import selectPlus from '../../components/SelectPlus.vue'
import tablePlus from '../../components/TablePlus.vue'
import dialogPlus from '../../components/DialogPlus.vue'
import { companySelect, companyQuery, companySave, companyUpdate, companyDelete } from '../../api/company/index.js'

export default {
  data () {
    return {
      tableData: [],
      sysCompanyVo: {
        companyId: '',
        companyName: '',
        pageSize: 10,
        pageNo: 1
      },
      sysCompany: {
        companyId: '',
        companyName: ''
      },
      sysCompanyEdit: {
        companyId: '',
        companyName: ''
      },
      selectUrl: companySelect,
      selectParam: { pageSize: 10 },
      colConfigs: [
        { prop: 'companyName', label: '公司名称', minWidth: '80%' },
        { slot: 'opt' }
      ],
      showAdd: false,
      showEdit: false,
      total: 0,
      pageNo: 1,
      pageSize: 10
    }
  },
  methods: {
    query () {
      companyQuery(this.sysCompanyVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    add () {
      this.showAdd = true
    },
    save () {
      companySave(this.sysCompany).then(res => {
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
    edit () {
      companyUpdate(this.sysCompanyEdit).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showEdit = false
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEdit (index, row) {
      this.sysCompanyEdit.companyId = row.companyId
      this.sysCompanyEdit.companyName = row.companyName
      this.showEdit = true
    },
    handleDelete (index, row) {
      companyDelete('?companyId=' + row.companyId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange (val) {
      this.sysCompanyVo.pageSize = val
      companyQuery(this.sysCompanyVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    handleCurrentChange (val) {
      this.sysCompanyVo.pageNo = val
      companyQuery(this.sysCompanyVo).then(res => {
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
