webpackJsonp([3],{"1alW":function(t,e,o){var r=o("kM2E");r(r.S,"Number",{isInteger:o("AKgy")})},AKgy:function(t,e,o){var r=o("EqjI"),i=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&i(t)===t}},OXzp:function(t,e){},"RRo+":function(t,e,o){t.exports={default:o("c45H"),__esModule:!0}},YG5A:function(t,e,o){"use strict";var r={name:"identify-code",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:16},fontSizeMax:{type:Number,default:40},backgroundColorMin:{type:Number,default:180},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:38}},methods:{randomNum:function(t,e){return Math.floor(Math.random()*(e-t)+t)},randomColor:function(t,e){return"rgb("+this.randomNum(t,e)+","+this.randomNum(t,e)+","+this.randomNum(t,e)+")"},drawPic:function(){var t=document.getElementById("s-canvas").getContext("2d");t.textBaseline="bottom",t.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),t.fillRect(0,0,this.contentWidth,this.contentHeight);for(var e=0;e<this.identifyCode.length;e++)this.drawText(t,this.identifyCode[e],e);this.drawLine(t),this.drawDot(t)},drawText:function(t,e,o){t.fillStyle=this.randomColor(this.colorMin,this.colorMax),t.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";var r=(o+1)*(this.contentWidth/(this.identifyCode.length+1)),i=this.randomNum(this.fontSizeMax,this.contentHeight-5),n=this.randomNum(-45,45);t.translate(r,i),t.rotate(n*Math.PI/180),t.fillText(e,0,0),t.rotate(-n*Math.PI/180),t.translate(-r,-i)},drawLine:function(t){for(var e=0;e<8;e++)t.strokeStyle=this.randomColor(this.lineColorMin,this.lineColorMax),t.beginPath(),t.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.stroke()},drawDot:function(t){for(var e=0;e<100;e++)t.fillStyle=this.randomColor(0,255),t.beginPath(),t.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),t.fill()}},watch:{identifyCode:function(){this.drawPic()}},mounted:function(){this.drawPic()}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s-canvas"},[e("canvas",{attrs:{id:"s-canvas",width:this.contentWidth,height:this.contentHeight}})])},staticRenderFns:[]};var n=o("VU/8")(r,i,!1,function(t){o("OXzp")},"data-v-45338094",null);e.a=n.exports},bVlk:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("mvHQ"),i=o.n(r),n=o("RRo+"),a=o.n(n),s={components:{"identify-code":o("YG5A").a},data:function(){var t=this;return{ruleForm:{pass:"",checkPass:"",age:"",verificationCode:""},identifyCodes:"ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",identifyCode:"",rules:{pass:[{validator:function(e,o,r){""===o?r(new Error("请输入密码")):(""!==t.ruleForm.checkPass&&t.$refs.ruleForm.validateField("checkPass"),r())},trigger:"blur"}],checkPass:[{validator:function(e,o,r){""===o?r(new Error("请再次输入密码")):o!==t.ruleForm.pass?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}],age:[{validator:function(t,e,o){if(!e)return o(new Error("年龄不能为空"));setTimeout(function(){a()(e)?e<18?o(new Error("必须年满18岁")):o():o(new Error("请输入数字值"))},1e3)},trigger:"blur"}],verificationCode:[{validator:function(e,o,r){return""===o?r(new Error("验证码不能为空")):o.toLowerCase()!==t.identifyCode.toLowerCase()?r(new Error("验证码输入不正确!")):r()},trigger:"blur"}]}}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log(e.ruleForm);var o={pass:e.ruleForm.pass,checkPass:e.ruleForm.checkPass,age:e.ruleForm.age};o=i()(o),console.log(o)})},resetForm:function(t){this.$refs[t].resetFields()},randomNum:function(t,e){return Math.floor(Math.random()*(e-t)+t)},refreshCode:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},makeCode:function(t,e){for(var o=0;o<e;o++)this.identifyCode+=this.identifyCodes[this.randomNum(0,this.identifyCodes.length)]}},mounted:function(){this.identifyCode="",this.makeCode(this.identifyCodes,4)}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"密码",prop:"pass"}},[o("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.ruleForm.pass,callback:function(e){t.$set(t.ruleForm,"pass",e)},expression:"ruleForm.pass"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[o("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.ruleForm.checkPass,callback:function(e){t.$set(t.ruleForm,"checkPass",e)},expression:"ruleForm.checkPass"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"年龄",prop:"age"}},[o("el-input",{model:{value:t.ruleForm.age,callback:function(e){t.$set(t.ruleForm,"age",t._n(e))},expression:"ruleForm.age"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"验证码",prop:"verificationCode"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.ruleForm.verificationCode,callback:function(e){t.$set(t.ruleForm,"verificationCode",e)},expression:"ruleForm.verificationCode"}}),t._v(" "),o("div",{on:{click:t.refreshCode}},[o("identify-code",{attrs:{identifyCode:t.identifyCode,contentWidth:150,contentHeight:50,fontSizeMin:50}})],1)],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("提交")]),t._v(" "),o("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)},staticRenderFns:[]},u=o("VU/8")(s,l,!1,null,null,null);e.default=u.exports},c45H:function(t,e,o){o("1alW"),t.exports=o("FeBl").Number.isInteger}});
//# sourceMappingURL=3.8a4b74da9fbb15469c77.js.map