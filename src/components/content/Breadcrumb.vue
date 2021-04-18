<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <slot name="first"><el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item></slot>
      <slot name="second"><el-breadcrumb-item>活动管理</el-breadcrumb-item></slot>
      <slot name="third" ><el-breadcrumb-item>活动列表</el-breadcrumb-item></slot>
      <slot name="fourth"><el-breadcrumb-item>活动详情</el-breadcrumb-item></slot>
    </el-breadcrumb>
  </div>
</template>

<script>
//面包屑导航
export default {
  name: '',
  mixins: [],
  props: {},
  components: {},
  data () {
    return {

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

  }
}
</script>

<style scoped>

</style>
