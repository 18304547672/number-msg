import axios from "axios"
import { Loading, Message } from 'element-ui'
const request = axios.create({
    baseURL:"/dev",
    timeout:5000
})

const loading = {
    laodingInstance:null,
    open:function () {
        if(this.laodingInstance == null){
            this.laodingInstance = Loading.service({
                text:"拼命加载中",
                target:".main",
                background:"rgba(0, 0, 0, 0.5)"
            })
        }
    },
    close(){
        if(this.laodingInstance !==null){
            this.laodingInstance.close()
        }
        this.laodingInstance = null;
        
    }
}
request.interceptors.request.use(config => {
    loading.open() // 打开加载效果
    return config
}, error => {
    // 出现异常
    loading.close() // 关闭加载效果
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
    loading.close() // 关闭加载效果
    if(response.data.code !== 2000){
        Message({
            type:"warning",
            message:response.data.message,
            duration:5*1000
        })
    }
    return response
}, error => {
    loading.close() // 关闭加载效果
    Message({
        type:"error",
        message:error.message,
        duration:5*1000
    })
    return Promise.reject(error);
})
export default request
