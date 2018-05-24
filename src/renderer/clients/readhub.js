import axios from 'axios'

export default class ReadhubClient {
  constructor () {
    this.prefix = 'https://api.readhub.me'
  }
  topics (params) {
    const url = `${this.prefix}/topic`
    return axios.get(url, { params })
  }
}
