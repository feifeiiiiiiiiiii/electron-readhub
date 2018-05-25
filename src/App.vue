<template>
        <div id="app">
        <transition name="fade"
                        mode="out-in">
                <router-view></router-view>
        </transition>
        </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      background-color: rgb(84, 92, 100);
      .el-menu {
        height: 100%;
      }
    }
    .content-container {
      background-color: #ebedf1;
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
    }
  }
  .box-card {
    .pubdate {
      font-size: 14px;
      color: #909399;
    }
    .box-content {
      color: #737373;
      font-size: 14px;
    }
    .box-source {
        p {
            color: #409eff;
            text-decoration: none;
            font-size: 12px;
            cursor: pointer;
        }
    }
    margin-bottom: 16px;
  }
}
</style>