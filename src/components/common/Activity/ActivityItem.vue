<template>
  <div class="activityItemWrapper">
    <div class="img">
      <img src="@/assets/img/xm.png" alt="">
    </div>
    <div class="header">
      <router-link :to="'/detail/'+activityItem.id"> <h2 class="titleColor">{{activityItem.title}}</h2></router-link>
      <el-button v-if="!activityItem.already" type="success" round class="btn">招募中</el-button>
      <el-button v-else type="danger" round class="btn">招募已完成</el-button>
    </div>
    <div class="content">
      <p>项目组织：{{activityItem.org_name}}</p>
      <p>项目地址：{{activityItem.place.split(';')[0]}}</p>
      <p>项目日期：{{timestampToTime(activityItem.start_time)}} 至 {{timestampToTime(activityItem.end_time)}}</p>
      
      <p>报名人数：{{activityItem.fact_num}} | 目标人数：{{activityItem.target_num}}</p>
    </div>
    <div class="footer">
      <el-progress :percentage=percentage1(activityItem.fact_num,activityItem.target_num) class="progressBar"></el-progress>
    </div>
    <div class="lableWrapper" v-if="isShowLabel">
        <el-tag
          v-for="(item,index) in activityItem.tag.split(',')"
          :key="index"
          :type="items[index].type"
          effect="dark">
          {{ item }}
        </el-tag>
        
    </div>
  
  </div>
</template>

<script>
import {timestampToTime} from '../../../assets/js/tools'
export default {
  name: '',
  mixins: [],
  props: {
    activityItem:{
      type:Object,
      default(){
        return {}
      }
    },
    isShowLabel:{
      type:Boolean,
      default(){
        return false
      }
    },
    
  },
  components: {},
  data () {
    return {
      isAlready:true,     //检测该项目是否已经报名完成
      //isShowLabel:false,
      items: [
          { type: ' '},
          { type: 'success'},
          { type: 'danger' },
          { type: 'warning'}
        ],
      orgData:{}
    }
  },
  watch: {

  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    timestampToTime,
    percentage1(already,total){
      
      const result = (already / total).toFixed(2)
      return parseInt((result * 100).toFixed(0))
    },
  }
}
</script>

<style scoped>
p{
  font-family: '仿宋', Courier, monospace;
  font-weight: 600;
}
.activityItemWrapper{
  width: 100%;
  height: 200px;
  /* background-color: #ffa; */
  position: relative;
  margin-bottom: 50px;
  transition: all 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 2%;
  overflow: hidden;
}
.activityItemWrapper:hover{
  transform: translateY(-4px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.content{
  width: 510px;
  margin-left: 305px;
  padding: 2px 20px;
  border-bottom: 1px #e0e2e2 solid;

}
.content p{
  margin: 5px;
}
.img{
  float: left;
}
.header{
  width: 610px;
  margin-left: 210px;
  border-bottom: 1px #e0e2e2 solid;
  position: relative;
}
.header h2{
  display: inline-block;
  margin: 20px;
}
.header .btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.footer{
  width: 510px;
  margin-left: 305px;
  /* border-bottom: 1px #e0e2e2 solid; */
  padding: 3px 20px;
}
.progressBar{
  width: 480px;
}
.lableWrapper{
  width: 200px;
  position: absolute;
  right: 30px;
  top: 50px;
}
.lableWrapper span{
  margin: 5px;
}
.titleColor{
  color: #e60012;
}
</style>
