<template>
  <div>
    <el-form :inline="true" :model="sysInterfaceVo" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="sysInterfaceVo.keyWord" placeholder="关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="接口类型">
        <el-select v-model="sysInterfaceVo.interfaceType" placeholder="接口类型" clearable>
          <el-option label="post" value="1"></el-option>
          <el-option label="get" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口环境">
        <el-select v-model="sysInterfaceVo.interfaceEnv" placeholder="接口环境" clearable>
          <el-option label="开发" value="1"></el-option>
          <el-option label="测试" value="2"></el-option>
          <el-option label="生产" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司">
          <selectPlus v-model="sysInterfaceVo.companyId" :selectUrl="selectUrl" :selectParam="selectParam"></selectPlus>
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
      <template v-slot:title>新增接口</template>
      <template v-slot:content>
        <el-form :model="sysInterface" ref="addRef" label-width="100px">
          <el-form-item prop="interfaceAddr" label="接口地址">
            <el-input v-model="sysInterface.interfaceAddr" placeholder="接口地址" clearable></el-input>
          </el-form-item>
          <el-form-item prop="keyWord" label="关键字">
            <el-input v-model="sysInterface.keyWord" placeholder="关键字" clearable></el-input>
          </el-form-item>
          <el-form-item prop="interfaceType" label="接口类型">
            <el-select v-model="sysInterface.interfaceType" placeholder="接口类型">
              <el-option label="post" value="1"></el-option>
              <el-option label="get" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="interfaceEnv" label="接口环境">
            <el-select v-model="sysInterface.interfaceEnv" placeholder="接口环境">
              <el-option label="开发" value="1"></el-option>
              <el-option label="测试" value="2"></el-option>
              <el-option label="生产" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="companyId" label="公司">
              <selectPlus v-model="sysInterface.companyId" :selectUrl="selectUrl" :selectParam="selectParam"></selectPlus>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input v-model="sysInterface.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </dialog-plus>
    <!-- 编辑 -->
    <dialog-plus :show.sync="showEdit" @submit="edit">
      <template v-slot:title>修改接口</template>
      <template v-slot:content>
        <el-form :model="sysInterfaceEdit" label-width="100px">
          <el-form-item label="接口地址">
            <el-input v-model="sysInterfaceEdit.interfaceAddr" placeholder="接口地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="sysInterfaceEdit.keyWord" placeholder="关键字" clearable></el-input>
          </el-form-item>
          <el-form-item label="接口类型">
            <el-select v-model="sysInterfaceEdit.interfaceType" placeholder="接口类型">
              <el-option label="post" :value="1"></el-option>
              <el-option label="get" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口环境">
            <el-select v-model="sysInterfaceEdit.interfaceEnv" placeholder="接口环境">
              <el-option label="开发" :value="1"></el-option>
              <el-option label="测试" :value="2"></el-option>
              <el-option label="生产" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司">
              <selectPlus v-model="sysInterfaceEdit.companyId" :selectUrl="selectUrl" :selectParam="selectParam"></selectPlus>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="sysInterfaceEdit.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注"></el-input>
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
import { interfaceQuery, interfaceSave, interfaceUpdate, interfaceDelete } from '../../api/interface/index.js'
import { companySelect } from '../../api/company/index.js'

export default {
  data () {
    return {
      tableData: [],
      sysInterfaceVo: {
        keyWord: '',
        interfaceType: '',
        interfaceEnv: '',
        companyId: '',
        pageSize: 10,
        pageNo: 1
      },
      sysInterface: {
        interfaceAddr: '',
        keyWord: '',
        interfaceType: '',
        interfaceEnv: '',
        companyId: '',
        remark: ''
      },
      sysInterfaceEdit: {
        interfaceAddr: '',
        keyWord: '',
        interfaceType: '',
        interfaceEnv: '',
        companyId: '',
        remark: ''
      },
      selectUrl: companySelect,
      selectParam: { pageSize: 10 },
      colConfigs: [
        { prop: 'interfaceAddr', label: '地址', minWidth: '40%' },
        { prop: 'interfaceType', label: '类型', minWidth: '10%', formatter: this.formatType },
        { prop: 'interfaceEnv', label: '环境', minWidth: '10%', formatter: this.formatEnv },
        { prop: 'companyName', label: '公司', minWidth: '10%' },
        { prop: 'remark', label: '备注', minWidth: '10%' },
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
      interfaceQuery(this.sysInterfaceVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    add () {
      this.showAdd = true
    },
    save () {
      interfaceSave(this.sysInterface).then(res => {
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
    formatType (row, column) {
      let typeName = ''
      if (row.interfaceType === 1) {
        typeName = 'post'
      } else {
        typeName = 'get'
      }
      return typeName
    },
    formatEnv (row, column) {
      let envName = ''
      if (row.interfaceEnv === 1) {
        envName = '开发'
      } else if (row.interfaceEnv === 2) {
        envName = '测试'
      } else {
        envName = '生产'
      }
      return envName
    },
    handleEdit (index, row) {
      this.sysInterfaceEdit.interfaceAddr = row.interfaceAddr
      this.sysInterfaceEdit.interfaceType = row.interfaceType
      this.sysInterfaceEdit.interfaceEnv = row.interfaceEnv
      this.sysInterfaceEdit.remark = row.remark
      this.sysInterfaceEdit.keyWord = row.keyWord
      this.sysInterfaceEdit.interfaceId = row.interfaceId
      this.showEdit = true
    },
    handleDelete (index, row) {
      interfaceDelete('?interfaceId=' + row.interfaceId).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    edit () {
      interfaceUpdate(this.sysInterfaceEdit).then(res => {
        if (res.result) {
          this.$message.success(res.msg)
          this.showEdit = false
          this.query()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    handleSizeChange (val) {
      this.sysInterfaceVo.pageSize = val
      interfaceQuery(this.sysInterfaceVo).then(res => {
        this.tableData = res.rows
        this.total = res.total
      })
    },
    handleCurrentChange (val) {
      this.sysInterfaceVo.pageNo = val
      interfaceQuery(this.sysInterfaceVo).then(res => {
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
