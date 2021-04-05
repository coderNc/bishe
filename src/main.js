import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'



//引入axios模块
import axios from 'axios'
import VueAxiox from 'vue-axios'

//引入elementui模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';




Vue.config.productionTip = false


//注册模块
Vue.use(ElementUI);
Vue.use(axios,VueAxiox);





new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
