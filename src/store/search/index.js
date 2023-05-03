import { reqGetSearchInfo } from "@/api";
const actions={
    //获取serach数据
    async getSearchList({commit},params){
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result =await reqGetSearchInfo(params);
        if(result.code == 200){
            commit ("GETSEARCHLIST",result.data);
        }
    }
};
const mutations={
        //获取search的数据
   GETSEARCHLIST(state,searchList){
    state.searchList=searchList;
   }
};
const state={
    searchList:{},

};
//计算属性
const getters={
//    加个空数组的原因，避免没网的情况下，读取的state里的searchList是个undefined。
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    }


};
export default{
    actions,
    mutations,
    state,
    getters,
}