<template>
  <div id="app">
    <router-view :key="key"/>
      
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    key(){
      return this.$route.name?this.$route.name + + new Date():this.$route+ +new Date()
    }
  }
}
</script>

<style>
#app{
  /* height: 2000px; */
  /* background-color: rgb(238,238,238); */
}
</style>
