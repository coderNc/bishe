<template>
  <div>
    <heder />
    <div class="yetou">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ keyword }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider><i class="el-icon-edit-outline"></i></el-divider>
    <div class="contentWrapper">
      <activity-container :isShowLabel1="true" />
    </div>
  </div>
</template>

<script>
import Heder from "../../components/content/Heder.vue";
import ActivityContainer from "../Index/ActivityContainer.vue";

export default {
  name: "",
  components: { ActivityContainer, Heder },
  data() {
    return {
      keyword: "所有项目"
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.contentWrapper {
  width: 1240px;
  /*  height: 400px; */
  margin: 50px auto;
  /* background-color: #bfa; */
}
.yetou {
  width: 1240px;
  height: 50px;
  margin: 0 auto;
}
.el-breadcrumb {
  line-height: 50px;
  padding: 10px 0;
}
.el-breadcrumb__item {
  font-size: 18px;
}
</style>
