import notebooks from "@/servies/network/notebooks";

const state = {
    notebooks: null,
    currentBookId: null
}
const getters = {
    notebooks(state) {
        return state.notebooks || []
    },
    currentBook(state) {
        if (!Array.isArray(state.notebooks)) return {}
        if (!state.currentBookId) return state.notebooks[0] || {}
        return state.notebooks.find(notebook => notebook.id.toString() === state.currentBookId.toString()) || {}
    }
}
const mutations = {
    setNotebooks(state, payload) {
        state.notebooks = payload.notebooks
    },
    addNotebook(state, payload) {
        state.notebooks.unshift(payload.notebooks)
    },
    deleteNotebook(state, payload) {
        state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
    },
    updateNotebook(state, payload) {
        let notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {}
        notebook.title = payload.title
    },
    setCurrentBook(state, payload) {
        state.currentBookId = payload.currentBookId
    }
}
const actions = {
    getNotebooks({commit, state}) {
        if (state.notebooks !== null) return Promise.resolve()
        return notebooks.getAll().then(res => {
            commit('setNotebooks', {notebooks: res.data})
        })
    },
    addNotebook({commit}, payload) {
        return notebooks.addBook({title: payload.title}).then(res => {
            commit('addNotebook', {notebooks: res.data})
        })
    },
    deleteNotebook({commit}, payload) {
        return notebooks.deleteBook(payload.notebookId).then(res => {
            commit('deleteNotebook', {notebookId: payload.notebookId})
        })
    },
    updateNotebook({commit}, payload) {
        return notebooks.updateBook(payload.notebookId, {title: payload.title}).then(res => {
            commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}