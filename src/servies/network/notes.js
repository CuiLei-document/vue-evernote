import {request} from '../request'
import {beautify} from "@/servies/util";

const URL = {
    getNote: '/notes/from',
    addNote: '/notes/to',
    deleteNote: '/notes',
    updateNote: '/notes'
}

export default {
    getNote({notebookId}) {
        return new Promise((resolve, reject) => {
            request(`${URL.getNote}/${notebookId}`, 'get').then(res => {
                res.data.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
                res.data.forEach(note => {
                    note.time = beautify(note.createdAt)
                    return note
                })
                resolve(res)
            })
        })
    },
    addNote({notebookId}, {title = '', content = ''} = {title: '新建标题', content: ''}) {
        return new Promise((resolve,reject)=>{
            request(`${URL.addNote}/${notebookId}`, 'POST', {title, content}).then(res=>{
                res.data.time = beautify(res.data.createdAt)
                res.data.updateTime = beautify(res.data.updatedAt)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    deleteNote({noteId}) {
        return request(`${URL.deleteNote}/${noteId}`, 'delete')
    },
    updateNote({noteId}, {title = '', content = ''} = {title: '', content: ''}) {
        return request(`${URL.updateNote}/${noteId}`, 'patch', {title, content})
    }
}