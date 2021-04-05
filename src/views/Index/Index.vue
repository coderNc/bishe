<template>
    <div>
        <header-test></header-test>
        <banner></banner>
        <swiper></swiper>
    </div>
</template>

<script>

import HeaderTest from '@/components/content/HeaderTest.vue'
import Banner from '@/views/Index/Banner.vue'
import Swiper from '../Index/Swiper.vue'



export default {
    name:  '',
    mixins: [],
    props: {},
    components: {
        HeaderTest,
        Banner,
        Swiper
    },
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

<style scoped >

</style>
