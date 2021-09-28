<template>
    <div id="app">
        <SideBar/>
        <router-view></router-view>
    </div>
</template>
<script>
    import SideBar from '@/components/SideBar.vue';

    export default {
        components: {SideBar}
    }

</script>
<style lang="less">
    @import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color:#444;
    }
    ul,ol{
        list-style:none;
    }
    html,body,#app{
        height: 100%;
    }
    body{
        font-family: 'Avenir',Helvetica,Arial,sans-serif;
        font-size: 14px;
        -moz-osx-font-smoothing: grayscale;
        background-color:#eee;
    }
    #app{
        display:flex;
        align-items: stretch;
    }
</style>
