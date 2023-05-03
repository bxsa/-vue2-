//登入与注册的仓库
import {reqGetCode,reqUserRegister,reqLogin,reqUserInfo,reqlogout} from '@/api';
const actions={
    //获取验证码
   async  getCode({commit},phone){
     let result= await reqGetCode(phone);
     console.log(result.data);
     if(result.code==200){
        commit('GETCODE',result.data);
     }
   },
   //用户注册
   async UserRegister({commit},user){
    let result =await reqUserRegister(user);
    console.log(result);
    if(result.code==200){
         return 'ok';
    }else{
        return Promise.reject(new Error('faile'));
    }
   },
   //登录业务
   async userLogin({commit},data){
    let result=await reqLogin(data);
    console.log(result);
    //服务器下发的token是用户的唯一标识符。
    if(result.code==200){
        commit('USERLOGIN',result.data.token);
        //持久化token，将其存储在本地存储中。
        localStorage.setItem('TOKEN',result.data.token);
        return 'ok';
    }else{
        return Promise.reject(new Error('faile'));
    }
   },
   //获取用户信息
   async getUserInfo({commit}){
        let result=await reqUserInfo();
        console.log(result,'userinfo');
        if(result.code==200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }
   },
   //退出登入
   async  userlogout({commit}){
    //只是想服务器发起一次请求，通知服务器清楚token
       let result=await reqlogout();
       if(result.code==200){
        commit('CLEARUSERINFO');
       }
   }
}
const mutations={
     GETCODE(state,code){
       state.code=code;
     },
     USERLOGIN(state,token){
        state.token=token;
     },
     GETUSERINFO(state,data){
        state.userinfo=data
     },
     //清楚user数据
     CLEARUSERINFO(state){
        state.token='';
        state.userinfo={};
        localStorage.removeItem('TOKEN');
     }
}
const state={
   code:'',
   token: localStorage.getItem('TOKEN'),//没存就显示 ''，存了就会得到token值，达到持久化目的
   userinfo:{},
}
const getters={
 
}
export  default{
    actions,
    mutations,
    state,
    getters,
}