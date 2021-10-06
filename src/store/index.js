import Vue from 'vue'
import Vuex from 'vuex'
import notebooks from './modules/notebook'
import notes from './modules/note'
import user from './modules/user'
import trash from './modules/trash'
Vue.use(Vuex)

const store = new Vuex.Store({
    store:{},
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        notebooks,
        notes,
        user,
        trash
    }
})

export default store