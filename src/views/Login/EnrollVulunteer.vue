<template>
  <div class="enrollVulunteerWrapper">
    <h2 class="header">账号信息</h2>
    <div class="accountNumberInfo">
      <el-form :model="volForm" status-icon :rules="rules" ref="volForm" label-width="120px" class="demo-ruleForm " >
        <el-form-item label="账号" prop="user_name" hide-required-asterisk="true"> 
          <el-input v-model="volForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" hide-required-asterisk="true">
          <el-input type="password" v-model="volForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" hide-required-asterisk="true"> 
          <el-input v-model="volForm.phone"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="header">身份信息</h2>
    <div class="userInfo">
      <el-form :model="volForm" status-icon :rules="rules" ref="volForm" label-width="120px" class="demo-ruleForm " >
        <el-form-item label="姓名" prop="name" hide-required-asterisk="true">
          <el-input v-model.number="volForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" hide-required-asterisk="true">
          <el-input v-model.number="volForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" hide-required-asterisk="true">
          <el-select v-model="volForm.gender" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <h2 class="header">志愿者誓词</h2>
    <div class="tip">
      <p>我宣誓，自愿成为一名光荣的志愿者，为使我们的国家和城市更美好、人民更幸福、环境更安全，我要团结身边的人，投身其间。面对需求，我要行动。</p>
      <p>我承诺，我将竭尽所能，参加公益活动，帮助困难人群，真诚关怀有需要的人士，为他们带来温暖。</p>
      <el-button type="danger" class="btn01"  @click="EnrollVulunteer('volForm')">申请成为实名注册志愿者</el-button>
    </div>
    <div class="step" >
      <el-steps :active="3" direction="vertical" >
        <el-step title="步骤 1" description="填写账号相关信息"></el-step>
        <el-step title="步骤 2" description="填写身份相关信息"></el-step>
        <el-step title="步骤 3" description="同意志愿者誓词"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {},
  components: {},
  data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
    return {
        volForm: {
          user_name:'',
          password: '',
          phone:'',
          age: '',
          name:'',
          gender:'',
          user_type:0
        },
      rules: {
            user_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 15, message: '密码长度为 8 到 15 个字符', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号长度为 11 个数字', trigger: 'blur' }
          ],
            name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '请输入正确的真实姓名', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkAge, trigger: 'blur' }
          ],
            gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        }
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
      EnrollVulunteer(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("okkkkk");
            this.axios({
              method:'POST',
              url:'/user/register',
              data: JSON.stringify(this.volForm),
            }).then((res) => {
              //console.log(res);
              if(res.status == 200 && res.data.data.res_status.code == 10000){
                this.$notify({
                          title: '成功',
                          message: '注册成功！',
                          type: 'success'
                        });
                this.$router.push('/index')
              } else {
                this.$message.error(res.data.data.res_status.msg + "!请重新输入!");
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>

<style scoped>
.enrollVulunteerWrapper{
  position: relative;
}
.step{
  height: 500px;
  position: absolute;
  right: 200px;
  top: 40px;
}
.header{
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
.header::before{
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
.accountNumberInfo{
  margin-top: 20px;
}
.userInfo{
  margin-top: 20px;
}
.el-input{
  width: 300px;
}
.tip {
    padding: 8px 16px;
    background-color: #fff3ec;
    border-radius: 4px;
    border-left: 5px solid #e60012;
    margin: 20px 0;
}
.btn01{
  margin:20px 470px;
}
</style>
