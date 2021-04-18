import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const Index = () => import('@/views/Index/Index.vue')
const Activity = () => import('@/views/Activity/Activity.vue')
const Detail = () => import('../views/Detail/Detail.vue')
const FoundPro = () => import("@/views/User/FoundPro.vue")
const Login = () => import('@/views/Login/Login.vue')
const Enroll = () => import('@/views/Login/Enroll.vue')
const test = () => import('@/components/common/other/test.vue')
const Interface = () => import('@/components/common/other/Interface.vue')


const Admin = () => import('@/views/Admin/Admin.vue')
const AdminIndex = () => import('@/views/Admin/AdminIndex.vue')
const AdminUser = () => import('@/views/Admin/AdminUser.vue')
const AdminOrg = () => import('@/views/Admin/AdminOrg.vue')
const AdminAct = () => import('@/views/Admin/AdminAct.vue')




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
    },
    {
      path:'/activity',
      name:'index',
      component:Activity
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail
    },
    {
      path:'/found',
      name:'found',
      component:FoundPro
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/test',
      name:'test',
      component:test
    },
    {
      path:'/interface',
      name:'interface',
      component:Interface
    },
    {
      path:'/enroll',
      name:'enroll',
      component:Enroll
    },
    {
      path:'/admin',
      name:'admin',
      redirect:'/admin/index',
      component:Admin,
      children:[
        {
          path:'index',
          component:AdminIndex
        },
        {
          path:'user',
          component:AdminUser
        },
        {
          path:'org',
          component:AdminOrg
        },
        {
          path:'act',
          component:AdminAct
        },
      ]
    },

    
    
  ]
})
