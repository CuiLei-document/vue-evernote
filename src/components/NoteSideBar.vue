<template>
    <div class="node-sidebar">
        <span class="btn add-note" @click="onAddNote">添加笔记</span>
        <el-dropdown class="notebook-title" @command="handleCommand">
              <span class="el-dropdown-link">
                    {{currentBook.title}}
                  <i class="iconfont icon-down"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in notebooks" :key="item.id" :command="item.id">{{item.title}}
                </el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li v-for="(item,index) in notes" :key="item.id">
                <router-link :to="`/note?noteId=${item.id}&notebookId=${currentBook.id}`">
                    <span class="date">{{item.time}}</span>
                    <span class="title">{{item.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    export default {
        name: "NoteSideBar",
        data() {
            return {}
        },
        created() {
            this.getNotebooks().then(() => {
                this.setCurrentBook({currentBookId: this.$route.query.notebookId})
                return this.getNotes({notebookId: this.currentBook.id})
            }).then(()=>{
                this.setCurrentNote({currentNoteId:this.$route.query.noteId})
                this.$router.replace({
                    path:'/note',
                    query:{
                        noteId:this.currentNote.id,
                        notebookId:this.currentBook.id
                    }
                })
            })
        },
        computed: {
            ...mapGetters([
                'notebooks',
                'notes',
                'currentBook',
                'currentNote'
            ])
        },
        methods: {
            ...mapMutations(['setCurrentBook','setCurrentNote']),
            ...mapActions([
                'getNotebooks',
                'getNotes',
                'addNote'
            ]),
            handleCommand(notebookId) {
                if (notebookId === 'trash') {
                    return this.$router.push('/trash')
                }
                this.setCurrentBook({currentBookId: notebookId})
                this.getNotes({notebookId}).then(()=>{
                    this.setCurrentNote()
                    this.$router.replace({
                        path:'/note',
                        query:{
                            noteId:this.currentNote.id,
                            notebookId:this.currentBook.id
                        }
                    })
                })

            },
            onAddNote() {
                this.addNote({notebookId: this.currentBook.id})
            }
        },
    }
</script>

<style scoped lang="less">
    @import "~@/assets/css/note-slidebar.less";
</style>