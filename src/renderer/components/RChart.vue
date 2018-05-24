<template>
    <div :id="id" style="height: 50px;"></div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      chart: '',
      options: {
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            indicator: [
              { text: '品牌', max: 100 },
              { text: '内容', max: 100 },
              { text: '可用性', max: 100 },
              { text: '功能', max: 100 }
            ],
            radius: 80
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            data: [
              {
                value: [60, 73, 85, 40],
                name: '高薪资'
              },
              {
                value: [45, 73, 85, 40],
                name: ''
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.options)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
</style>
