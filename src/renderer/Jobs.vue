<template>
	<el-row class="container">
    <Header></Header>
		<el-col :span="24" class="main">
      <aside>
        <sidebar selected="jobs"></sidebar>
      </aside>
			<section class="content-container">
        <el-row>
          <template v-for="item in jobs">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>
                  {{item.jobTitle}}
                  <span class="pubdate">{{item.publishDate | formatDate}}</span>
                </span>
              </div>
              <div class="box-content">
                <p class="box-desc">{{item | fromatDesc}}</p>
                <p>{{item | formatBody}}</p>
              </div>
              <div class="box-source">
                <template v-for="item2 in item.jobsArray">
                    <div class="detail">
                      <span class="job" @click="openUrl(item2.url)">{{item2.title}} </span>
                      <span class="company">{{item2.company}}</span>
                      <div class="meta">
                        <span class="salary">
                          <template v-if="item2.salaryLower > 0 && item2.salaryUpper == item2.salaryLower">
                            {{item2.salaryUpper}}k
                          </template>
                          <template v-else-if="item2.salaryLower > 0 && item2.salaryUpper > 0">
                            {{item2.salaryLower}}-{{item2.salaryUpper}}k
                          </template>
                          <template v-else-if="item2.salaryUpper <= 0 && item2.salaryLower > 0">
                            {{item2.salaryLower}}k+
                          </template>
                          <template v-else>
                            面议
                          </template>
                        </span>
                        <span class="experience">
                           <template v-if="item2.experienceLower > 0 && item2.experienceUpper == item2.experienceLower">
                           {{item2.experienceUpper}} 年
                          </template>
                          <template v-else-if="item2.experienceLower > 0 && item2.experienceUpper > 0">
                          {{item2.experienceLower}}-{{item2.experienceUpper}} 年
                          </template>
                          <template v-else-if="item2.experienceUpper <= 0 && item2.experienceLower > 0">
                          {{item2.experienceLower}} 年+
                          </template>
                          <template v-else>
                            不限
                          </template>
                        </span>
                        <span class="location">{{item2.city}}</span>
                        <span class="origin">{{item2.siteName}}</span></div>
                    </div>
                </template>
              </div>
              <div class="chart">
                <chart-item :item="item"></chart-item>
              </div>
            </el-card>
          </template>
        </el-row>
        <el-row>
          <el-button-group>
            <el-button @click="nextPage">加载更多</el-button>
          </el-button-group>
        </el-row>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import moment from 'moment'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChartItem from './components/ChartItem'
import { shell } from 'electron'
import _ from 'lodash'

import ReadhubClient from './clients/readhub'

export default {
  components: {
    Sidebar,
    Header,
    ChartItem
  },
  data () {
    return {
      client: new ReadhubClient(),
      sysName: 'Readhub',
      jobs: [],
      total: 0,
      pageNum: 1,
      params: {
        pageSize: 10,
        lastCursor: null
      }
    }
  },
  methods: {
    openUrl (url) {
      shell.openExternal(url)
    },
    nextPage () {
      const len = this.jobs.length - 1
      if (len <= 0) return
      this.params.lastCursor = moment(this.jobs[len].publishDate).unix() * 1000

      this.client.jobs(this.params).then((res) => {
        this.jobs = this.jobs.concat(res.data.data)
      })
    }
  },
  filters: {
    fromatDesc (item) {
      let jobs = []

      _.each(item.jobsArray, function (o) {
        jobs.push(o.title)
      })
      return jobs.join(' · ')
    },
    formatDate (date) {
      return moment(date).fromNow()
    },
    formatBody (item) {
      let str = ''
      str = str + _.keys(item.cities).join('、') + `等地共更新了${item.jobCount}职位，`
      str = str + `待遇集中在${item.salaryLower}-${item.salaryUpper}k，一般要求${item.experienceLower}-${item.experienceUpper}年经验`
      return str
    }
  },
  mounted () {
    this.client.jobs(this.params).then((res) => {
      this.jobs = res.data.data
    })
  }
}
</script>

<style scoped lang="scss">
.box-card {
  .box-source {
    .detail {
      padding-top: 8px;
      .job {
        cursor: pointer;
      }
      .source {
        color: #737373;
      }
      .meta {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: rgba(0,0,0,.5);
        position: relative;
        padding-top: 6px;
        .origin {
          color: rgba(0,0,0,.5);
          position: absolute;
          right: 0;
        }
        .salary {
          color: #d65949;
          font-size: 15px;
        }
        .experience {
          margin-left: 20px;
        }
        .location {
          margin-left: 20px;
        }
      }
    }
    font-size: 12px;
  }
}
</style>
