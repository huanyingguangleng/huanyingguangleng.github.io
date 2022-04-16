import axios from "../utils/request";

const base = {
    baseUrl: "http://api.tianapi.com",
    ncov: "/ncov/index",
    // ncovCity: "/txapi/ncovcity/index",
    juheBaseUrl: "/api",
    springTravel: "/springTravel/citys",
    // 音乐接口文档
    musicBaseUrl: "https://autumnfish.cn",
    // musicBaseUrl: "https://netease-cloud-music-api-six-rust.vercel.app",
    // 发现音乐的轮播图
    banner: "/banner",
    // 发现音乐的推荐歌单
    recommendList: "/personalized",
    //发现音乐的最新音乐
    lastMusic: "/personalized/newsong",
    //发现音乐的播放音乐
    playMusic: "/song/url",
    //发现音乐的获取推荐的MV
    recommendMV: "/personalized/mv",
    //推荐歌单的精品歌单头部
    recommendHighQualityList: "/top/playlist/highquality",
    //推荐歌单的精品歌单头部下面标签列表
    recommendHighQualityListTags: "/top/playlist",
    //最新音乐路由的那一坨
    latestSong: "/top/song",
    //最新MV
    latestMV: "/mv/all",
    //搜索歌曲、歌单、mv
    searchThings: "/search",
    //搜索歌单详情页
    searchPlayListDetail: "/playlist/detail",
    //搜索歌单详情页的评论
    searchPlayListDetailComment: "/comment/playlist",
    //mv详情页
    mvDetail: "/mv/url",
    //mv详情页的相关mv
    mvDetailRelativeMV: "/simi/mv",
    //mv详情页的mv信息巴拉巴拉
    mvDetailMVInfo: "/mv/detail",
    //mv详情页的歌手信息
    mvDetailSingerInfo: "/artists",
    //mv详情页的评论    id: mvid
    mvDetailComment: "/comment/mv",
    //热搜列表
    searchHotDetail: "/search/hot/detail",
    //搜索建议
    searchSuggest: "/search/suggest",
    //省市疫情baseUrl
    pandemicBaseUrl: "https://vyps.api.storeapi.net",
    //国内城市疫情
    chinaCityPandemic: "/api/94/221",
}

const api = {
    /**抗击疫情 */
    getNcov(params) {
        return axios.get(base.baseUrl + base.ncov, {
            params
        })
    },
    // // 省市疫情
    // getNcovCity(params) {
    //     return axios.get(base.baseUrl + base.ncovCity, {
    //         params
    //     })
    // },
    // 各地政策
    springTravel(params) {
        return axios.get(base.juheBaseUrl + base.springTravel, {
            params
        })
    },
    // 获取发现音乐轮播图
    getBanner(params) {
        return axios.get(base.musicBaseUrl + base.banner, {
            params
        })
    },
    // 获取推荐歌单
    getRecommendList(params) {
        return axios.get(base.musicBaseUrl + base.recommendList, {
            params
        })
    },
    // 获取发现的最新音乐
    getLastMusic(params) {
        return axios.get(base.musicBaseUrl + base.lastMusic, {
            params
        })
    },
    // 获取播放音乐
    getPlayMusic(params) {
        return axios.get(base.musicBaseUrl + base.playMusic, {
            params
        })
    },
    //获取推荐的MV
    getRecommendMV(params) {
        return axios.get(base.musicBaseUrl + base.recommendMV, {
            params
        })
    },
    //获取推荐歌单的精品歌单头部
    getRecommendHighQualityList(params) {
        return axios.get(base.musicBaseUrl + base.recommendHighQualityList, {
            params
        })
    },
    //获取推荐歌单的精品歌单头部下面标签列表
    getRecommendHighQualityListTags(params) {
        return axios.get(base.musicBaseUrl + base.recommendHighQualityListTags, {
            params
        })
    },
    //获取最新音乐路由的那一坨
    getLastSong(params) {
        return axios.get(base.musicBaseUrl + base.latestSong, {
            params
        })
    },
    //获取最新MV
    getLastMV(params) {
        return axios.get(base.musicBaseUrl + base.latestMV, {
            params
        })
    },
    //获取搜索歌曲、歌单、mv(自己带参数type|歌曲:1、歌单:1000、mv:1004)必选参数keywords(搜索的关键词)
    getSearchThings(params) {
        return axios.get(base.musicBaseUrl + base.searchThings, {
            params
        })
    },
    //获取搜索歌单详情页
    getSearchPlayListDetail(params) {
        return axios.get(base.musicBaseUrl + base.searchPlayListDetail, {
            params
        })
    },
    //获取搜索歌单详情页的评论
    getSearchPlayListDetailComment(params) {
        return axios.get(base.musicBaseUrl + base.searchPlayListDetailComment, {
            params
        })
    },
    //获取mv详情页
    getMvDetail(params) {
        return axios.get(base.musicBaseUrl + base.mvDetail, {
            params
        })
    },
    //获取mv详情页的相关mv
    getMvDetailRelativeMV(params) {
        return axios.get(base.musicBaseUrl + base.mvDetailRelativeMV, {
            params
        })
    },
    //获取mv详情页的mv信息巴拉巴拉
    getMvDetailMVInfo(params) {
        return axios.get(base.musicBaseUrl + base.mvDetailMVInfo, {
            params
        })
    },
    //获取mv详情页的歌手信息 
    getMvDetailSingerInfo(params) {
        return axios.get(base.musicBaseUrl + base.mvDetailSingerInfo, {
            params
        })
    },
    //获取mv详情页的评论    id: mvid
    getMvDetailComment(params) {
        return axios.get(base.musicBaseUrl + base.mvDetailComment, {
            params
        })
    },
    //获取热搜列表
    getSearchHotDetail(params) {
        return axios.get(base.musicBaseUrl + base.searchHotDetail, {
            params
        })
    },
    //获取搜索建议
    getSearchSuggest(params) {
        return axios.get(base.musicBaseUrl + base.searchSuggest, {
            params
        })
    },
    //获取国内省市疫情
    getShanghaiCityPandemic(params) {
        return axios.get(" https://vyps.api.storeapi.net/api/94/221?format=json&appid=16164&city_name=%E4%B8%8A%E6%B5%B7&sign=be70f5536861d8507806980708facdb3", {
            params
        })
    },
}
export default api;