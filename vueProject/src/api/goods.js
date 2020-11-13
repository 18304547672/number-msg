import request from '@/utils/request.js'

export default {
   
    getPaginationData(page,size,searchMap){
        var req = request({
            method:"post",
            url:`/goods/list/search/${page}/${size}`,
            data:{
                searchMap
            }
        })
        return req
    },
    addData(pojo){
        return request({
            method:"post",
            url:"/goods",
            data:{
                pojo
            }
        })
    },
    getByIdData(id){
        return request({
            url:`/goods/${id}`,
            method:"get"
        })
    },
    putByIdData(pojo){
        return request({
            url:`/goods/${pojo.id}`,
            method:"put",
            data:{
                pojo
            }
        })
    },
    deleteMember(id){
        return request({
            url:`/goods/${id}`,
            method:"delete"
        })
    }
}