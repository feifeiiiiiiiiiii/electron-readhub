<template>
	<el-col :span="24" class="header">
        <el-col :span="10" class="logo">
            Readhub
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
