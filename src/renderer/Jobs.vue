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
              <div>
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
import RChart from './components/RChart'
import { shell } from 'electron'
import _ from 'lodash'

import ReadhubClient from './clients/readhub'

export default {
  components: {
    Sidebar,
    Header,
    RChart
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
      .box-desc {
        color: #909399;
      }
      p {
        font-size: 14px;
      }
    }
    margin-bottom: 16px;
  }
}
</style>
