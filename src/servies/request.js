import axios from 'axios'

axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
axios.defaults.timeout = 3000
axios.defaults.withCredentials = true

export function request(url,type ='GET',data ={}){
    return new Promise((resolve,reject)=>{
        let options = {
            url,
            method:type,
            validateStatus(status){
                return (status >=200 && status < 300) || status === 400
            }
        }
        if(type.toLowerCase() === 'get'){
            options.props = data
        }else{
            options.data = data
        }
        axios(options).then(res=>{
            if(res.status === 200){
                resolve(res.data)
            }else{
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err=>{
            console.error({msg:'获取数据失败'})
            reject({msg:'网络获取失败'})
        })
    })
}