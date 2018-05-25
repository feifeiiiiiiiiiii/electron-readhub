<template>
<div class="chart">
    <el-col :span="12">
        <div class="chart-board">
            <p>薪资分布</p>
            <template v-if="!loading">
                <line-chart :options="options" :chartData="salary" :width="400" :height="160"></line-chart>
            </template>
        </div>
    </el-col>
    <el-col :span="12">
        <div class="chart-board">
            <p>经验要求分布</p>
            <template v-if="!loading">
                <line-chart :options="options" :chartData="experience" :width="400" :height="160"></line-chart>
            </template>
        </div>
    </el-col>
    <el-col :span="12">
        <div class="chart-board">
            <p>城市分布</p>
            <template v-if="!loading">
                <bar-chart :options="options" :data="city" :width="400" :height="160"></bar-chart>
            </template>
        </div>
    </el-col>
</div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'
import ReadhubClient from '../clients/readhub'
import _ from 'lodash'

export default {
  components: {
    LineChart,
    BarChart
  },
  props: ['item'],
  data () {
    return {
      client: new ReadhubClient(),
      options: {
        scaleShowGridLines: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false
          }]
        },
        tooltips: {
          callbacks: {
            enabled: false,
            label: function (tooltipItem, data) {
              return '职位数 ' + tooltipItem.yLabel + '个'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      loading: false,
      salary: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      experience: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      city: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.loading = true
    this.client.chart(this.item.id).then((res) => {
      this.loading = false
      const {salary, experience, city} = res.data
      _.each(salary.data, (o) => {
        this.salary.labels.push(o.xaxis + salary.unit)
        this.salary.datasets[0].data.push(o.yaxis)
      })
      _.each(experience.data, (o) => {
        this.experience.labels.push(o.xaxis + experience.unit)
        this.experience.datasets[0].data.push(o.yaxis)
      })
      _.each(city.data, (o) => {
        this.city.labels.push(o.xaxis)
        this.city.datasets[0].data.push(o.yaxis)
      })
      console.log(this.city)
    })
  }
}
</script>

<style scoped lang="scss">
.chart {
    font-size: 12px;
    color: #909399;
    p {
        text-align: center;
    }
    .chart-board {
        margin: 8px;
    }
}
</style>
