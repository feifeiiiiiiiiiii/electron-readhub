<template>
	<el-col :span="24" class="header">
        <el-col :span="10" class="logo">
            Readhub
            <sup data-v-7a685ee2="" style="color: red; padding-left: 0.2em; font-size: 14px;">beta</sup>
        </el-col>
	</el-col>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  background: #373d41;
  color: #666;
  .logo {
    height: 60px;
    padding-top: 2px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
