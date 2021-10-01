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
                    <span>({{notebookList.length}})</span>
                </h3>
                <div class="book-list">
                    <router-link to="/note/1" class="notebook" v-for="(item,index) in notebookList" :key="index">
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
    import notebooksList from '@/servies/network/notebooks'

    export default {
        name: "NoteBookList",
        data() {
            return {
                notebookList: []
            }
        },
        created() {
            auth.getInfo().then(res => {
                if (!res.isLogin) {
                    this.$router.push({path: '/login'})
                }
            })
            notebooksList.getAll().then(res => {
                this.notebookList = res.data
                console.log(res)
            })
            // notebooksList.addBook({title:'测试 不知道行不行'})
        },
        methods: {
            onCreate() {
                let title = window.prompt('创建内容')
                notebooksList.addBook({title}).then(res => {
                    this.notebookList.unshift(res.data)
                })
            },
            onDelete(item) {
                let isConfirm = window.confirm('确定删除吗')
                if (isConfirm) {
                    notebooksList.deleteBook(item.id).then(res => {
                        this.notebookList.splice(this.notebookList.indexOf(item), 1)
                        alert('删除成功')
                    })
                }
            },
            onEdit(item) {
                let title = window.prompt('修改标题', item.title)
                notebooksList.updateBook(item.id, {title}).then(res => {
                    console.log(item.title)
                    item.title = title
                    console.log(res)
                })
                console.log('编辑')
            }
        }
    }
</script>

<style lang="less">
    @import url('~@/assets/css/notebook-list.less');
</style>