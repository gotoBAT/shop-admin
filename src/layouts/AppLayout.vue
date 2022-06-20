<script setup lang="ts">
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  background-color:#f5f7f9;
}
.el-aside {
  background-color: #041528;
  color: #333;
  width: auto;
}
.el-header {
  background-color:#fff;
}

</style>
