import { reqCartList, reqDeletCartList , reqUpdateCheckedById} from "@/api";
const actions = {
  //获取购物车的列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车的数据
  async  deletCartList({commit},skuId){
    let result= await reqDeletCartList(skuId) ;
    if(result.code==200){
        return 'ok';
    }else{
       return  Promise.reject(new Error('faile'));
    }
  },
  //修改购物车里判断多选框里的ischecked数据
  async   updateCheckedById({commit},{skuId,isChecked}){
    let result=await reqUpdateCheckedById(skuId,isChecked);
    if(result.code==200){
      return 'ok';
    }else{
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({dispatch,getters}){
    //context:小仓库，commit【提交mutations修改state】，getters【计算属性】，dispatch【派发action】,state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let PromiseAll=[];
    getters.cartList.cartInfoList.forEach(item=>{
     //isChecked等于1删除，不等于1不删除 
   let promise=item.isChecked==1?dispatch('deletCartList',item.skuId):'';
     //将每一个返回的promise添加到数组当中
     PromiseAll.push(promise);
    });
    //
    return Promise.all(PromiseAll);
 },
 //修改全部产品的选中状态
 updateCheckedIsChecked({dispatch,state},isChecked){
  let PromiseAll=[];
  state.cartList[0].cartInfoList.forEach(item=>{
    let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
    PromiseAll.push(promise);
  });
  return Promise.all(PromiseAll);
 }
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const state = {
  cartList: [],
};
const getters = {
  cartList(state) {
    //需要用到的是第零项数据
    return state.cartList[0] || {};
  },
};
export default {
  actions,
  mutations,
  state,
  getters,
};
