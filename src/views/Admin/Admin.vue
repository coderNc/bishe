<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 14px">
          <el-button
            type="primary"
            icon="el-icon-s-fold"
            class="btn01"
            @click="toggleAside"
          ></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="去主页"
            placement="bottom"
          >
            <el-link class="goHome" @click="goHome">
              <i class="el-icon-s-home"></i> 主页
            </el-link>
          </el-tooltip>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ volData.user_name }}</p>
          </div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-circle-plus"
                @click.native="unloginVol"
                >个人退出登录</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-circle-plus-outline"
                @click.native="unloginOrg"
                >组织退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <div class="flec">
          <el-menu
            default-active="1"
            :default-openeds="['1', '2', '3', '4']"
            class="el-menu-vertical-demo menuWrapper"
            :collapse="isCollapse"
          >
            <el-menu-item index="1" @click="goAdmin">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="goUserList"
                  >个人用户</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="2-2" @click="goOrg">组织机构</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">活动管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="goAct">活动列表</el-menu-item>
                <!-- <el-menu-item index="3-2" @click="goaddAct"><i class="el-icon-edit-outline"></i> 创建项目</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <el-main class="mainContiner">
            <router-view></router-view>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo } from "@/services/user";
import { getOrgInfo } from "@/services/org";
import { volUnLogin, orgUnLogin } from "@/services/login";

export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      volData: {},
      orgData: {},
      dialogVisible: false,
      isCollapse: false
    };
  },
  watch: {},
  computed: {},
  created() {
    //获取志愿者登录信息
    getUserInfo().then(res => {
      //console.log(res);
      if (res.status == 200 && res.data.data.res_status.code == 10000) {
        this.volData = res.data.data.user_info;
      }
    });
    //获取组织登录信息
    getOrgInfo().then(res => {
      //console.log(res);
      if (res.status == 200 && res.data.data.res_status.code == 10000) {
        this.orgData = res.data.data.org;
      }
    });
  },
  mounted() {},
  methods: {
    //跳转
    goHome() {
      this.$router.push("/index");
    },
    goOrg() {
      this.$router.push("/admin/org");
    },
    goUserList() {
      this.$router.push("/admin/user");
    },
    goAct() {
      this.$router.push("/admin/act");
    },
    toggleAside() {
      this.isCollapse = !this.isCollapse;
    },
    goAdmin() {
      this.$router.push("/admin");
    },
    //退出登录
    unloginVol() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用志愿者退出登录
          volUnLogin(this.volData.id).then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.data.res_status.code == 10000) {
              this.$notify({
                title: "成功",
                message: "退出成功！",
                type: "success"
              });
              this.$router.push("/index");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录"
          });
        });
    },
    unloginOrg() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用志愿者退出登录
          orgUnLogin(this.orgData.id).then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.data.res_status.code == 10000) {
              this.$notify({
                title: "成功",
                message: "退出成功！",
                type: "success"
              });
              this.$router.push("/index");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}

.el-header img {
  width: 60px;
  height: 60px;
}
.btn01 {
  float: left;
  margin-top: 10px;
}
.goHome {
  text-decoration: none;
  margin-right: 20px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 10px;
  text-align: center;
  font-size: 14px;
}

.comename {
  font-size: 12px;
}

.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.mainContiner {
  /*  max-width: 1800px; */
  width: 1400px;
  /* margin-left: 60px; */
  flex: 1;
}
.flec {
  display: flex;
  justify-content: flex-start;
}
</style>
