<template>
  <el-container>
    <el-header height="50px">
      <head-bar></head-bar>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main>
        <div class="tabPane">
          <tab-pane></tab-pane>
        </div>
        <div class="router">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headBar from './HeadBar.vue'
import navMenu from './NavMenu.vue'
import tabPane from './TabPane.vue'

export default {
  components: {
    headBar,
    navMenu,
    tabPane
  }
}
</script>

<style scoped>
  .tabPane {
    margin-top: 10px;
  }
  .router {
    margin-top: 30px;
  }
</style>
