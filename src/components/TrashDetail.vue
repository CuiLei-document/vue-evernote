<template>
    <div class="trash">
        <div class="node-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>更新时间</div>
                <div>标题</div>
            </div>
            <ul class="notes">
                <li v-for="(note,index) in trashNotes " :key="index">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="date">{{note.updatedAtBeautify}}</span>
                        <span class="title">{{note.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-bar">
                <span>创建日期{{currentTrash.createdAtBeautify}}</span>
                <span> | </span>
                <span>更新日期{{currentTrash.updatedAtBeautify}}</span>
                <span> | </span>
                <span>所属笔记本{{bookTo}}</span>

                <a class="btn action" @click="onRevert">恢复</a>
                <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>标题</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="previewContent"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import MarkDown from 'markdown-it'

    let md = new MarkDown()
    export default {
        name: "TrashDetail",
        data() {
            return {}
        },
        created() {
            this.checkUser('/login')
            this.getNotebooks()
            this.getTrashNote().then(() => {
                this.setCurrentTrash({noteId: this.$route.query.noteId})
                this.$router.replace({
                    path: '/trash',
                    query: {
                        noteId: this.currentTrash.id
                    }
                })
            })
        },
        computed: {
            ...mapGetters([
                'trashNotes',
                'currentTrash',
                'bookTo'
            ]),
            previewContent() {
                return md.render(this.currentTrash.content || '')
            }
        },
        methods: {
            ...mapMutations(['setCurrentTrash']),
            ...mapActions([
                'checkUser',
                'getTrashNote',
                'revertTrashNote',
                'deleteTrashNote',
                'getNotebooks'
            ]),
            onRevert() {
                console.log(this.currentTrash.id)
                this.revertTrashNote({noteId: this.currentTrash.id}).then(() => {
                    this.setCurrentTrash()
                    this.$router.replace({
                        path: '/trash',
                        query: {
                            noteId: this.currentTrash.id
                        }
                    })
                })
                this.$message.success('恢复成功')
            },
            onDelete() {
                this.$confirm('删除笔记本后无法恢复！', '删除笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.deleteTrashNote({noteId: this.currentTrash.id}).then(() => {
                        this.setCurrentTrash()
                        this.$router.replace({
                            path: '/trash',
                            query: {
                                noteId: this.currentTrash.id
                            }
                        })
                    })
                    this.$message.warning('彻底删除')
                }).catch(err=> err)

            }
        },
        beforeRouteUpdate(to, from, next) {
            this.setCurrentTrash({noteId: this.$route.query.noteId})
            next()
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/css/note-slidebar.less';
    @import '../assets/css/note-detail.less';

    .trash {
        display: flex;
        align-items: stretch;
        background-color: #fff;
        flex: 1;

        .note-bar {
            .action {
                float: right;
                margin-left: 10px;
                padding: 2px 4px;
                font-size: 12px;

            }
        }
    }


</style>