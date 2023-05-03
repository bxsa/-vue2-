import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
//封装游客身份模块uuid----生成一个随机字符串（不能变化）;
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfo:{},
  //游客临时身份
  uuid_token:getUUID(),
 
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    //对应actions里的result.data;
    state.goodInfo = goodInfo;
  },

};
const actions = {
  async getGoodInfo({ commit },id) {
    let result = await reqGoodsInfo(id);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //因为仓库中没有返回其他数据，所以不需要仓库的三连环操作。
  async addOrUpdateShopCart({ commit },{skuId,skuNum}){
    let result= await reqAddOrUpdateShopCart(skuId,skuNum);
    console.log(result);
    //代表服务器加入购物车成功
    if(result.code==200){
      return 'ok';
    }else{//代表服务器加入购物车失败
      return Promise.reject(new Error('faile'));
    }
  }
};
// getters简化数据
const getters = {
  categoryView(state) {
    //路径导航简化的数据
    //比如state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    //简化产品信息的数据
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    //产品售卖属性的简化
    return state.goodInfo.spuSaleAttrList || [];
  },
  
};
export default {
  state,
  mutations,
  actions,
  getters,
};
