<template>
	<el-row class="container">
    <Header></Header>
		<el-col :span="24" class="main">
      <aside>
        <sidebar selected="topic"></sidebar>
      </aside>
			<section class="content-container">
        <el-row>
          <template v-for="item in topics">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>
                  {{item.title}}
                  <span class="pubdate">{{item.publishDate | formatDate}}</span>
                </span>
              </div>
              <div class="box-content">
                <p>{{item.summary}}</p>
              </div>
              <div class="box-source">
              <template v-for="item2 in item.newsArray">
                  <li>
                    <span class="title" @click="openUrl(item2.url)">{{item2.title}}</span>
                    <span class="source" @click="openUrl(item2.url)">{{item2.siteName}}</span>
                  </li>
              </template>
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

import ReadhubClient from './clients/readhub'
import { shell } from 'electron'

export default {
  components: {
    Sidebar,
    Header
  },
  data () {
    return {
      client: new ReadhubClient(),
      sysName: 'Readhub',
      topics: [],
      total: 0,
      pageNum: 1,
      params: {
        pageSize: 10,
        lastCursor: null
      }
    }
  },
  methods: {
    nextPage () {
      const len = this.topics.length - 1
      if (len <= 0) return
      this.params.lastCursor = this.topics[len].order

      this.client.topics(this.params).then((res) => {
        this.topics = this.topics.concat(res.data.data)
      })
    },
    openUrl (url) {
      shell.openExternal(url)
    }
  },
  filters: {
    formatDate (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.client.topics(this.params).then((res) => {
      this.topics = res.data.data
    })
  }
}
</script>

<style scoped lang="scss">
.box-card {
  .box-source {
    li {
      padding-bottom: 12px;
      .source {
        color: #737373;
      }
    }
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
