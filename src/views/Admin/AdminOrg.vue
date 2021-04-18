<template>
  <div>
    <el-table :data="orgsData" style="width: 100%" border stripe>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="组织名称" align="center">
        <template slot-scope="scope">{{ scope.row.org_name }}</template>
      </el-table-column>
      <el-table-column label="组织用户名" align="center">
        <template slot-scope="scope">{{ scope.row.org_user_name }}</template>
      </el-table-column>
      <el-table-column label="组织联系人" align="center">
        <template slot-scope="scope">{{ scope.row.org_representative }}</template>
      </el-table-column>
      <el-table-column label="组织联系人手机号" align="center">
        <template slot-scope="scope">{{ scope.row.org_phone }}</template>
      </el-table-column>
      <el-table-column label="组织地址" align="center">
        <template slot-scope="scope">{{ scope.row.org_province + scope.row.org_town+scope.row.org_country + scope.row.org_address}}</template>
      </el-table-column>
      <el-table-column label="组织头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.org_pic" alt="没头像呢">
        </template>
      </el-table-column>
      <el-table-column label="描述/备注" align="center">
        <template slot-scope="scope">{{ scope.row.org_desc }}</template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">{{ timestampToTime(scope.row.create_time * 1000) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot="header">
          <el-button type="primary" @click="dialogVisible = true"
            >添加组织<i class="el-icon-plus el-icon--right"></i
          ></el-button>
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="deleteOrg(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes,prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
      <el-dialog title="添加组织机构" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="orgForm" :rules="rules" label-width="130px">

        <el-form-item label="组织名称" prop="org_name">
          <el-input
            v-model="orgForm.org_name"
            placeholder="请输入组织名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织登录用户名" prop="org_user_name">
          <el-input
            v-model="orgForm.org_user_name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织登录密码" prop="org_password">
          <el-input
            type="password"
            v-model="orgForm.org_password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织联系人" prop="org_representative">
          <el-input
            v-model="orgForm.org_representative"
            placeholder="请输入真实姓名！"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织联系人手机号" prop="org_phone">
          <el-input
            v-model="orgForm.org_phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织地址">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
          <el-input
            v-model="orgForm.org_address"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织图片" prop="org_pic">
          <el-input
            v-model="orgForm.org_pic"
            placeholder="请输入图片链接地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注/描述">
          <el-input type="textarea" v-model="orgForm.org_desc"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrg">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData,CodeToText } from "element-china-area-data";
import{timestampToTime} from '../../assets/js/tools'
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      orgsData: [],
      dialogVisible: false,
      orgForm: {
        org_name:'',
        org_pic:'',
        org_user_name:'',
        org_password:'',
        org_representative:'',
        org_phone:'',
        org_province:'',
        org_town:'',
        org_country:'',
        org_address:'',
        org_desc:''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
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
        level: [{ required: true, message: "请选用户角色", trigger: "change" }],
      },
      currentPage: 1, //当前页
      total: 100, //总数
      pageSize: 5, //每页展示个数
      limit: 5,
      offset: 0,
    };
  },
  watch: {},
  computed: {},
  created() {
    //请求用户列表
      this.axios({
        method:'POST',
        url:'/orgs',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          cur_page:0
        })
        }).then(res => {
          console.log(res);
          if(res.status == 200 && res.data.data.res_status.code == 10000){
            this.orgsData = res.data.data.orgs
          }
        }).catch(err => {
          console.log(err);
      })
  },
  mounted() {},
  methods: {
    timestampToTime,
      //省市县处理函数
    handleChange(arr) {
          this.orgForm.org_province = CodeToText[arr[0]]
          this.orgForm.org_town = CodeToText[arr[1]]
          this.orgForm.org_country = CodeToText[arr[2]]
    },
    deleteOrg(id) {
      console.log(id);
      this.$confirm("此操作将删除该组织, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除用户接口
          this.axios({
            method:'POST',
            url:'/org/delete',
            data: JSON.stringify({
              id: id,
            }),
          }).then((res) => {
            console.log(res);
            if(res.status == 200 && res.data.data.res_status.code == 10000){
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              location.reload();
            }else{
              this.$message.error(res.data.data.res_status.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addOrg() {
      console.log(JSON.stringify(this.orgForm));
      //请求添加用户
      this.axios({
        method:'POST',
        url:'/org/register',
        data: JSON.stringify(this.orgForm),
      }).then((res) => {
        //console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          location.reload();
        } else {
          this.$message.error(res.data.data.res_status.msg + "!请重新输入!");
        }
      });
    },
    handleCurrentChange(pages) {
      //console.log(pages);
      this.offset = (pages - 1) * this.limit;
      //console.log(this.offset);
      this.axios({
      method: "POST",
      url: "/users",
      data: JSON.stringify({
        offset: this.offset,
        limit: this.limit,
        cur_page: 0,
      }),
      }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.usersData = res.data.data.users
        }
      });
    },
    handleSizeChange(pagesize) {
      //console.log(pagesize);
      this.pageSize = this.limit = pagesize;
      this.axios({
      method: "POST",
      url: "/users",
      data: JSON.stringify({
        offset: this.offset,
        limit: this.limit,
        cur_page: 0,
      }),
      }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.usersData = res.data.data.users
        }
      });
    },
  },
};
</script>

<style scoped>
tbody img {
  width: 50px;
  height: 50px;
}
</style>
