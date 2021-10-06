<template>
    <span :title="username">{{slug}}</span>
</template>

<script>
    import api from '@/servies/network/api.js'
    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: "Avatar",
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'username',
                'slug'
            ])
        },
        methods:{
            ...mapActions(['checkUser'])
        },
        created() {
            this.checkUser('/login')
        },
    }
</script>

<style scoped>
    span {
        width: 30px;
        height: 30px;
        display: inline-block;
        line-height: 30px;
        border-radius: 50%;
        background-color: #f2b81c;
        color: #fff;
        text-shadow: 1px 0 1px #795c19;
        font-weight: bold;
        font-size: 18px;
        text-transform: uppercase;
        margin-top: 15px;
    }
</style>