import Trash from '@/servies/network/trash'
const state = {
    trashNotes:null,
    currentTrashId:null
}
const getters = {
    trashNotes: state => state.trashNotes || [],
    currentTrash(state,getters){
        if(!state.currentTrashId) return getters.trashNotes[0] || {}
        return state.trashNotes.find(note => note.id.toString() === state.currentTrashId.toString()) || {}
    },
    bookTo(state,getters,rootState,rootGetters){
        console.log('rootState',rootState)
        console.log('rootGetters',rootGetters)
        let notebook =  rootGetters.notebooks.find(note => note.id === getters.currentTrash.notebookId) || {}
        return notebook.title || ''
    }
}
const mutations = {
    setTrashNote(state,payload){
        state.trashNotes = payload.trashNotes
        console.log(state.trashNotes)
    },
    addTrashNote(){},
    deleteTrashNote(state,payload){
        state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
        console.log(state.trashNotes)
    },
    setCurrentTrash(state,payload = {}){
        state.currentTrashId = payload.noteId
    }
}
const actions = {
    getTrashNote({commit}){
        return Trash.getAll().then(res=>{
            commit('setTrashNote',{trashNotes:res.data})
        })
    },
    revertTrashNote({commit},{noteId}){
        return Trash.revertNote({noteId}).then(res=>{
            commit('deleteTrashNote',{noteId})
        })
    },
    deleteTrashNote({commit},{noteId}){
        return Trash.deleteNote({noteId}).then(res=>{
            commit('deleteTrashNote',{noteId})
        })
    }
}

export default {
    state, getters, mutations, actions
}