<template>
  <div>
    <!-- <header-test></header-test> -->
    <heder></heder>
    <div class="yetou">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>信息</el-breadcrumb-item>
        <el-breadcrumb-item>创建活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider><i class="el-icon-edit-outline"></i></el-divider>
    <div class="wrapper">
        <div class="accountNumberInfo">
          <h2 class="title">活动基本信息</h2>
          <el-form :model="actForm" status-icon label-width="130px" class="demo-ruleForm " >
            <el-form-item label="活动主题/名称" hide-required-asterisk="true"> 
              <el-input v-model="actForm.title"></el-input>
            </el-form-item>
            <el-form-item label="活动持续日期"  hide-required-asterisk="true">
              <div class="block">
                <el-date-picker
                v-model="value"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  @change='getTimestamp'>
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="活动地点" hide-required-asterisk="true"> 
              <!-- <el-input v-model="actForm.place"></el-input> -->
              <el-button  @click="dialogVisible = true"> 选择地址</el-button>
              <p>{{this.address}}</p>
            </el-form-item>
            <el-form-item label="活动类型"> 
              <el-popover
              
                placement="left"
                title="提醒"
                width="200"
                trigger="hover"
                content="活动类型请用英文版‘ , ’ 分割输入！ 比如：“卫生健康,环境保护">
                <el-input v-model="actForm.tag" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
            <el-form-item label="活动需求人数" hide-required-asterisk="true"> 
              <el-input v-model.number="actForm.target_num"></el-input>
            </el-form-item>
          
          </el-form>
          <h2 class="title">活动其他信息</h2>
            <el-form :model="actForm" status-icon label-width="130px" class="demo-ruleForm " >
            <el-form-item label="活动联系人" hide-required-asterisk="true"> 
              <el-input v-model="actForm.representative"></el-input>
            </el-form-item>
            <el-form-item label="活动联系人手机号" hide-required-asterisk="true"> 
              <el-input v-model="actForm.representative_phone"></el-input>
            </el-form-item>
            <el-form-item label=" 活动描述" >
              <el-input type="textarea" v-model="actForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-popover
                placement="right"
                width="160"
                v-model="visible">
                <p>确定创建此活动吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="addAct">确定</el-button>
                </div>
                <!-- <el-button slot="reference">删除</el-button> -->
                <el-button type="danger" round slot="reference">创建活动</el-button>
              </el-popover>
              
            </el-form-item>

          </el-form>

        </div>

    </div>


    <el-dialog title="选择地址" :visible.sync="dialogVisible" width="50%">
      <xmap width="920px" height="500px"  @location="location" :lnglat=test :isShow=true></xmap>
    </el-dialog>
  </div>
</template>

<script>
import HeaderTest from '../../components/content/HeaderTest.vue'
import {timestampToTime} from '../../assets/js/tools'
import Heder from '../../components/content/Heder.vue'
import Xmap from '../../components/common/other/Xmap'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {HeaderTest, Heder,Xmap},
  data () {
    return {
      dialogVisible: false,
      point:[],
      address:'',
      visible: false,
      value:'',
      orgData:{},
      actForm:{
        org_id:'',
        title:'',
        desc:'',
        representative:'',
        representative_phone:'',
        target_num:'',
        tag:'',
        place:'',
        start_time:'',
        end_time:''
      },
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
      this.axios({
        method:'POST',
        url:'/org/login-org',
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.orgData = res.data.data.org
          this.actForm.org_id = res.data.data.org.id
        }
      })

      var test = "陕西省西安市长安区韦曲街道安美公寓南区西安邮电大学长安校区(东区);108.9068,34.1547"
      var arr = test.split(';')
      var pointArr = arr[1].split(',')
      console.log(arr);
      console.log(pointArr);

      //console.log(parseFloat(pointArr[0]));
      pointArr[0] = parseFloat(pointArr[0]);
      pointArr[1] = parseFloat(pointArr[1]);
      console.log(pointArr);
  },
  mounted () {

  },
  methods: {
    //时间处理函数
    getTimestamp(arr){
      this.actForm.start_time = arr[0]
      this.actForm.end_time = arr[1]
      //console.log(arr);
    },
    addAct(){
      console.log('123');
      this.visible = false
        this.axios({
            method:'POST',
            url:'/activity',
            data:JSON.stringify(this.actForm)
          }).then(res => {
            console.log(res);
            if(res.status == 200 && res.data.data.res_status.code == 10000){
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              this.$router.push('/activity')
            }
          }).catch(err => {
        console.log(err);
      })

    },
    //地址处理函数
    location(point, address) {
      this.point = point
      
      //alert(`坐标：${point[0]},${point[1]} - 地址：${address}`)
        this.$confirm('选择的地址为：' + address , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '选择成功!'
          });
          this.address = address
          this.dialogVisible = false
          this.actForm.place = address + ';' + point[0] + ',' + point[1]
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '重新选择'
          });          
        });
  }
  }
}
</script>

<style scoped>
.yetou{
  width: 1240px;
  height: 50px;
  margin: 0 auto;

}
.el-breadcrumb{
  line-height: 50px;
  padding: 10px 0;
}
.el-breadcrumb__item{
  font-size: 18px;
  
}
.wrapper{
  background-image: url('../../assets/img/bg.png');
  background-repeat: no-repeat;
}
.accountNumberInfo{
  width: 600px;
  /* height: 600px; */
  margin: 20px auto;
  padding: 20px;
  /* background-color: #bfa; */
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