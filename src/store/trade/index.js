import {reqAddressInfo,reqOrderInfo}  from  '@/api';
const actions={
   async  getAddressInfo({commit}){
           let result= await reqAddressInfo();
           console.log(result,'trade派发address')
           if(result.code==200){
            commit('GETADDRESSINFO',result.data);
           }
    },
    async getOrderInfo({commit}){
        let result= await reqOrderInfo();
        console.log(result,'trade派发orderinfo')
        if(result.code==200){
            commit('GETORDERINFO',result.data);
        }
    } 
}
const mutations={
     GETADDRESSINFO(state,addressinfo){
         state.addressinfo=addressinfo;
     },
     GETORDERINFO(state,orderinfo){
         state.orderinfo=orderinfo;
     }
}
const state={
 addressinfo:[],
 orderinfo:{},
}
const getters={

}
export default {
    actions,
    mutations,
    state,
    getters,
}