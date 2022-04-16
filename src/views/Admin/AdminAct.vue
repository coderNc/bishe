<template>
  <div>
    <el-table :data="actData" style="width: 100%" border stripe>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="活动名称" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="活动地址" align="center">
        <template slot-scope="scope">{{ scope.row.place }}</template>
      </el-table-column>
      <el-table-column label="已报名/需求人数" align="center">
        <template slot-scope="scope"
          >{{ scope.row.fact_num }} / {{ scope.row.target_num }}</template
        >
      </el-table-column>
      <el-table-column label="活动联系人" align="center">
        <template slot-scope="scope">{{ scope.row.representative }}</template>
      </el-table-column>
      <el-table-column label="活动联系人手机号" align="center">
        <template slot-scope="scope">{{
          scope.row.representative_phone
        }}</template>
      </el-table-column>
      <el-table-column label="活动标签" align="center">
        <template slot-scope="scope">{{ scope.row.tag }}</template>
      </el-table-column>
      <el-table-column label="活动持续时间" align="center">
        <template slot-scope="scope"
          >{{ timestampToTime(scope.row.start_time) }} 至
          {{ timestampToTime(scope.row.end_time) }}</template
        >
      </el-table-column>

      <el-table-column label="描述/备注" align="center">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">{{
          timestampToTime(scope.row.create_time * 1000)
        }}</template>
      </el-table-column>
      <!--       <el-table-column label="操作" align="center">
        <template slot="header">
        </template>
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteOrg(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { timestampToTime } from "../../assets/js/tools";
import { getActivities } from "@/services/activity";

export default {
  name: "",
  data() {
    return {
      actData: []
    };
  },
  created() {
    getActivities({
      limit: 1000,
      offset: 0,
      cur_page: 0
    }).then(res => {
      // console.log(res);
      if (res.status == 200 && res.data.data.res_status.code == 10000) {
        this.actData = res.data.data.activity;
      }
    });
  },
  methods: {
    timestampToTime
  }
};
</script>

<style scoped></style>
