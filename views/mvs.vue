<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{active:area=='全部'}" @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='内地'}" @click="area='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='港台'}" @click="area='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='日本'}" @click="area='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span :class="['title',{active:type=='全部'}]" @click="type='全部'">全部</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:type=='官方版'}]" @click="type='官方版'">官方版</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:type=='原声'}]" @click="type='原声'">原声</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:type=='现场版'}]" @click="type='现场版'">现场版</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:type=='网易出品'}]" @click="type='网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span :class="['title',{active:order=='上升最快'}]" @click="order='上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:order=='最热'}]" @click="order='最热'">最热</span>
          </li>
          <li class="tab">
            <span :class="['title',{active:order=='最新'}]" @click="order='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" @click="toMv(item.id)" v-for="(item,index) in mvList" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount | abbreviatedPlayCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
       
      </div>
      <!-- 分页器 -->
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination> -->

<el-pagination
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      
      :current-page="page"
      
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    </div>
  </div>
</template>

<script>
import api from '../axios/index.js'
export default {
  name: 'mvs',
  data() {
    return {
        mvList:[],
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 8,  
// area: 地区,可选值为：全部、内地、港台、欧美、日本、韩国、不填则为全部 
// type: 类型,可选值为：全部、官方版、原生、现场版、网易出品,不填则为全部
// order: 排序,可选值为：上升最快、最热、最新、不填则为上升最快
// limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址:  https://autumnfish.cn/mv/all
        area:'全部',
        type:'全部',
         order:'上升最快',
    };
  },
  filters: {
    // 时间戳转换
    abbreviatedPlayCount(count) {
      if(count > 100000) {
        return (count / 10000).toFixed(1) + '万';
      } else {
        return count;
      }
    }
  },
  watch: {
    area(newVal, oldVal) {
        this.page = 1;
      this.getMethodLastMV();
    },
    type(newVal, oldVal) {
        this.page =1;
      this.getMethodLastMV();
    },
    order(newVal, oldVal) {
        this.page =1;
      this.getMethodLastMV();
    }
  },
  created() {
       this.getMethodLastMV();
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
      console.log(this.area);
      if(this.area=='内地'){
          let thisTimeMV1 = 1;
          this.$store.dispatch('thisTimeMainland', thisTimeMV1);
      };
      if(this.area=='港台'){
          let thisTimeMV2 = 1;
          this.$store.dispatch('thisTimeHongKong', thisTimeMV2);
                    console.log(6667);

      };
      if(this.area=='欧美'){
          let thisTimeMV3 = 1;
          this.$store.dispatch('thisTimeEurope', thisTimeMV3);
      };
      if(this.area=='日本'){
          let thisTimeMV4 = 1;
          this.$store.dispatch('thisTimeJapan', thisTimeMV4);
      };
      if(this.area=='韩国'){
          let thisTimeMV5 = 1;
          this.$store.dispatch('thisTimeKorea', thisTimeMV5);
      };
      let thisTimeMV = 1;
      this.$store.dispatch('thisTimePlayMV', thisTimeMV);
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
        this.page = val;
        this.getMethodLastMV();
        },

    getMethodLastMV(){
        //偏移值offset用于分页 起始值为（页码-1）*每页限制limit
      api.getLastMV({area:this.area,type:this.type,order:this.order,limit:this.limit,offset:(this.page-1)*this.limit}).then(res => {
        console.log(res);
        this.mvList=res.data.data;
        //  接口有bug，没有返回总条数，所以暂时用这个方法获取总条数
        if(res.data.count){
            this.total=res.data.count;
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  
};
</script>

<style scoped>
        .mvs-container{
            position: relative;
        }
        div.el-pagination {
        position: relative;
    }

</style>
