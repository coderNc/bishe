<template>
  <div>
    <el-container class="navbar">
      <el-header style="text-align: right; font-size: 14px">
        <!-- <h3 v-show="isShowuser">Welcome ! &nbsp;&nbsp;&nbsp;{{this.userData.user.user_name}}</h3> -->
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo menu"
          mode="horizontal"
          background-color="#E60012"
          text-color="#fff"
          active-text-color="#fff">
          <el-menu-item index="1" @click="goHome">首页</el-menu-item>
          <el-menu-item index="2" @click="goAct">活动</el-menu-item>
          <el-menu-item index="3" @click="goLogin" v-show="isLogin">登录</el-menu-item>
          <el-submenu index="3" v-show="isShowOrg">
            <template slot="title" >组织</template>
            <el-menu-item index="3-1" @click="goAddAct">创建活动</el-menu-item>
            <el-menu-item index="3-2" >我的活动</el-menu-item>
            <el-menu-item index="3-3" @click="unLoginOrg">退出登录</el-menu-item>
          </el-submenu>
          <el-submenu index="4" v-show="isShowVol">
            <template slot="title">个人</template>
            <el-menu-item index="4-1" >我的信息</el-menu-item>
            <el-menu-item index="4-2">我的活动</el-menu-item>
            <el-menu-item index="4-3" @click="unLoginVol">退出登录</el-menu-item>
            <el-menu-item index="4-4" v-show="isShowgoback" @click="goBack">后台管理</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {},
  components: {},
  data () {
    return {
    isLogin:true,
    isShowVol:false,
    isShowgoback:false,
    isShowOrg:false,
    activeIndex2: '1',
    volData:{},
    orgData:{}
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    //获取当前路径
    //console.log(this.$router.currentRoute.fullPath);
    //请求个人信息
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.volData = res.data.data.user_info
          this.isShowVol = true
          this.isLogin = false
          if(res.data.data.user_info.user_type == 1){
            this.isShowgoback = true
          }
        }
      }).catch(err =>{
        console.log(err);
      })
    
      this.axios({
        method:'POST',
        url:'/org/login-org',
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.orgData = res.data.data.org
          this.isShowOrg = true
          this.isLogin = false
        }
      }).catch(err => {
        console.log(err);
      })   
  },
  mounted () {

  },
  methods: {
    goHome(){
      this.$router.push('/index')
    },
    goBack(){
      this.$router.push('/admin')
    },
    goAddAct(){
    this.$router.push('/found')
  },
  goLogin(){
    this.$router.push('/login')
  },
  goAct(){
    this.$router.push('/activity')
  },
    unLoginVol(){
      this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //调用志愿者退出登录
            this.axios({
              method:'POST',
              url:'/user/un-login',
              data:JSON.stringify({
                id:this.volData.id
              })
            }).then(res => {
                console.log(res);
                if(res.status == 200 && res.data.data.res_status.code == 10000){
                this.$notify({
                          title: '成功',
                          message: '退出成功！',
                          type: 'success'
                        });
                        if(this.$router.currentRoute.fullPath == '/index'){
                          location.reload()
                        }else{
                            this.$router.push('/index')
                        }
                    
                }
            })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消退出登录'
            });
        });
    },
    unLoginOrg(){
      this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //调用志愿者退出登录
            this.axios({
              method:'POST',
              url:'/org/un-login',
              data:JSON.stringify({
                id:this.orgData.id
              })
            }).then(res => {
                //console.log(res);
                if(res.status == 200 && res.data.data.res_status.code == 10000){
                this.$notify({
                          title: '成功',
                          message: '退出成功！',
                          type: 'success'
                        });
                if(this.$router.currentRoute.fullPath == '/index'){
                  location.reload()
                }else{this.$router.push('/index')}
                }
            })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消退出登录'
            });
        });
    },
  }
}
</script>

<style scoped>
.navbar{
  position: relative;
  background-color: #E60012;
}
.menu{
  width: 500px;
  float: right;
}
h3{
  float: left;
  margin-left: 100px;
  color: #ffd04b;
}
</style>
