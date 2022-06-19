<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Menu,
  ArrowRight,
  FullScreen
} from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()
// 菜单栏收缩
const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
// 动态路由面包屑
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
// 全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="left">
      <el-space>
        <el-icon
          @click="handleCollapse"
          :size="28"
          color="#333"
        >
          <Menu />
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="route of routes"
            :key="route.path"
          >
            {{ route.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-space>
    </div>
    <div class="right">
      <el-icon
        :size="28"
        @click="toggleFullScreen"
      >
        <FullScreen />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
}
</style>
