<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix heder">
        <span>志愿新闻 <i class="el-icon-news"></i></span>
      </div>
      <div  class="text item">
        <el-link :underline="false" class="ellink" 
        v-for="(item,index) in news" :key="index">
        <i>{{index +1}}</i>
        {{item.title}} 
        <span class="update">{{item.update}}</span>
        </el-link>
        
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      news:[
        {title:'XUPT志愿者测试网站上线啦！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6"},
        {title:'XUPT测试1！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6"},
        {title:'XUPT测试2！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6"},
        {title:'XUPT测试3！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6"},
        {title:'XUPT测试4！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6"},
        ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.heder span{
  display: block;
  margin: 0 35%;
  font-size: 20px;
  font-family: "Hiragino Sans GB";
}
.heder span i{
  color: #409eff;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 14px;
  }
  .update{
    
    float: right;
  }
    .ellink{
    display: block;
    margin: 10px;
    padding: 12px 0;
    font-size: 16px;
    font-family: "Hiragino Sans GB";
    box-sizing: border-box;
    border-top: 1px #e0e2e2 solid;
  }
  .ellink:nth-child(1){
    border: none;
  }
    .ellink i{
        margin-right: 5px;
    color: #409eff;
    font-weight: 600;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
