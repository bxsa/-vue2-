import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from "./shopCart";
import trade from './trade'
import user from './user';
export default new Vuex.Store({
    modules:{
    home,
    search,
    detail,
    shopCart,
    user,
    trade
    }
})  