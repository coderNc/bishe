<template>
  <div>
    <heder />
    <banner />
    <swiper />
    <aside-index />
    <div class="activityContainer">
      <activity-container />
    </div>
  </div>
</template>

<script>
import Banner from "@/views/Index/Banner.vue";
import Swiper from "../Index/Swiper.vue";
import AsideIndex from "../Index/Aside/AsideIndex.vue";
import ActivityContainer from "../Index/ActivityContainer.vue";
import Heder from "../../components/content/Heder.vue";

export default {
  name: "Index",
  components: {
    Banner,
    Swiper,
    AsideIndex,
    ActivityContainer,
    Heder
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    //this.$refs.header.activeIndex = '1'
  },
  methods: {}
};
</script>

<style scoped>
.activityContainer {
  width: 820px;
  height: 1000px;
  position: absolute;
  left: 320px;
  top: 1040px;
  /* background-color: #bfa; */
}
</style>
