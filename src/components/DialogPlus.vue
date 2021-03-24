<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show="show"
    @close="$emit('update:show', false)">
    <span slot="title"><slot name="title"></slot></span>
    <slot name="content"></slot>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sure () {
      this.$emit('submit')
    }
  },
  watch: {
    show (val) {
      this.dialogVisible = this.show
    }
  }
}
</script>
