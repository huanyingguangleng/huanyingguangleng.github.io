// vue插件 自己封装的echarts
// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
// MyPlugin.install = function (Vue, options) {
//   // 1. 添加全局方法或 property
//   Vue.myGlobalMethod = function () {
//     // 逻辑...
//   }

//   // 2. 添加全局资源
//   Vue.directive('my-directive', {
//     bind (el, binding, vnode, oldVnode) {
//       // 逻辑...
//     }
//     ...
//   })

//   // 3. 注入组件选项
//   Vue.mixin({
//     created: function () {
//       // 逻辑...
//     }
//     ...
//   })

//   // 4. 添加实例方法
//   Vue.prototype.$myMethod = function (methodOptions) {
//     // 逻辑...
//   }
// }

import echarts from 'echarts'
import shanghai from "../../node_modules/echarts/map/json/province/shanghai.json" //一定要引入上海地图  巴拉巴拉地图太多了
echarts.registerMap('shanghai', shanghai)
const install = function(Vue) {
    //defineProperties方法
    Object.defineProperties(Vue.prototype, {
        $charts: {
            get() {
                return {
                    // line: function(id) {
                    //     var dom = document.getElementById(id);
                    //     var myChart = echarts.init(dom);
                    //     var option = {
                    //         xAxis: {
                    //             type: 'category',
                    //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    //         },
                    //         yAxis: {
                    //             type: 'value'
                    //         },
                    //         series: [{
                    //             data: [820, 932, 901, 934, 1290, 1330, 1320],
                    //             type: 'line',
                    //             smooth: true
                    //         }]
                    //     }
                    //     myChart.setOption(option);
                    // },
                    // chinaMap: function(id, data) {
                    //     var dom = document.getElementById(id);
                    //     var myChart = echarts.init(dom);
                    //     var option = {
                    //         tooltip: {
                    //             triggerOn: "click",
                    //             enterable: true,
                    //             formatter(data) {
                    //                 return "<a style='color:#fff' href='/#/city/" + data.name + "'><div><p>" + data.seriesName + ":" + data.name + "</p><p>现存确诊:" + data.value + "</p></div></a>"
                    //             }
                    //         },
                    //         visualMap: [{ //映射颜色值
                    //             type: 'piecewise', //分段
                    //             pieces: [ //配置颜色区间
                    //                 { min: 0, max: 0, color: '#FFFFFF' },
                    //                 { min: 1, max: 10, color: '#FFE4E1' },
                    //                 { min: 10, max: 100, color: '#FFC0CB' },
                    //                 { min: 100, max: 500, color: '#FFA07A' },
                    //                 { min: 500, max: 1000, color: '#FF7F50' }
                    //             ]
                    //         }],
                    //         series: [{
                    //             name: "省",
                    //             type: 'map',
                    //             map: "china",
                    //             roam: false, //自动缩放
                    //             zoom: 1.2, //缩放比例
                    //             label: { //配置字体
                    //                 normal: {
                    //                     show: true, //显示名字
                    //                     textStyle: {
                    //                         fontSize: 8
                    //                     }
                    //                 }
                    //             },
                    //             itemStyle: {
                    //                 normal: {
                    //                     areaColor: 'rgba(0,255,236,0)',
                    //                     borderColor: 'rgba(0,0,0,0.2)',
                    //                 },
                    //                 emphasis: {
                    //                     areaColor: 'rgba(255,180,0,0.8)',
                    //                     shadowOffsetX: 0,
                    //                     shadowOffsetY: 0,
                    //                     shadowBlur: 20,
                    //                     borderWidth: 0,
                    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //                 }
                    //             },
                    //             data: data
                    //                 // data:[
                    //                 //     {name:"北京",value:191,itemStyle:{ normal:{ areaColor:"#ff0000" } }},
                    //                 //     {name:"内蒙古",value:191,itemStyle:{ normal:{ areaColor:"#ff0000" } }}
                    //                 // ]
                    //         }]
                    //     }
                    //     myChart.setOption(option);
                    // },
                    provinceMap: function(id, data) {
                        var dom = document.getElementById(id);
                        var myChart = echarts.init(dom);
                        var option = {
                            tooltip: {
                                triggerOn: "click",
                                enterable: true,
                                formatter(data) {
                                    return "<div><p>" + data.seriesName + ":" + data.name + "</p><p>现存确诊:" + data.value + "</p></div>"
                                }
                            },
                            visualMap: {
                                type: 'continuous',
                                min: 0,
                                max: 10000,
                                text: ['High', 'Low'],
                                realtime: false,
                                calculable: true,
                                color: ['red', 'pink', 'orange', 'yellow']
                            },
                            // visualMap: [{ //映射颜色值
                            //     type: 'continuous', //分段
                            //     pieces: [ //配置颜色区间
                            //         { min: 0, max: 0, color: '#FFFFFF' },
                            //         { min: 1, max: 400, color: '#FFFFCC' },
                            //         { min: 400, max: 800, color: '#FFCCCC' },
                            //         { min: 800, max: 1200, color: '#FFCC99' },
                            //         { min: 1600, max: 2000, color: '#FFCC66' },
                            //         { min: 2400, max: 2800, color: '#FF9966' },
                            //         { min: 3200, max: 3600, color: '#FF6666' },
                            //         { min: 4000, max: 4400, color: '#FF6633' },
                            //         { min: 4800, max: 5200, color: '#FF3333' },
                            //         { min: 5600, max: 6000, color: '#FF0033' },
                            //         { min: 6400, max: 10000, color: '#FF0000' },
                            //     ]
                            // }],
                            series: [{
                                name: "区",
                                type: 'map',
                                map: "shanghai",
                                roam: false, //自动缩放
                                zoom: 1.2, //缩放比例
                                label: { //配置字体
                                    normal: {
                                        show: true, //显示名字
                                        textStyle: {
                                            fontSize: 8
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        areaColor: 'rgba(0,255,236,0)',
                                        borderColor: 'rgba(0,0,0,0.2)',
                                    },
                                    emphasis: {
                                        areaColor: 'white',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                        shadowBlur: 20,
                                        borderWidth: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                data: data
                                    // data:[
                                    //     {name:"北京",value:191,itemStyle:{ normal:{ areaColor:"#ff0000" } }},
                                    //     {name:"内蒙古",value:191,itemStyle:{ normal:{ areaColor:"#ff0000" } }}
                                    // ]
                            }]
                        }
                        myChart.setOption(option);
                    },
                    allPlayCount: function(id, data) {
                        var dom = document.getElementById(id);
                        var myChart = echarts.init(dom);
                        var option = {

                            xAxis: {
                                type: 'category',
                                data: ['歌曲播放次数', 'MV播放次数', '自行搜索次数', '搜索热搜次数']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: data,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(290, 220, 190, 0.2)'
                                }
                            }]

                        }
                        myChart.setOption(option);
                    },
                    allPlayPieChart: function(id, data) {
                        var dom = document.getElementById(id);
                        var myChart = echarts.init(dom);
                        var option = {
                            // backgroundColor: '#black',
                            backgroundColor: '#241c28',
                            title: {
                                text: 'MV音乐喜好分布',
                                left: 'center',
                                top: 20,
                                textStyle: {
                                    color: '#8e5ef5'
                                }
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            visualMap: {
                                show: true,
                                min: 100,
                                max: 500,
                                inRange: {
                                    colorLightness: [0.4, 1]
                                }
                            },
                            series: [{
                                name: 'Access From',
                                type: 'pie',
                                radius: '65%',
                                center: ['50%', '50%'],
                                data: data.sort(function(a, b) {
                                    return a.value - b.value;
                                }),
                                roseType: 'radius',
                                label: {
                                    color: 'rgba(255, 255, 255, 0.9)'
                                },
                                labelLine: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                },
                                itemStyle: {
                                    color: '#68a0ef',
                                    shadowBlur: 2,
                                    shadowColor: 'rgba(0, 0, 0, 1)'
                                },
                                animationType: 'scale',
                                animationEasing: 'elasticOut',
                                animationDelay: function(idx) {
                                    return Math.random() * 200;
                                }
                            }]
                        };
                        myChart.setOption(option);
                    }
                }
            }
        }
    })
}

export default install