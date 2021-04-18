<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
  
  <el-form-item label="验证码" prop="verificationCode">
    <el-input v-model="ruleForm.verificationCode" autocomplete="off"></el-input>
    	<div @click="refreshCode">
        <identify-code
              :identifyCode="identifyCode"
              :contentWidth="150"
              :contentHeight="50"
              :fontSizeMin="50"
          />
	    </div>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>

import IdentifyCode from './IdentifyCode'
  export default {
    components: {
            'identify-code': IdentifyCode,
        },
    data() {
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var codeRules = (rule, value, callback) => {
                if (value === '') {
                    //return "验证码不能为空";
                    return callback(new Error('验证码不能为空'));
                }else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    //return "验证码输入不正确";
                    return callback(new Error('验证码输入不正确!'));
                } else {
                    return callback();;
                }
            }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
          verificationCode:''
        },
        	//生成验证码的字符范围
            identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
            //生成的验证码
            identifyCode: "",
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          verificationCode:[
            { validator: codeRules, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            console.log(this.ruleForm);
            var result = {
              pass:this.ruleForm.pass,
              checkPass:this.ruleForm.checkPass,
              age:this.ruleForm.age,
            }
            result = JSON.stringify(result)
            console.log(result);
            //alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
            }
    },
    
      mounted() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
      },
  }
</script>