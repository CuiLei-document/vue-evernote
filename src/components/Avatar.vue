<template>
    <span :title="user.name">{{slug}}</span>
</template>

<script>
    export default {
        name: "Avatar",
        data() {
            return {
                user: {
                    name: 'h'
                },
                slug: 'h'
            }
        }
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