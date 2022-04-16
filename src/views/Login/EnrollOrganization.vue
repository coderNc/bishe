<template>
  <div class="enrollOrganizationWrapper">
    <h2 class="header">账号信息</h2>
    <div class="accountNumberInfo">
      <el-form
        :model="orgForm"
        status-icon
        :rules="rules"
        ref="orgForm"
        label-width="140px"
        class="demo-ruleForm "
      >
        <el-form-item
          label="组织管理员账号"
          prop="org_user_name"
          hide-required-asterisk="true"
        >
          <el-input v-model="orgForm.org_user_name"></el-input>
        </el-form-item>
        <el-form-item
          label="组织管理员密码"
          prop="org_password"
          hide-required-asterisk="true"
        >
          <el-input
            type="password"
            v-model="orgForm.org_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="header">组织信息</h2>
    <div class="userInfo">
      <el-form
        :model="orgForm"
        status-icon
        :rules="rules"
        ref="orgForm"
        label-width="140px"
        class="demo-ruleForm "
      >
        <el-form-item
          label="组织机构名称"
          prop="org_name"
          hide-required-asterisk="true"
        >
          <el-input v-model="orgForm.org_name"></el-input>
        </el-form-item>
        <el-form-item
          label="组织联系人"
          prop="org_representative"
          hide-required-asterisk="true"
        >
          <el-input v-model="orgForm.org_representative"></el-input>
        </el-form-item>
        <el-form-item
          label="组织联系人手机号"
          prop="org_phone"
          hide-required-asterisk="true"
        >
          <el-input v-model="orgForm.org_phone"></el-input>
        </el-form-item>
        <el-form-item
          label="组织地址"
          prop="org_address"
          hide-required-asterisk="true"
        >
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
          <el-input v-model="orgForm.org_address"></el-input>
        </el-form-item>
        <el-form-item
          label="组织头像"
          prop="org_pic"
          hide-required-asterisk="true"
        >
          <el-input v-model.number="orgForm.org_pic"></el-input>
        </el-form-item>
        <el-form-item label=" 组织描述" prop="org_desc">
          <el-input type="textarea" v-model="orgForm.org_desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="header">注册信息</h2>
    <el-button
      type="danger"
      class="btn01"
      @click="EnrollOrganization('orgForm')"
      >申请实名注册组织机构队伍</el-button
    >
    <div class="step">
      <el-steps :active="3" direction="vertical">
        <el-step title="步骤 1" description="填写管理员账号相关信息"></el-step>
        <el-step title="步骤 2" description="填写组织基本相关信息"></el-step>
        <el-step title="步骤 3" description="注册"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { orgRegister } from "@/services/org";

export default {
  name: "",
  components: {},
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      selectedarea: "",
      orgForm: {
        org_name: "",
        org_pic: "",
        org_user_name: "",
        org_password: "",
        org_representative: "",
        org_phone: "",
        org_province: "",
        org_town: "",
        org_country: "",
        org_address: "",
        org_desc: ""
      },
      rules: {
        org_user_name: [
          { required: true, message: "请输入管理员用户名", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        org_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 15,
            message: "密码长度为 8 到 15 个字符",
            trigger: "blur"
          }
        ],
        org_name: [
          { required: true, message: "请输入组织机构名称", trigger: "blur" }
        ],
        org_phone: [
          { required: true, message: "请输入组织联系人手机号", trigger: "blur" }
        ],
        org_pic: [
          { required: true, message: "请输入组织联系人手机号", trigger: "blur" }
        ],
        org_representative: [
          { required: true, message: "请输入组织联系人姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入正确的联系人姓名",
            trigger: "blur"
          }
        ],
        org_address: [
          { required: true, message: "请输入组织地址", trigger: "chenge" }
        ],
        org_desc: [
          { required: true, message: "请输入组织描述", trigger: "blur" },
          {
            min: 10,
            max: 200,
            message: "组织描述长度为 10 到200 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    EnrollOrganization(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.orgForm);
          //调用组织注册接口
          orgRegister({ ...this.orgForm }).then(res => {
            if (res.status == 200 && res.data.data.res_status.code == 10000) {
              this.$notify({
                title: "成功",
                message: "注册成功！",
                type: "success"
              });
              this.$router.push("/index");
            } else {
              this.$message.error(
                res.data.data.res_status.msg + "!请重新输入!"
              );
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(arr) {
      this.orgForm.org_province = CodeToText[arr[0]];
      this.orgForm.org_town = CodeToText[arr[1]];
      this.orgForm.org_country = CodeToText[arr[2]];
    }
  }
};
</script>

<style scoped>
.enrollOrganizationWrapper {
  position: relative;
}
.step {
  height: 500px;
  position: absolute;
  right: 200px;
  top: 40px;
}
.header {
  font-size: 20px;
  width: 450px;
  color: #333;
  font-weight: bold;
  line-height: 60px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  padding-left: 16px;
  margin: 0;
}
.header::before {
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
.accountNumberInfo {
  margin-top: 20px;
}
.userInfo {
  margin-top: 20px;
}
.el-input {
  width: 300px;
}
.el-textarea {
  width: 300px;
}
.header:nth-last-child(3) {
  width: 1240px;
}
.btn01 {
  margin: 20px 470px;
}
</style>
