import request from "@/utils/request"

export function getuserToken(username,password){
    const req = request({
        method:"post",
        url:"/user/login",
        data:{
            username,
            password
        }
    })
    return req
}

export function getInfo(token){
    const req = request({
        method:"get",
        url:`/user/info/${token}`,
    })
    return req
}