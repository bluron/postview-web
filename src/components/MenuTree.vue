<template>
  <el-submenu v-if="menuData.children" :index="menuData.id + ''">
    <template slot="title">
      <i :class="menuData.icon"></i>
      <span slot="title">{{menuData.label}}</span>
    </template>
    <menu-tree v-for="menu in menuData.children" :key="menu.id" :menuData="menu"></menu-tree>
  </el-submenu>
  <el-menu-item v-else :index="menuData.url" @click="handleRoute(menuData)">
    <i :class="menuData.icon"></i>
    <span slot="title">{{menuData.label}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menuTree',
  props: {
    menuData: Object
  },
  computed: {
    openedTabs () {
      return this.$store.state.openedTab
    },
    activatedTab () {
      return this.$store.state.activatedTab
    }
  },
  methods: {
    handleRoute (menu) {
      this.$router.push(menu.url)
      const newTab = []
      this.openedTabs.forEach((openedTab, index) => {
        newTab.push(openedTab.name)
      })
      const rst = newTab.indexOf(menu.url)
      if (rst === -1) {
        this.$store.commit({
          type: 'openTab',
          openedTab: {
            name: menu.url,
            label: menu.label
          },
          option: 'add'
        })
      } else {
        this.$store.commit({
          type: 'activeTab',
          activatedTab: {
            name: menu.url,
            label: menu.label
          }
        })
      }
    }
  }
}
</script>
