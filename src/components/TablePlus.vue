<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      @current-change="selectRow">
      <el-table-column type="index"></el-table-column>
      <template v-for="colConfig in colConfigs">
        <slot v-if="colConfig.slot" name="opt"></slot>
        <el-table-column v-else v-bind="colConfig" :key="colConfig.prop" align="center"></el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    colConfigs: Array,
    pageSize: {
      type: Number,
      default: 10
    },
    pageNo: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
    },
    selectRow (val) {
      this.$emit('selectRow', val)
    }
  }
}
</script>
