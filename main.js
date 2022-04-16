import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入 vues
import store from './store/index.js'
import Echearts from './plugins/echarts'

// import "../node_modules/echarts/map/js/china.js" //一定要引入中国地图
import "../node_modules/echarts/map/js/province/shanghai.js"
import shanghai from "../node_modules/echarts/map/json/province/shanghai.json" //一定要引入上海地图  巴拉巴拉地图太多了
import echarts from 'echarts'
echarts.registerMap('shanghai', shanghai)
    // 插件 Element-ui
Vue.use(ElementUI)
Vue.use(Echearts)
    // 导入全局初始化样式
import './assets/index.css'

import "./assets/common.css"



Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')