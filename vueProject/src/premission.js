import router from './router.js'
import {getInfo} from '@/api/login.js'
import store from '@/store'
router.beforeEach((to,from,next)=>{
    const token = store.state.user.token;
    if(!token){
        if(to.path !== "/login"){
            next({path:'/login'})
        }else{
            next()  
        }
    }else{
        const user = store.state.user.user
        if(!user){
            if(to.path=='/login'){
                next()
            }else{
                store.dispatch('GetUserInfo').then(response =>{
                    if(response.flag){
                        next()
                    }else{
                        next({path:"/login"})
                    }
                })
            }
        }else{
            next()
        }
    }
})