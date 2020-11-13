import request from '@/utils/request'

export default {
    logTrueOut(token) {
        var req = request({
            method:"post",
            url:"/user/logout",
            data:{
                token
            }
        })
        return req
    }

}