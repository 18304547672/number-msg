import request from '@/utils/request.js'

export default {
   
    getPaginationData(page,size,searchMap){
        var req = request({
            method:"post",
            url:`/supplier/list/search/${page}/${size}`,
            data:{
                searchMap
            }
        })
        return req
    },
    addData(pojo){
        return request({
            method:"post",
            url:"/supplier",
            data:{
                pojo
            }
        })
    },
    getByIdData(id){
        return request({
            url:`/supplier/${id}`,
            method:"get"
        })
    },
    putByIdData(pojo){
        return request({
            url:`/supplier/${pojo.id}`,
            method:"put",
            data:{
                pojo
            }
        })
    },
    deleteMember(id){
        return request({
            url:`/supplier/${id}`,
            method:"delete"
        })
    }
}