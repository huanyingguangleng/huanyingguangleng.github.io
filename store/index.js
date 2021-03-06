import Vuex from 'vuex'
import Vue from 'vue'
// import api from '../axios/index.js'
Vue.use(Vuex)

const actions = {
    thisTimePlay(context, value) {
        context.commit('ThisTimePlay', value)
    },
    thisTimePlayMV(context, value) {
        context.commit('ThisTimePlayMV', value)
    },
    thisTimeSelfSearch(context, value) {
        context.commit('ThisTimeSelfSearch', value)
    },
    thisTimeHotSearch(context, value) {
        context.commit('ThisTimeHotSearch', value)
    },
    //=========================================================
    thisTimeMainland(context, value) {
        context.commit('ThisTimeMainland', value)
    },
    thisTimeHongKong(context, value) {
        context.commit('ThisTimeHongKong', value)
    },
    thisTimeEurope(context, value) {
        context.commit('ThisTimeEurope', value)
    },
    thisTimeJapan(context, value) {
        context.commit('ThisTimeJapan', value)
    },
    thisTimeKorea(context, value) {
        context.commit('ThisTimeKorea', value)
    },
};

const mutations = {
    ThisTimePlay(state, value) {
        state.thisTimePlayCount += value;
        console.log('song', state.thisTimePlayCount);
    },
    ThisTimePlayMV(state, value) {
        state.thisTimePlayMVCount += value;
        console.log('MV', state.thisTimePlayMVCount);
    },
    ThisTimeSelfSearch(state, value) {
        state.thisTimeSelfSearchCount += value;
        console.log('search', state.thisTimeSelfSearchCount);
    },
    ThisTimeHotSearch(state, value) {
        state.thisTimeHotSearchCount += value;
        console.log('hot', state.thisTimeHotSearchCount);
    },
    //=========================================================
    ThisTimeMainland(state, value) {
        state.thisTimeMainlandCount += value;
        console.log('mainland', state.thisTimeMainlandCount);
    },
    ThisTimeHongKong(state, value) {
        state.thisTimeHongKongCount += value;
        console.log('hongkong', state.thisTimeHongKongCount);
    },
    ThisTimeEurope(state, value) {
        state.thisTimeEuropeCount += value;
        console.log('europe', state.thisTimeEuropeCount);
    },
    ThisTimeJapan(state, value) {
        state.thisTimeJapanCount += value;
        console.log('japan', state.thisTimeJapanCount);
    },
    ThisTimeKorea(state, value) {
        state.thisTimeKoreaCount += value;
        console.log('korea', state.thisTimeKoreaCount);
    },

};

const state = {
    discov: '????????????',
    reco: '????????????',
    lastestMusi: '????????????',
    lastestMv: '??????MV',
    dataVisual: '???????????????',
    //????????????????????????
    thisTimePlayCount: 0,
    //??????MV?????????
    thisTimePlayMVCount: 0,
    //??????????????????
    thisTimeSelfSearchCount: 0,
    //??????????????????
    thisTimeHotSearchCount: 0,
    //????????????/MV
    thisTimeMainlandCount: 0,
    //????????????/MV
    thisTimeHongKongCount: 0,
    //????????????/MV
    thisTimeEuropeCount: 0,
    //????????????/MV
    thisTimeJapanCount: 0,
    //????????????/MV
    thisTimeKoreaCount: 0,
};

const getters = {};

const store = new Vuex.Store({
    actions: actions,
    mutations: mutations,
    state: state,
    getters: getters,
});

export default store;