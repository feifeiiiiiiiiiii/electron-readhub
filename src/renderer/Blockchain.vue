<template>
	<el-row class="container">
    <Header></Header>
		<el-col :span="24" class="main">
      <aside>
        <sidebar selected="blockchain"></sidebar>
      </aside>
			<section class="content-container">
        <el-row>
          <template v-for="item in news">
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
                <p @click=openUrl(item.url)>{{item.siteName}}
                  <template v-if="item.authorName">
                    &nbsp;/&nbsp;
                    {{item.authorName}}
                  </template>
                </p>
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
import { shell } from 'electron'

import ReadhubClient from './clients/readhub'

export default {
  components: {
    Sidebar,
    Header
  },
  data () {
    return {
      client: new ReadhubClient(),
      sysName: 'Readhub',
      news: [],
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
      const len = this.news.length - 1
      if (len <= 0) return
      this.params.lastCursor = moment(this.news[len].publishDate).unix() * 1000

      this.client.blockchain(this.params).then((res) => {
        this.news = this.news.concat(res.data.data)
      })
    }
  },
  filters: {
    formatDate (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.client.blockchain(this.params).then((res) => {
      this.news = res.data.data
    })
  }
}
</script>

<style scoped lang="scss">
</style>
