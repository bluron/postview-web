<template>
  <el-select
    v-model="svalue"
    clearable
    filterable
    remote
    :remote-method="remoteMethod"
    @focus="focus"
    @clear="clear"
    placeholder="请选择">
    <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { doPost } from '../http/http.js'
export default {
  data () {
    return {
      options: [],
      svalue: this.value,
      selectData: []
    }
  },
  props: {
    selectUrl: String,
    selectParam: Object,
    value: [String, Number]
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.selectParam.query = query
        doPost(this.selectUrl, this.selectParam).then(res => {
          this.options = res
        })
      }
    },
    focus () {
      if (this.selectData.length === 0) {
        doPost(this.selectUrl, this.selectParam).then(res => {
          this.options = res
          this.selectData = res
        })
      } else {
        this.options = this.selectData
      }
    },
    clear () {
      this.selectParam.query = null
      this.selectData = []
    }
  },
  watch: {
    value (val) {
      this.svalue = val
    },
    svalue (val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
