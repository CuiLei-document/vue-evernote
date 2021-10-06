import {request} from '../request'
import {beautify} from '@/servies/util'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks',
    DELETE: '/notebooks'
}
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
                res.data = res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
                res.data.forEach(note => {
                    note.times = beautify(note.createdAt)
                })
                resolve(res)
            })
        })
    },
    addBook({title = ''} = {title: ''}) {
        return request(URL.ADD, 'post', {title})
    },
    updateBook(notebookId, {title = ''} = {title: ''}) {
        return request(`${URL.UPDATE}/${notebookId}`, 'patch', {title})
    },
    deleteBook(notebookId) {
        return request(`${URL.DELETE}/${notebookId}`, 'delete')
    }
}