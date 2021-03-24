<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClickTab">
    <el-tab-pane :key="tab.name" v-for="tab in editableTabs" :label="tab.label" :name="tab.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      editableTabsValue: '',
      editableTabs: [],
      openedTabs: []
    }
  },
  methods: {
    // 点击激活某个标签页
    handleClickTab (tab, event) {
      this.$store.commit({
        type: 'activeTab',
        activatedTab: {
          label: tab.label,
          name: tab.$vnode.key
        }
      })
      this.$router.push(tab.$vnode.key)
    },
    // 移除标签页
    removeTab (targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      let removedIndex = null
      let nextActiveTab = null
      // 计算删除标签后的的激活标签页
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          removedIndex = index
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
            nextActiveTab = nextTab
          }
        }
      })
      // 删除标签页
      this.openedTabs.splice(removedIndex, 1)
      // 设置激活后的标签页
      this.editableTabsValue = activeName
      // 过滤出删除的标签页
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      if (nextActiveTab !== null) {
        this.$store.commit({
          type: 'activeTab',
          activatedTab: nextActiveTab
        })
      }
      // 删除状态中的值
      this.$store.commit({
        type: 'openTab',
        name: targetName,
        option: 'remove'
      })
      // 所有标签页删除后跳转首页
      if (this.openedTabs.length === 0) {
        this.$router.push('/dashboard')
      }
    }
  },
  computed: {
    openedTab () {
      return this.$store.state.openedTab
    },
    activatedTab () {
      return this.$store.state.activatedTab
    }
  },
  watch: {
    // 监听openedTab添加tab
    openedTab (val) {
      if (val.length > this.openedTabs.length) {
        const newTab = val[val.length - 1]
        this.editableTabs.push({
          label: newTab.label,
          name: newTab.name
        })
        // 激活的tab
        this.editableTabsValue = newTab.name
        // 已经打开的tab
        this.openedTabs.push(newTab)
      }
    },
    // 监听activetab激活已存在的标签
    activatedTab (val) {
      if (val.name !== this.editableTabsValue) {
        this.editableTabsValue = val.name
      }
    }
  }
}
</script>
