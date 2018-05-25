<template>
    <div v-if="show">
        <div class="page-component-up" @click.prevent="backTop">
            <i class="el-icon-caret-top"></i>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 0.1
    }
  },
  data () {
    return {
      show: false,
      visibilityHeight: 200
    }
  },
  methods: {
    backTop () {
      let element = document.getElementsByClassName('container')[0]
      let that = this
      let top = element.scrollTop

      let timer = setInterval(function () {
        top -= Math.abs(top * that.speed)
        if (top <= 1) {
          top = 0
          clearInterval(timer)
        }
        element.scrollTop = top
      }, 20)
      return false
    },
    showBack (e) {
      if (e.target.scrollTop > this.visibilityHeight) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted () {
    let element = document.getElementsByClassName('container')[0]
    element.addEventListener('scroll', this.showBack)
  }
}
</script>


<style lang="scss">
.page-component-up {
  background-color: #58b7ff;
  position: fixed;
  right: 60px;
  bottom: 120px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0.4;
  transition: 0.3s;

  i {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
}
</style>
