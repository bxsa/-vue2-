import {reqCategoryList} from "@/api";
import { reqGetBannerList} from "@/api";
import {reqFloorList}      from "@/api";
import {reqGetSearchInfo} from "@/api";
const  actions={
    //   三级联动数据
    async categoryList({commit}){
        let result =await reqCategoryList();
        if(result.code == 200){
            commit('CATEGORYLIST',result.data);
        }
    },
    // 轮播图的数据
    async GetBannerList({commit}){
        let result= await reqGetBannerList();
        if( result.code == 200){
            commit('GETBANNERLIST',result.data);//
        }
    },
    //floor组件的数据
    async  Floorlist({commit}){
        let result=await reqFloorList();
        if(result.code == 200){
            commit('FLOORLIST',result.data);
        }
    },
    //获取seach的数据
 
};
const state={
    categoryList: [],
    getbannerList:[],
    floorList:[],
};
const  mutations={
    //存储三级联动菜单的数据
    CATEGORYLIST(state,categoryList){//传递的categoryList为actions里commit里的result.data.
         state.categoryList = categoryList;
   },
   //存储轮播图的数据
   GETBANNERLIST(state,getbannerList){
        state.getbannerList = getbannerList;
   },
   //存储floor组件数据
   FLOORLIST(state,floorList){
    state.floorList =floorList;
   },
  
};

const getters={
}
export default{
    state,
    mutations,
    actions,
    getters,
}