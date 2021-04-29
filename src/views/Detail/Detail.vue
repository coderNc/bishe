<template>
  <div class="wrapper">
    <!-- <header-test></header-test> -->
    <heder></heder>
    <div class="proWrapper">
      <div class="proInfo">
        <div class="img">
          <img src="../../assets/img/xm.png" alt="">
        </div>
        <div class="headerInfo">
          <h2>{{actData.title}}</h2>
            <el-button v-if="isAlready" type="success" round class="btn">招募中</el-button>
            <el-button v-else type="danger" round class="btn">招募已完成</el-button>
            
            <p>项目编号：{{actData.id}}</p>
            <p>服务类别：
              <el-tag
                v-for="(item,index) in actData.tag.split(',')"
                :key="index"
                :type="items[index].type"
                size="mini"
                effect="dark">
                {{ item }}
              </el-tag>
            </p>
            <p>项目分享到：</p>
        </div>
        <el-divider></el-divider>
        <div class="actInfo">
          <div class="right">
          <p >发布日期：2021/4/4</p>
          <p >项目结束日期：{{timestampToTime(actData.end_time)}}</p>
          <p >报名人数：{{actData.fact_num}}</p>
          </div>
          <div class="left">
            <p >项目地点：{{actData.place}}</p>
            <p >项目开始日期：{{timestampToTime(actData.start_time)}}</p>
            <p >需求人数：{{actData.target_num}}</p>
          </div>

        </div>
        <div class="fenge">
          <el-divider></el-divider>
        </div>
        <div class="otherInfo">
          <el-tabs v-model="activeName"  stretch>
            <el-tab-pane label="项目详情" name="first">
              <h3>{{actData.desc}}</h3>
            </el-tab-pane>
            <el-tab-pane label="报名信息" name="second">
              <el-table :data="actUsersData" style="width: 100%" border stripe height="250">
                <el-table-column label="姓名" align="center">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="手机号" align="center">
                  <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>
                <el-table-column label="年龄" align="center">
                  <template slot-scope="scope">{{ scope.row.age }}</template>
                </el-table-column>
                <el-table-column label="性别" align="center">
                  <template slot-scope="scope">{{ scope.row.gender == 0? '男' : '女' }}</template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="项目动态" name="third">
              <div class="footer">
                <p>项目进度：</p>
                <el-progress :percentage=percentage1(actData.fact_num,actData.target_num) class="progressBar"></el-progress>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="userInfo">
        <h2 class="title">项目发起人</h2>
        <div class="org">
          <img :src='orgData.org_pic'>
          <h2 class="orgName">{{orgData.org_name}}</h2>
          <h3>地址：{{ orgData.org_province + orgData.org_town+orgData.org_country + orgData.org_address}}</h3>
        </div>
        <h2 class="title">项目联系人</h2>
        <h2 class="orgUsername">{{actData.representative}}</h2>
        <h3>{{actData.representative_phone}}</h3>
        <h2 class="title">项目地址</h2>
          <el-tooltip class="item" effect="dark" content="点击查看详细地址" placement="right">
          
          <el-link type="primary" :underline="false"  @click="dialogVisible = true"><h2 class="orgPlace">{{actData.place}}</h2></el-link>
        </el-tooltip>
        
        <el-button type="danger" round class="sub" icon="el-icon-edit" @click="joinAct" v-if="isJoin" v-show="!isActOk">报名此项目</el-button>
        <el-button type="danger" round class="sub" icon="el-icon-edit" disabled v-else v-show="!isActOk">已报名</el-button>
        <el-button type="danger" round class="sub" icon="el-icon-edit" disabled v-show="isActOk">活动已结束</el-button>
      </div>
    </div>


    <el-dialog title="详细地址" :visible.sync="dialogVisible" width="50%">
      <xmap width="920px" height="500px"  @location="location" :lnglat=point :isShow=false></xmap>
    </el-dialog>
  </div>
</template>

<script>
import HeaderTest from '../../components/content/HeaderTest.vue';
import {timestampToTime} from '../../assets/js/tools'
import Heder from '../../components/content/Heder.vue';
import Xmap from '../../components/common/other/Xmap'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {HeaderTest,Heder,Xmap},
  data () {
    return {
      isJoin:true,
      activeName: 'first',
      isAlready:true,
      isActOk:false,
        id:'',
        actData:{},
        orgData:{},
        actUsersData:[],
        user_info:{},
        items: [
          { type: ' '},
          { type: 'success'},
          { type: 'danger' },
          { type: 'warning'}
        ],
      dialogVisible: false,
      point:[],
      address:'',
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    
    this.id =  parseInt(this.$route.params.id )

    this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          var result = res.data.data.activity_info.find(ele => ele.activity_id === this.id &&ele.status == 0)

          //console.log(result);
          if(result !== undefined){
            //console.log('ok');
            this.isJoin = false
          }else{
            //console.log('no');
          }
        }
      })







      this.axios({
        method:'POST',
        url:'/activity/user',
        data:JSON.stringify({
          id:this.id
        })
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.actUsersData = res.data.data.user
          this.actData = res.data.data.activity

          if(res.data.data.activity.fact_num == res.data.data.activity.target_num){
            this.isAlready = false
            this.isActOk = true
          }

          //根据id获取组织信息 
          this.axios({
            method:'POST',
            url:'/org',
            data:JSON.stringify({
              id:res.data.data.activity.org_id
            })
          }).then(res => {
            console.log(res);
            if(res.status == 200 && res.data.data.res_status.code == 10000){
              this.orgData = res.data.data.org
            }
          })

                    //将地址拆分为地址和经纬度
                    let arr = res.data.data.activity.place.split(';')
          this.actData.place = arr[0]
          this.point = arr[1].split(',')
        }
      }).catch(err => {
        console.log(err);
      }) 
      console.log();
    
  },
  mounted () {
    console.log(this.id);
  },
  methods: {
    timestampToTime,
        percentage1(already,total){
      const result = (already / total).toFixed(2)
      return (result * 100).toFixed(0)

    },
    //志愿者报名
    joinAct(){
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
            this.$confirm('确定报名此活动吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isAlready){
                this.user_info = res.data.data.user_info
                //调用志愿者报名活动接口
                this.axios({
                  method:'POST',
                  url:'/user/activity',
                  data:JSON.stringify({
                    user_id:this.user_info.id,
                    activity_id:this.actData.id
                  })
                }).then(res => {
                  console.log(res);
                  if(res.status == 200 && res.data.data.res_status.code == 10000){
                    this.$message({
                      type: 'success',
                      message: '报名成功!'
                    });
                    this.isJoin = false
                    location.reload()
                  }
                })   
              }else{
                this.$notify({
                  title: '警告',
                  message: '此活动招募已结束！请查看其他活动！',
                  type: 'warning'
                });                
              }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消报名'
              });          
            });
      
        }else if(res.data.data.res_status.code == 20004){
          this.$confirm('您未登录，请登录后来操作，是否前去登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          })
        }
      })
    }
  }
}
</script>

<style>
.org img{
  float: left;
  width: 100px;
}
.orgPlace{
  color: #67C23A;
  width: 180px;
  margin-right: 0;
}
.orgUsername{
  color: #e60012;
}
.orgName{
  color: #409EFF;
}
.footer{
  width: 95%;
  /* border-bottom: 1px #e0e2e2 solid; */
  padding: 3px 20px;
}
.progressBar{
  
}
h2,h3{
  margin-left: 20px;
}
.wrapper{
  background: url("../../assets/img/bg.png");
  background-repeat: no-repeat;
  height: 800px;

}
.userInfo{
  width: 450px;
  height: 600px;
  /* background-color: #bfa; */
  position: absolute;
  right: 0;
}
.el-tabs__header{
  background-color: rgb(255,240,241);
}
.el-tabs__item.is-active{
  color: #CC0000;
}
.el-tabs__active-bar{
  background-color:#CC0000;
}
.otherInfo{
  width: 100%;
  height: 200px;

  border: 1px solid #F0F0F0;
  position: absolute;
  top: 400px;
}
.proWrapper{
  width: 1240px;
  /* height: 500px; */
  /* background-color: #bfa; */
  margin: 20px auto;
  position: relative;
}
.proInfo{
  width: 740px;
  height: 100%;
  /* background-color: #ff0; */
  position: relative;
}
.img{
  float: left;
}
.headerInfo{
  width: 435px;
  float: right;
  position: relative;
}
.headerInfo h2{
  width: 300px;
  margin:20px 10px 40px  20px;

}
.headerInfo .btn{
  position: absolute;
  right: 10px;
  top: 20px;
}
.sub{
  margin: 60px 140px;
}
.headerInfo p {
  margin-left: 20px;
}
.el-divider{
  position: absolute;
  top: 205px;
}
.actInfo{
  width: 100%;
  height: 120px;
  position: absolute;
  top: 250px;
  /* display: flex; */
}
.left{
  width: 50%;
  margin: 0 20px ;
  height: 120px;
}
.right{
  width: 50%;
  float: right;
  height: 120px;
}
.fenge .el-divider{
  position: absolute;
  top: 360px;
}
.title{
    font-size: 20px;
    width: 450px;
    color: #333;
    font-weight: bold;
    line-height: 60px;
    border-bottom: 1px solid #F0F0F0;
    position: relative;
    padding-left: 16px;
    margin: 0;
}
.title::before{
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #e60012;
    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -10px;
}
</style>
