import {request} from '../request'

const URL = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth'
}

const auth =  {
    register(username, password) {
        return request(URL.REGISTER, 'post' , {username, password})
    },
    login(username, password) {
        return request(URL.LOGIN, 'post', {username, password})
    },
    logout() {
        return request(URL.LOGOUT)
    },
    getInfo() {
        return request(URL.GET_INFO)
    }
}
export default auth
