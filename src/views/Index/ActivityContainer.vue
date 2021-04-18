<template>
  <div>
    <activity-item v-for="(item,index) in actsData" :key="index" :activityItem="item" :isShowLabel='isShowLabel1'></activity-item>
  </div>
</template>

<script>
import ActivityItem from '../../components/common/Activity/ActivityItem.vue'
export default {
  name: '',
  mixins: [],
  props: {
    isShowLabel1:''
  },
  components: {ActivityItem},
  data () {
    return {
      actsData:[],
      //isShowLabel1:true
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
      this.axios({
        method:'POST',
        url:'/activities',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          cur_page:0
        })
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.data.res_status.code == 10000){
          this.actsData = res.data.data.activity
          this.actsData.forEach((value,index) => {
/*             console.log(value);
            console.log(index); */
            if(value.fact_num === value.target_num){
              value.already = 1
            }else{
              value.already = 0
            }
          })
        }
      }).catch(err => {
        console.log(err);
      })   
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
