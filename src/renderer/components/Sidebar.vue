<template>
  <div class="l-sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <span slot="title">热门话题</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">科技动态</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">开发者资讯</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">区域链快讯</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">招聘行情</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  methods: {
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
