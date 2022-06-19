<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons-vue'
</script>

<template>
  <el-menu
    default-active="2"
    class="asideBar"
    background-color="#041528"
    text-color="#fcfdff"
    active-text-color="#4a8aea"
    :collapse="$store.state.isCollapse"
  >
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item
      index="3"
    >
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.asideBar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
</style>
