<template>
  <el-tree
    :data="treeData"
    ref="tree"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps">
  </el-tree>
</template>

<script>
export default {
  data () {
    return {
      checkedKeys: [],
      defaultProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  methods: {
    setCheckedKeys (data) {
      this.$refs.tree.setCheckedKeys(data)
    },
    getCheckedKeys () {
      return this.$refs.tree.getCheckedKeys()
    },
    getHalfCheckedKeys () {
      return this.$refs.tree.getHalfCheckedKeys()
    }
  },
  props: {
    treeData: Array
  }
}
</script>
