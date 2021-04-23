<template>
  <div class="box">
    <el-button  @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <xmap width="700px" height="500px"  @location="location" :lnglat=test :isShow=true></xmap>
    </el-dialog>

  </div>
</template>

<script>
import xmap from './Xmap'
export default {
  components: { xmap }, 
  data(){
    return {
      dialogVisible: false,
      point:[],
      test:[108.954136,34.264685]
    }
  },
  methods: {
    location(point, address) {
      this.point = point
      alert(`坐标：${point[0]},${point[1]} - 地址：${address}`)
    }
  }
}
</script>
<style scope>

</style>