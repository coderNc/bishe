webpackJsonp([4],{"8wpF":function(t,e){},UO4v:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("d8Vk"),n=a("hrFV"),s=a("k/p9"),r={name:"",mixins:[],props:{},components:{HeaderTest:i.a,ActivityContainer:s.a,Heder:n.a},data:function(){return{keyword:"所有项目"}},watch:{},computed:{},created:function(){},mounted:function(){},methods:{}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("heder"),t._v(" "),a("div",{staticClass:"yetou"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v(t._s(t.keyword))])],1)],1),t._v(" "),a("el-divider",[a("i",{staticClass:"el-icon-edit-outline"})]),t._v(" "),a("div",{staticClass:"contentWrapper"},[a("activity-container",{attrs:{isShowLabel1:!0}})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,c,!1,function(t){a("8wpF")},"data-v-7b985368",null);e.default=o.exports},V9ic:function(t,e){},"k/p9":function(t,e,a){"use strict";var i=a("mvHQ"),n=a.n(i),s=a("jt1B"),r={name:"",mixins:[],props:{activityItem:{type:Object,default:function(){return{}}},isShowLabel:{type:Boolean,default:function(){return!1}}},components:{},data:function(){return{isAlready:!0,items:[{type:" "},{type:"success"},{type:"danger"},{type:"warning"}],orgData:{}}},watch:{},computed:{},created:function(){},mounted:function(){},methods:{timestampToTime:s.b,percentage1:function(t,e){return(100*(t/e).toFixed(2)).toFixed(0)}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"activityItemWrapper"},[t._m(0),t._v(" "),a("div",{staticClass:"header"},[a("router-link",{attrs:{to:"/detail/"+t.activityItem.id}},[a("h2",{staticClass:"titleColor"},[t._v(t._s(t.activityItem.title))])]),t._v(" "),t.activityItem.already?a("el-button",{staticClass:"btn",attrs:{type:"danger",round:""}},[t._v("招募已完成")]):a("el-button",{staticClass:"btn",attrs:{type:"success",round:""}},[t._v("招募中")])],1),t._v(" "),a("div",{staticClass:"content"},[a("p",[t._v("项目组织："+t._s(t.activityItem.org_name))]),t._v(" "),a("p",[t._v("项目地址："+t._s(t.activityItem.place))]),t._v(" "),a("p",[t._v("项目日期："+t._s(t.timestampToTime(t.activityItem.start_time))+" 至 "+t._s(t.timestampToTime(t.activityItem.end_time)))]),t._v(" "),a("p",[t._v("报名人数："+t._s(t.activityItem.fact_num)+" | 目标人数："+t._s(t.activityItem.target_num))])]),t._v(" "),a("div",{staticClass:"footer"},[a("el-progress",{staticClass:"progressBar",attrs:{percentage:t.percentage1(t.activityItem.fact_num,t.activityItem.target_num)}})],1),t._v(" "),t.isShowLabel?a("div",{staticClass:"lableWrapper"},t._l(t.activityItem.tag.split(","),function(e,i){return a("el-tag",{key:i,attrs:{type:t.items[i].type,effect:"dark"}},[t._v("\n        "+t._s(e)+"\n      ")])}),1):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img"},[e("img",{attrs:{src:a("5/2Z"),alt:""}})])}]};var o={name:"",mixins:[],props:{isShowLabel1:""},components:{ActivityItem:a("VU/8")(r,c,!1,function(t){a("rogm")},"data-v-7166f8e3",null).exports},data:function(){return{actsData:[]}},watch:{},computed:{},created:function(){var t=this;this.axios({method:"POST",url:"/activities",data:n()({limit:1e3,offset:0,cur_page:0})}).then(function(e){console.log(e),200==e.status&&1e4==e.data.data.res_status.code&&(t.actsData=e.data.data.activity,t.actsData.forEach(function(t,e){t.fact_num===t.target_num?t.already=1:t.already=0}))}).catch(function(t){console.log(t)})},mounted:function(){},methods:{}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.actsData,function(e,i){return a("activity-item",{key:i,attrs:{activityItem:e,isShowLabel:t.isShowLabel1}})}),1)},staticRenderFns:[]};var d=a("VU/8")(o,u,!1,function(t){a("V9ic")},"data-v-6698d916",null);e.a=d.exports},rogm:function(t,e){}});
//# sourceMappingURL=4.7dc394e49f49bb23852d.js.map