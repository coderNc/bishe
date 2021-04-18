<template>
  <div>
    <header-test ref="header"></header-test>
    <div class="yetou">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>登录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="loginWrapper">
      <div class="img">
        <img src="../../assets/img/login.png" alt="" />
      </div>
      <div class="info">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch type="border-card">
          <el-tab-pane label="志愿者登录" name="first">
            <el-divider></el-divider>
            <el-form ref="form" :model="volunteerForm" :rules="rules" label-width="80px" class="formWrapper">

              <el-form-item label="用户名" prop="username">
                <el-input v-model="volunteerForm.username" placeholder="请输入志愿者用户名"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="volunteerForm.password"  placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" @click="Login('form')">登录</el-button>
                
              </el-form-item>
              <el-form-item>
                <el-link @click="openEnrol">还没有账号？立即注册<i class="el-icon-view el-icon--right"></i> </el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="组织机构登录" name="second">
            <el-divider></el-divider>
            <el-form ref="form" :model="volunteerForm" :rules="rules" label-width="80px" class="formWrapper">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="volunteerForm.username" placeholder="请输入组织管理员用户名"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="volunteerForm.password"  placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" @click="Login('form')">登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-link @click="openEnrol">还没有账号？立即注册<i class="el-icon-view el-icon--right"></i> </el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane
          >
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTest from "../../components/content/HeaderTest.vue";
export default {
  name: "",
  mixins: [],
  props: {},
  components: { HeaderTest },
  data() {
    return {
      activeName: "first",
      volunteerForm: {
        username: "",
        password: "",
      },
      organizationForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {min: 1,max: 15,message: "长度在 1 到 15 个字符",trigger: "blur",},
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {min: 6,max: 15,message: "长度在 1 到 15 个字符",trigger: "blur",},
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.$refs.header.activeIndex = "4";
  },
  methods: {},
};
</script>

<style>
.loginWrapper {
  width: 1240px;
  height: 450px;
  margin: 20px auto;
  /* background-color: #bfa; */
  position: relative;
}
.el-tabs__item{
  font-size: 18px;
}
.el-tabs__content{
  padding: 0 15px;
}
.info {
  width: 455px;
  height: 450px;
  position: absolute;
  right: 0;
  top: 0;
}
.yetou{
  width: 1240px;
  height: 50px;
  margin: 20px auto;
}
.el-breadcrumb__item{
  font-size: 18px;
  
}
.el-tabs__header{
  height: 65px;
}
#tab-first{
  height: 65px;
  line-height: 65px;
}
#tab-second{
  height: 65px;
  line-height: 65px;
}
</style>
