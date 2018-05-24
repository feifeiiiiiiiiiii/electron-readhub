<template>
	<el-row class="container">
    <Header></Header>
		<el-col :span="24" class="main">
      <aside>
        <sidebar></sidebar>
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
      console.log(this.params)

      this.client.topics(this.params).then((res) => {
        this.topics = this.topics.concat(res.data.data)
        console.log(this.topics)
      })
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
      font-size: 14px;
      color: #737373;
    }
    margin-bottom: 16px;
  }
}
</style>
