import axios from 'axios'

export default class ReadhubClient {
  constructor () {
    this.prefix = 'https://api.readhub.me'
  }
  topics (params) {
    const url = `${this.prefix}/topic`
    return axios.get(url, { params })
  }
  news (params) {
    const url = `${this.prefix}/news`
    return axios.get(url, { params })
  }
  technews (params) {
    const url = `${this.prefix}/technews`
    return axios.get(url, { params })
  }
  blockchain (params) {
    const url = `${this.prefix}/blockchain`
    return axios.get(url, { params })
  }
  jobs (params) {
    const url = `${this.prefix}/jobs`
    return axios.get(url, { params })
  }
  chart (jobId) {
    const url = `${this.prefix}/jobs/${jobId}/chart`
    return axios.get(url, { })
  }
}
