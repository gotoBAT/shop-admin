<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Menu,
  ArrowRight,
  FullScreen,
  Notification
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/apis/common'
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
// 登出
const handleLogou = () => {
  // 退出提示
  ElMessageBox.confirm('确认退出吗？', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 确认发出退出请求
    await logout()

    // 清除用户登录信息
    store.commit('setUser', null)

    ElMessage({
      type: 'success',
      message: '退出成功!'
    })

    // 跳转到登录页
    router.push({
      name: 'login'
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出'
    })
  })
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
      <el-space :size="30">
        <el-tooltip
          content="全屏"
          placement="bottom"
        >
          <el-icon
            :size="28"
            @click="toggleFullScreen"
          >
            <FullScreen />
          </el-icon>
        </el-tooltip>
        <el-icon :size="28">
          <Notification />
        </el-icon>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ $store.state.user?.account }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogou">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
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
    .left,.right {
      display: flex;
      align-items: center;
    }
}
</style>
