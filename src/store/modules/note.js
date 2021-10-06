import notes from '@/servies/network/notes'

const state = {
    notes: null,
    currentNoteId:null
}
const getters = {
    notes(state) {
        return state.notes || []
    },
    currentNote(state){
        if(!Array.isArray(state.notes)) return {}
        if(!state.currentNoteId) return state.notes[0] || {}
        return state.notes.find(note => note.id.toString() === state.currentNoteId) || {}
    }
}
const mutations = {
    setNote(state, payload) {
        state.notes = payload.notes
    },
    addNote(state, payload) {
        state.notes.unshift(payload.note)
    },
    updateNote(state, payload) {
        let note = state.notes.find(note => note.id === payload.id) || {}
        note.title = payload.title
        note.content = payload.content
    },
    deleteNote(state, payload) {
        state.notes = state.notes.filter(note => note.id !== payload.noteId)
    },
    setCurrentNote(state,payload = {}){
        state.currentNoteId = payload.currentNoteId
    }
}
const actions = {
    getNotes({commit}, {notebookId}) {
        return notes.getNote({notebookId}).then(res => {
            commit('setNote', {notes: res.data})
        })
    },
    addNote({commit}, {notebookId, title, content}) {
        return notes.addNote({notebookId}, {title: '新建标题', content}).then(res => {
            commit('addNote', {note: res.data})
        })
    },
    updateNote({commit}, {noteId, title, content}) {
        return notes.updateNote({noteId}, {title, content}).then(res => {
            commit('updateNote', {noteId, title, content})
        })
    },
    deleteNote({commit}, {noteId}) {
        return notes.deleteNote({noteId}).then(res => {
            commit('deleteNote', {noteId})
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}