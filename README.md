# forliz

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### echarts引入的地图得低于5版本 高版本无中国地图

### 原生echarts非vue组件风格、需要事先准备dom、无响应式系统，所以封装一下
### 可用第三方封装好的Vue-Echarts>>>https://github.com/ecomfe/vue-echarts或者自己封装echarts组件

### 以后给组件里引入插件时，注意name不要声明为插件名 淦 尤其是swiper插件...