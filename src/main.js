import Vue from 'vue'
import App from './App'
import router from './router'
//import VUeAMap from 'vue-amap'

import 'normalize.css'



//引入axios模块
import axios from 'axios'
import VueAxiox from 'vue-axios'

//引入elementui模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


//挂载axios到vue实例上
Vue.prototype.axios = axios

Vue.config.productionTip = false


//注册模块
Vue.use(ElementUI);
Vue.use(axios,VueAxiox);
/* Vue.use(VUeAMap)
VueAMap.initAMapApiLoader({
  key: '7ce07ff1ac3e904e41228edbf753515e',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
}); */

//设置axios的基本配置
axios.defaults.baseURL = 'http://120.77.175.7:8081'
//axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
