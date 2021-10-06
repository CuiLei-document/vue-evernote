<template>
    <div class="container">
        <note-slide-bar/>
        <div class="note-detail">
            <div v-show="!currentNote.id" class="note-empty">请选择笔记😊</div>
            <div class="note-detail-ct" v-show="currentNote.id">
                <div class="note-bar">
                    <span>创建日期：{{currentNote.time}}</span>
                    <span>是否更新：{{statusText}}</span>
                    <span class="iconfont icon-delete" @click="onDeleteNote"></span>
                    <span class="iconfont icon-fullscreen" @click="isShowText = !isShowText">切换MarkDown</span>
                </div>
                <div class="note-title">
                    <input type="text" @keydown="statusText = '正在输入'" v-model:value="currentNote.title"
                           @input="onUpdateNote" placeholder="请输入标题">
                </div>
                <div class="editor">
                    <label>
                        <textarea v-show="!isShowText" @keydown="statusText = '正在输入'" placeholder="支持Markdown 语法"
                                  @input="onUpdateNote"
                                  v-model:value="currentNote.content">
                        </textarea>
                    </label>
                    <div class="preview markdown-body" v-show="isShowText" v-html="previewContent">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NoteSlideBar from '@/components/NoteSideBar'
    import _ from 'lodash'
    import MarkDown from 'markdown-it'
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    let md = new MarkDown()
    export default {
        components: {NoteSlideBar},
        name: "NoteDetail",
        data() {
            return {
                statusText: '暂未更新',
                isShowText: false
            }
        },
        created() {
            this.checkUser()
        },
        beforeRouteUpdate(to, from, next) {
            this.setCurrentNote({currentNoteId: to.query.noteId})
            next()
        },
        computed: {
            ...mapGetters([
                'currentNote',
                'notes'
            ]),
            previewContent() {
                return md.render(this.currentNote.content || '')
            }
        },
        methods: {
            ...mapMutations([

                'setCurrentNote',
                'checkUser'
            ]),
            ...mapActions([
                'updateNote',
                'deleteNote'
            ]),
            onUpdateNote: _.debounce(function () {
                this.updateNote({
                    noteId: this.currentNote.id,
                    title: this.currentNote.title,
                    content: this.currentNote.title
                }).then(() => {
                    this.statusText = '已保存'
                }).catch(() => {
                    this.$message.error('保存失败，请检查')
                })
            }, 300),
            onDeleteNote() {
                this.deleteNote({noteId: this.currentNote.id}).then(() => {
                    this.$message.success('删除成功')
                })
            }
        }
    }
</script>

<style lang="less">
    @import "~@/assets/css/note-detail.less";

    .container {
        display: flex;
        background: #fff;
        align-items: stretch;
        width: 100%;
    }
</style>