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
    discov: '发现音乐',
    reco: '推荐歌单',
    lastestMusi: '最新音乐',
    lastestMv: '最新MV',
    dataVisual: '数据可视化',
    //播放器播放总次数
    thisTimePlayCount: 0,
    //播放MV总次数
    thisTimePlayMVCount: 0,
    //自行搜索次数
    thisTimeSelfSearchCount: 0,
    //搜索热搜次数
    thisTimeHotSearchCount: 0,
    //内地音乐/MV
    thisTimeMainlandCount: 0,
    //港台音乐/MV
    thisTimeHongKongCount: 0,
    //欧美音乐/MV
    thisTimeEuropeCount: 0,
    //日本音乐/MV
    thisTimeJapanCount: 0,
    //韩国音乐/MV
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