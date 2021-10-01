<template>
    <div>
        <h1>{{$route.params.noteId}}</h1>
    </div>
</template>

<script>
    import auth from '@/servies/network/api.js'
    export default {
        name: "TrashDetail",
        created(){
            auth.getInfo().then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            })
        }
    }
</script>

<style scoped>

</style>