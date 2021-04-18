<template>
  <div class="hotsCard">
    <el-card class="box-card">
      <div slot="header" class="clearfix heder">
        <span>热门志愿项目 <i class="iconfont icon-hot"></i></span>
      </div>
      <div class="text item">
          <el-link
            :underline="false"
            class="ellink"
            v-for="(item, index) in actsData"
            :key="index"
            :href="'/#/detail/' + item.id" 
            ><i>{{ index + 1 }} </i>
            {{ item.title }}
            <span class="update">{{timestampToTime(item.create_time * 1000)}}</span>
            </el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {timestampToTime} from '@/assets/js/tools.js'
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      actsData:[]
    };
  },
  watch: {},
  computed: {},
  created() {
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
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.actsData = res.data.data.activity
        }
      }) 
  },
  mounted() {},
  methods: {
    timestampToTime
  },
};
</script>

<style scoped>
.hotsCard {
  margin-top: 50px;
}
.heder span {
  display: block;
  margin: 0 35%;
  font-size: 20px;
  font-family: "Hiragino Sans GB";
}
.heder span i {
  color: #e60012;
}
.update {
  float: right;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 14px;
}

.ellink {
  display: block;
  margin: 10px;
  padding: 12px 0;
  font-size: 16px;
  font-family: "Hiragino Sans GB";
  box-sizing: border-box;
  border-top: 1px #e0e2e2 solid;
}
.ellink:nth-child(1) {
  border: none;
}
.ellink i {
  margin-right: 5px;
  color: #e60012;
  font-weight: 600;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
