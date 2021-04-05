import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const Index = () => import('@/views/Index/Index.vue')








export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index
    }
    
  ]
})
