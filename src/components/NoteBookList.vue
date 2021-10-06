<template>
    <div class="notebook-list">
        <header @click.prevent="onCreate">
            <a href="#" class="btn">
                <i class="iconfont icon-plus"></i>
                新建笔记本
            </a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表
                    <span>({{notebooks.length}})</span>
                </h3>
                <div class="book-list">
                    <router-link class="notebook" v-for="(item,index) in notebooks" :key="index"
                                 :to="`/note?notebookId=${item.id}`">
                        <div>
                            <span class="iconfont icon-notebook"></span>
                            {{item.title}}
                            <span>{{item.noteCounts}}</span>
                            <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
                            <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
                            <span class="date">{{item.times}}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import auth from '@/servies/network/api'


    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        name: "NoteBookList",
        data() {
            return {}
        },
        created() {
           this.checkUser('/login')
            this.$store.dispatch('getNotebooks')
        },
        computed: {
            ...mapGetters(['notebooks'])
        },
        methods: {
            ...mapActions(['addNotebook','deleteNotebook','updateNotebook','checkUser']),
            onCreate() {
                this.$prompt('标题', '新建笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,15}$/,
                    inputErrorMessage: '标题字符不正确',
                    closeOnClickModal: false,
                }).then(({value}) => {
                   this.addNotebook({title:value})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            async onDelete(item) {
                let confirm = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if (confirm !== 'confirm') {
                    return this.$message.error('取消删除')
                }
                this.deleteNotebook({notebookId:item.id})
                this.$message.success('删除成功')
            },
            onEdit(item) {
                this.$prompt('请输入标题', '修改标题', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,15}$/,
                    inputErrorMessage: '请输入1~15个字符',
                    inputValue: item.title
                }).then(({value}) => {
                    this.updateNotebook({notebookId:item.id,title:value})
                    // notebooksList.updateBook(item.id, {title: value}).then(res => {
                    //     item.title = value
                    // })
                    this.$message.success('修改成功')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>

<style lang="less">
    @import url('~@/assets/css/notebook-list.less');
</style>