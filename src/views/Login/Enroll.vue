<template>
  <div>
    <!-- <header-test></header-test> -->
    <heder></heder>
    <div class="yetou">
      <span></span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{keyword}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider><i class="el-icon-edit-outline"></i></el-divider>
    <div class="enrollWrapper">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="志愿者注册">
          <enroll-vulunteer></enroll-vulunteer>
        </el-tab-pane>
        <el-tab-pane label="组织机构注册">
          <enroll-organization></enroll-organization>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import HeaderTest from '../../components/content/HeaderTest.vue'
import Heder from '../../components/content/Heder.vue'
import EnrollOrganization from './EnrollOrganization.vue'
import EnrollVulunteer from './EnrollVulunteer.vue'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {
    HeaderTest, 
    EnrollVulunteer,
    EnrollOrganization,
    Heder
  },
    data () {
      return {
        keyword:"志愿者注册"
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
      handleClick(tab, event) {
        //console.log(tab, event);
          this.keyword = tab.label
      }
  }
}
</script>

<style >
.enrollWrapper{
  width: 1240px;
  margin: 20px auto;
}
.el-tabs__item{
  font-size: 20px;
}
#tab-0{
  height: 66px;
  line-height: 66px;
}
#tab-1{
  height: 66px;
  line-height: 66px;
}
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
</style>
