import request from '@/utils/request.js'

export default {
    getPwd(id,pwd){
        return request({
            url:"/user/pwd",
            method:"post",
            data:{
                id,
                pwd
            }
        })
    },
    getEditPwd(id,pwd){
        return request({
            url:"/user/pwd",
            method:"put",
            data:{
                id,
                pwd
            }
        })
    }
}