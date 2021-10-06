import {request} from '../request'
import {beautify} from '../util'

const URL = {
    GET: '/notes/trash',
    DELETE: '/notes/:noteId/confirm',
    REVERT: '/notes/:noteId/revert'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET, 'get').then(res => {
                res.data = res.data.sort((a, b) => a.createdAt - b.createdAt ? 1 : -1)
                res.data.forEach(note => {
                    note.createdAtBeautify = beautify(note.createdAt)
                    note.updatedAtBeautify = beautify(note.updatedAt)
                })
                resolve(res)
            })
        })
    },
    revertNote({noteId}) {
        return request(URL.REVERT.replace(':noteId',noteId),'PATCH')
    },
    deleteNote({noteId}) {
        return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
    }
}