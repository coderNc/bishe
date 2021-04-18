<template>
  <div>
    <heder></heder>
    <h1>接口测试页面</h1>
    <!-- <el-button type="primary" @click="log">打印数据</el-button> -->
    <el-divider></el-divider>



    

    <el-divider></el-divider>
    <el-button type="primary" @click="volLogin">志愿者登录按钮</el-button>
    <el-button type="primary" @click="loginVol">获取志愿者登录信息</el-button>
    <el-button type="primary" @click="unloginVol">志愿者退出登录</el-button>
    <el-button type="primary" @click="addVol">志愿者注册</el-button>
    <el-button type="primary" @click="getVols">获取志愿者列表</el-button>
    <el-button type="primary" @click="delVol">删除志愿者</el-button>

    <el-button type="primary" @click="volActivity">志愿者报名参加活动</el-button>
    <el-button type="primary" @click="volrUnactivity">志愿者取消活动报名</el-button>

    <el-divider></el-divider>
    <el-button type="primary" @click="orglogin">机构登录</el-button>
    <el-button type="primary" @click="loginOrg">获取机构登录信息</el-button>
    <el-button type="primary" @click="unloginOrg">机构退出登录</el-button>
    <el-button type="primary" @click="addOrg">机构组织注册</el-button>
    <el-button type="primary" @click="getOrgs">获取组织列表</el-button>
    <el-button type="primary" @click="getOrg">根据id获取组织信息?</el-button>
    <el-button type="primary" @click="delOrg">删除机构组织</el-button>
    <el-button type="primary" @click="addAct">机构发布活动</el-button>
    <el-button type="primary" @click="getOrgAct">根据机构id获取已发布全部活动</el-button>

    <el-divider></el-divider>
    <el-button type="primary" @click="getActs">获取所有可报名活动</el-button>
    <el-button type="primary" @click="getAct">根据id获取活动详细信息及用户报名信息</el-button>

  </div>
</template>

<script>
import {getTime} from '../../../assets/js/tools'
import Heder from '../../content/Heder.vue'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {Heder},
  data () {
    return {
      volForm:{
        user_name:'admin',
        password:'12345678',
        name:'牛超',
        phone:'13279121111',
        user_type:1,
        gender:0,
        age:22
      },
      orgForm:{
        org_name:'法国几号放寒假',
        org_pic:'',
        org_user_name:'cccc',
        org_password:'12345678',
        org_representative:'牛超',
        org_phone:'13279124396',
        org_province:'陕西省',
        org_town:'西安市',
        org_country:'长安区',
        org_address:'西安邮电大学',
        org_desc:'测试测试啊 啊啊啊啊啊啊啊'
      },
      actForm:{
          org_id:13,
          title:'期末考试',
          desc:'西安邮电大学期末考试',
          representative:'牛超',
          representative_phone:'13279124396',
          target_num:10,
          tag:'大型考试;学校活动',
          place:'西安邮电大学',
          end_time:'',
          start_time:''
      }
    }
  },
  created () {
    this.actForm.end_time = getTime('2021/9/10')
    //var date = new Date('2021/9/10')
    //console.log(date.getTime());
  },
  methods: {
    //志愿者登录      ok
    volLogin(){
      this.axios({
        method:'POST',
        url:'/user/login',
        data:JSON.stringify({
          user_name:'admin',
          password:'12345678'
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取志愿者登录信息    ok
    loginVol(){
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //志愿者退出登录        ok
    unloginVol(){
      this.axios({
        method:'POST',
        url:'/user/un-login',
        data:JSON.stringify({
            id:13
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //志愿注册  ok
    addVol(){
      this.axios({
        method:'POST',
        url:'/user/register',
        data:JSON.stringify(this.volForm)
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取志愿者列表     ok
    getVols(){
      this.axios({
        method:'POST',
        url:'/users',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          cur_page:0
        })
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
      })
    },
    //删除志愿者          ok
    delVol(){
      this.axios({
        method:'POST',
        url:'/user/delete',
        data:JSON.stringify({
          id:8
        })
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
      })      
    },
    //机构登录      ok
    orglogin(){
      this.axios({
        method:'POST',
        url:'/org/login',
        data:JSON.stringify({
          org_user_name:'xupt',
          org_password:'12345678'
        })
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
      })  
    },
    //组织机构注册        ok
    addOrg(){
      this.axios({
        method:'POST',
        url:'/org/register',
        data:JSON.stringify(this.orgForm)
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取组织登录信息        ok
    loginOrg(){
      this.axios({
        method:'POST',
        url:'/org/login-org',
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })     
    },
    //机构退出登录     ok
    unloginOrg(){
      this.axios({
        method:'POST',
        url:'/org/un-login',
        data:JSON.stringify({
          id:8
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })       
    },
    //获取组织列表         ok
    getOrgs(){
      this.axios({
        method:'POST',
        url:'/orgs',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          cur_page:0
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })        
    },
    //根据id获取组织信息      ok
    getOrg(){
      this.axios({
        method:'POST',
        url:'/org',
        data:JSON.stringify({
          id:13
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })         
    },
    //删除组织       ok
    delOrg(){
      this.axios({
        method:'POST',
        url:'/org/delete',
        data:JSON.stringify({
          id:11
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })        
    },
    //机构发布活动     ok
    addAct(){
      this.axios({
        method:'POST',
        url:'/activity',
        data:JSON.stringify(this.actForm)
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })  
    },
    //根据机构id获取已发布全部活动      ok
    getOrgAct(){
      this.axios({
        method:'POST',
        url:'/org/activity',
        data:JSON.stringify({
          id:10
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      }) 
    },




    //获取所有活动     ok
    getActs(){
      this.axios({
        method:'POST',
        url:'/activities',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          cur_page:0
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })       
    },
    //根据id获取活动详细信息及用户报名信息    ok
    getAct(){
      this.axios({
        method:'POST',
        url:'/activity/user',
        data:JSON.stringify({
          id:8
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      }) 
    },
    //志愿者报名活动    ok
    volActivity(){
      this.axios({
        method:'POST',
        url:'/user/activity',
        data:JSON.stringify({
          user_id:13,
          activity_id:10
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })          
    },
    //志愿者取消报名活动    ok
    volrUnactivity(){
      this.axios({
        method:'POST',
        url:'/user/un-activity',
        data:JSON.stringify({
          user_id:9,
          activity_id:8
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })        
    }
  }
}
</script>

<style scoped>

</style>
