import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
import Electron from 'vue-electron'
import 'normalize.css/normalize.css'
import 'loaders.css/loaders.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '../App'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Electron)

const router = new VueRouter({
  routes
})

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
