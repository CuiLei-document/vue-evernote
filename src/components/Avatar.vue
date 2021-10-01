<template>
    <span :title="username">{{slug}}</span>
</template>

<script>
    import api from '@/servies/network/api.js'

    export default {
        name: "Avatar",
        data() {
            return {
                username: '未登录',
            }
        },
        computed: {
            slug() {
                return this.username[0].toUpperCase()
            }
        },
        created() {
            // this.$eventBus.$on('userInfo', name => {
            //     console.log(1111111)
            //     console.log(name)
            //     this.username = name
            // })
            this.$eventBus.$on('userInfo',msg=>{
                this.username = msg
            })
            api.getInfo().then(res => {
                if (res.isLogin) {
                    this.username = res.data.username
                }
                console.log(res);
            })
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