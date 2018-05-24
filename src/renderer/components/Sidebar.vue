<template>
  <div class="l-sidebar">
    <el-menu
      :default-active="selected"
      class="el-menu-vertical-demo"
      background-color="#545c64"
       @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="topic">
        <span slot="title">热门话题</span>
      </el-menu-item>
      <el-menu-item index="news">
        <span slot="title">科技动态</span>
      </el-menu-item>
      <el-menu-item index="tech">
        <span slot="title">开发者资讯</span>
      </el-menu-item>
      <el-menu-item index="blockchain">
        <span slot="title">区域链快讯</span>
      </el-menu-item>
      <el-menu-item index="jobs">
        <span slot="title">招聘行情</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  props: ['selected'],
  methods: {
    handleSelect (v) {
      switch (v) {
        case 'topic':
          this.$router.push({path: '/'})
          break
        case 'news':
          this.$router.push({path: '/news'})
          break
        case 'tech':
          this.$router.push({path: '/tech'})
          break
        case 'blockchain':
          this.$router.push({path: '/blockchain'})
          break
        case 'jobs':
          this.$router.push({path: '/jobs'})
          break
      }
    }
  },
  components: {
  },
  name: 'sidebar'
}
</script>

<style>
.el-menu {
  border-right: none;
}
</style>
