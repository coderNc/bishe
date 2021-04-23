<template>
  <div id="swiperBox">
    <div class="block">
      <el-carousel trigger="click" height="380px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <img :src=item.imgUrl>
          <!-- <img src="@/assets/img/banner.png"> -->
          <h3>{{item.txt}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      imgList:[
        {imgUrl:require("../../assets/img/banner.png"),txt:"西邮志愿者测试网站上线啦！"},
        {imgUrl:require("../../assets/img/swiper1.png"),txt:"测试1"},
        {imgUrl:require("../../assets/img/swiper2.png"),txt:"测试2"},
        {imgUrl:require("../../assets/img/swiper3.png"),txt:"测试3"},
        {imgUrl:require("../../assets/img/swiper4.png"),txt:"测试4"},
        ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>

.block{
  width: 820px;
  height: 380px;
  position: relative;
  top: 50px;
  left: 320px;
  background-color: #bfa;

}
.el-carousel__item h3 {
  width: 300px;
  display: inline-block;
  background-color: rgba(77, 45, 45, 0.356);
  position: absolute;
  bottom: 50px;
  left: 260px;
  color: #475669;
  text-align: center;
  font-size: 20px;
  opacity: 0.75;
  line-height: 50px;
  margin: 0;
}
.el-carousel__item img{
  width: 100%;
}
.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}
</style>
