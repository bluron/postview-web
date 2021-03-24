<template>
  <el-menu class="el-menu-vertical" :default-active="activeMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <menu-tree v-for="menu in navMenu" :key="menu.id" :menuData="menu"></menu-tree>
  </el-menu>
</template>

<script>
import menuTree from '../../components/MenuTree.vue'

export default {
  computed: {
    navMenu () {
      return this.$store.state.navMenu
    },
    activeMenu () {
      const route = this.$route
      const { path } = route
      return path
    }
  },
  components: {
    menuTree
  }
}
</script>

<style>
  .el-menu-vertical {
    width: 200px;
    height:calc(100vh - 60px);
  }
</style>
