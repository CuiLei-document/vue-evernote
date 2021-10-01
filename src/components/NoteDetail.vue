<template>
    <div>
        {{$route.params.noteId}}
    </div>
</template>

<script>
    import auth from '@/servies/network/api'
    export default {
        name: "NoteDetail",
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