<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home',
            replace: true
          },
          icon: 'home-o'
        },
        {
          title: '我的',
          to: {
            name: 'About',
            replace: true
          },
          icon: 'user-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  mounted() {

  },
  methods: {
    handleChange(v) {
      if (v === 1) {
        this.$router.replace({ path: '/add-select', query: { router: '/home' }})
      }
    }
  }
}
</script>

