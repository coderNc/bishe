<template>
  <div class="asideWrapper">
    <aside-news />
    <aside-hots />
  </div>
</template>

<script>
import AsideNews from './AsideNews.vue';
import AsideHots from "./AsideHots.vue";

export default {
  name: "",
  mixins: [],
  props: {},
  components: { AsideNews, AsideHots },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.asideWrapper {
  width: 400px;
  position: absolute;
  right: 320px;
  top: 610px;
}
</style>
