import request from '@/utils/request.js'

export default {
    getMemberData(){
        var req = request({
            method:"get",
            url:'/member/list',
        })
        return req
    },
    getPaginationData(page,size,searchMap){
        var req = request({
            method:"post",
            url:`/member/list/search/${page}/${size}`,
            data:{
                searchMap
            }
        })
        return req
    },
    addData(pojo){
        return request({
            method:"post",
            url:"/member",
            data:{
                pojo
            }
        })
    },
    getByIdData(id){
        return request({
            url:`/member/${id}`,
            method:"get"
        })
    },
    putByIdData(pojo){
        return request({
            url:`/member/${pojo.id}`,
            method:"put",
            data:{
                pojo
            }
        })
    },
    deleteMember(id){
        return request({
            url:`/member/${id}`,
            method:"delete"
        })
    }
}