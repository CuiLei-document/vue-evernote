import auth from '@/servies/network/api'
import router from '@/router'
const state = {
    user: null
}
const getters = {
    username: state => state.user === null ? '未登录' : state.user.username,
    slug: state => state.user === null ? '未' : state.user.username[0].toUpperCase()
}
const mutations = {
    setUser(state, payload) {
        state.user = payload.user
    }
}
const actions = {
    loginUser({commit,state}, {username, password}) {
        if(state.user !== null) return Promise.resolve()
        return auth.login(username, password).then(res => {
            commit('setUser', {user:res.data})
        })
    },
    registerUser({commit}, {username, password}) {
        return auth.register(username, password).then(res => {
            commit('setUser', {user:res.data})
        })
    },
    checkUser({commit},url){
        return auth.getInfo().then(res=>{
            if(!res.isLogin){
                router.push(url)
            }else{
                commit('setUser',{user:res.data})
            }
        })
    },
    logoutUser({commit}){
        return auth.logout().then(res=>{
            commit('setUser',{user:null})
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}