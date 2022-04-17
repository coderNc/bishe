<template>
  <div>
    <heder />
    <div class="yetou">
      <span></span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>登录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider><i class="el-icon-edit-outline"></i></el-divider>
    <div class="loginWrapper">
      <div class="img">
        <img src="../../assets/img/login.png" alt="" />
      </div>
      <div class="info">
        <el-tabs v-model="activeName" stretch type="border-card">
          <el-tab-pane label="志愿者登录" name="first">
            <!-- <el-divider></el-divider> -->
            <el-form
              ref="volform"
              status-icon
              :model="volunteerForm"
              :rules="rules"
              label-width="80px"
              class="formWrapper"
            >
              <el-form-item label="用户名" prop="user_name">
                <el-input
                  v-model="volunteerForm.user_name"
                  placeholder="请输入志愿者用户名"
                ></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="volunteerForm.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verificationCode">
                <el-input
                  v-model="volunteerForm.verificationCode"
                  autocomplete="off"
                ></el-input>
                <div @click="refreshCode" class="codeWrapper">
                  <identify-code
                    :identifyCode="identifyCode"
                    :contentWidth="150"
                    :contentHeight="40"
                    :fontSizeMin="40"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="volLogin('volform')"
                  >登录</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-link @click="openEnrol"
                  >注册账号<i class="el-icon-view el-icon--right"></i>
                </el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="组织机构登录" name="second">
            <el-divider></el-divider>
            <el-form
              ref="orgform"
              :model="orgForm"
              :rules="rules"
              label-width="80px"
              class="formWrapper"
            >
              <el-form-item label="用户名" prop="org_user_name">
                <el-input
                  v-model="orgForm.org_user_name"
                  placeholder="请输入组织管理员用户名"
                ></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="org_password">
                <el-input
                  type="password"
                  v-model="orgForm.org_password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="lastItem">
                <el-button type="primary" @click="orgLogin('orgform')"
                  >登录</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-link @click="openEnrol"
                  >注册账号<i class="el-icon-view el-icon--right"></i>
                </el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import IdentifyCode from "@/components/common/other/IdentifyCode.vue";
import HeaderTest from "../../components/content/HeaderTest.vue";
import Heder from "../../components/content/Heder.vue";
import { volLogin, orgLogin } from "@/services/login";
import { getUserInfo } from "@/services/user";
import { getOrgInfo } from "@/services/org";

export default {
  name: "",
  components: { HeaderTest, IdentifyCode, Heder },
  data() {
    var codeRules = (rule, value, callback) => {
      if (value === "") {
        //return "验证码不能为空";
        return callback(new Error("验证码不能为空"));
      } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        //return "验证码输入不正确";
        return callback(new Error("验证码输入不正确!"));
      } else {
        return callback();
      }
    };
    return {
      //生成验证码的字符范围
      identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
      //生成的验证码
      identifyCode: "",

      activeName: "first",
      volunteerForm: {
        user_name: "",
        password: "",
        verificationCode: ""
      },
      orgForm: {
        org_user_name: "",
        org_password: ""
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        org_user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        org_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: codeRules, trigger: "blur" }
        ]
      },
      isLoginVol: false,
      isLoginOrg: false
    };
  },
  watch: {},
  computed: {},
  created() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    getUserInfo().then(res => {
      //console.log(res);
      if (res.status == 200 && res.data.data.res_status.code == 10000) {
        this.isLoginVol = true;
      }
    });
    getOrgInfo().then(res => {
      if (res.status == 200 && res.data.data.res_status.code == 10000) {
        this.isLoginOrg = true;
      }
    });
  },
  mounted() {
    this.$refs.header.activeIndex = "4";
  },
  methods: {
    //生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成验证码，l为生成验证码的长度
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //随机字符串拼接
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    openEnrol() {
      this.$router.push("/enroll");
    },
    volLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果校验成功进入此
          //请求登录
          if (this.isLoginOrg) {
            this.$notify.error({
              title: "错误",
              message: "已经登录组织用户，请先退出组织在重新登录！"
            });
          } else {
            volLogin(
              this.volunteerForm.user_name,
              this.volunteerForm.password
            ).then(res => {
              if (res.data.res_status.code == 10000) {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                //跳转到对应的界面
                if (res.data.user.user_type == 1) {
                  this.$router.push("/admin/index");
                } else {
                  this.$router.push("/index");
                }
              } else if (res.data.res_status.code == 20001) {
                this.$message.error("账号或密码错误！");
              } else if (res.data.res_status.code == 20003) {
                this.$message.error("用户已登录，请勿重复登录！");
              }
            });
          }
        } else {
          this.$message.error("请输入正确格式的用户名或密码");
          return false;
        }
      });
    },
    orgLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果校验成功进入此
          //请求登录
          if (this.isLoginVol) {
            this.$notify.error({
              title: "错误",
              message: "已经登录志愿者用户，请先退出志愿者用户在重新登录！"
            });
          } else {
            orgLogin({
              org_user_name: this.orgForm.org_user_name,
              org_password: this.orgForm.org_password
            }).then(res => {
              // console.log(res);
              if (res.data.res_status.code == 10000) {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                this.$router.push("/index");
              } else if (res.data.res_status.code == 30002) {
                this.$message.error("账号或密码错误！");
              } else if (res.data.res_status.code == 30003) {
                this.$message.error("组织用户已登录，请勿重复登录！");
              }
            });
          }
        } else {
          this.$message.error("请输入正确格式的用户名或密码");
          return false;
        }
      });
    }
  }
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
.el-tabs__item {
  font-size: 18px;
}
.el-tabs__content {
  padding-bottom: 7px !important;
}
.info {
  width: 455px;
  height: 450px;
  position: absolute;
  right: 0;
  top: 0;
}
.yetou {
  width: 1240px;
  height: 50px;
  margin: 0 auto;
}
.el-breadcrumb__item {
  font-size: 18px;
}
.el-breadcrumb {
  line-height: 50px;
  padding: 10px 0;
}
.el-tabs__header {
  height: 65px;
}
#tab-first {
  height: 65px;
  line-height: 65px;
}
#tab-second {
  height: 65px;
  line-height: 65px;
}
.codeWrapper {
  width: 150px;
  height: 40px;
  border-radius: 4%;
  overflow: hidden;
  margin-top: 10px;
}
.lastItem {
  margin-top: 85px;
}
</style>
