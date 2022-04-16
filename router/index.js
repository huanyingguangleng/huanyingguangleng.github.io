import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由整合
Vue.use(VueRouter)

// //获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
//     //修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }


// 导入对应的路由

import discovery from '../views/discovery.vue'
import playlists from '../views/playlists.vue'
import songs from '../views/songs.vue'
import mvs from '../views/mvs.vue'
import result from '../views/result.vue'
import playlist from '../views/playlist.vue'
import mv from '../views/mv.vue'
import Home from '../views/Home.vue'
import Pandemic from '../pages/Pandemic.vue'
import VisibleMusic from '../pages/VisibleMusic.vue'

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/discovery',
        },
        {
            // 发现音乐
            path: '/discovery',
            component: discovery,
        },
        {
            // 推荐歌单
            path: '/playlists',
            component: playlists,
        },
        {
            // 进入推荐歌单里
            path: '/playlist',
            component: playlist,
        },
        {
            // 最新音乐
            path: '/songs',
            component: songs,
        },
        {
            // MV
            path: '/mvs',
            component: mvs,
        },

        {
            //MV详情
            path: '/mv',
            component: mv,
        },

        {
            //搜索结果
            path: '/result',
            component: result,
        },
        {
            //数据可视化
            path: '/Home',
            component: Home,
            meta: {
                keepAlive: true
            },
            children: [{
                    path: '/',
                    redirect: 'Pandemic'
                },
                {
                    name: 'shanghai',
                    path: 'Pandemic',
                    component: Pandemic,
                    meta: {
                        keepAlive: true
                    },
                },
                {
                    name: 'musicdata',
                    path: 'VisibleMusic',
                    component: VisibleMusic,
                }
            ],
        },
    ],
})

export default router