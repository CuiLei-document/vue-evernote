<template>
    <div class="sidebar">
        <Avatar  />
        <div class="icons">
            <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
            <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
            <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
        </div>
        <div class="logout">
            <i class="iconfont icon-logout" @click="logout"></i>
        </div>
    </div>
</template>

<script>
    import Avatar from './Avatar.vue'
    export default {
        components:{Avatar},
        name: "SideBar",
        methods:{
            logout(){
                console.log(1111)
                this.$store.dispatch('logoutUser').then(()=>{
                    this.$router.push('/login')
                    this.$message.success('注销登录')
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .sidebar {
        width: 56px;
        background-color: #2c333c;
        text-align: center;
        position: relative;
        overflow: hidden;
        height: 100%;
        .icons {
            margin-top: 15px;

            a {
                padding: 6px 0;
                display: block;
            }

            .router-link-active {
                background-color: #5e6266;
            }
        }

        .logout {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            cursor: pointer;
        }

        .iconfont {
            color: #fff;
        }
    }
</style>