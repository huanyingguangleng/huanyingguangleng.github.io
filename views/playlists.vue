<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
          <!-- 封面啊 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
            {{topList.name}}
        </div>
        <div class="info">
           {{topList.description}}
        </div>
      </div>
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span :class="['item', {active:selected === indiv}]" v-for="(indiv,index) in category" :key="index" @click="selected=indiv">{{indiv}}</span>
        <!-- <span class="item">欧美</span>
       <span class="item">华语</span>
        <span class="item">流行</span>
        <span class="item">说唱</span>
        <span class="item">摇滚</span>
        <span class="item">民谣</span>
        <span class="item">电子</span>
        <span class="item">轻音乐</span>
        <span class="item">影视原声</span>
        <span class="item">ACG</span>
        <span class="item">怀旧</span>
        <span class="item">治愈</span>
        <span class="item">旅行</span>  -->
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in belowList" :key="index" @click="toPlayListDetail(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
          
        </div>
      </div>
    </div>
    <!-- 
      分页器
      total 总条数
      current-page  当前页
      page-size 每页多少条数据
      @current-change页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      :current-page="page"
      
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from '../axios/index.js'
export default {
  name: 'recommend',
  data() {
    return {
      // 总条数
      total:0,
      // 页码
      page:1,
      // 每页多少条数据
      size:10,
      //顶部推荐的那一坨
      topList:{},
      //下面那一坨
      belowList:[],
        // 分类
        category: [ '全部','欧美','华语', '流行','说唱','摇滚','民谣',
        '电子','轻音乐','影视原声','ACG','怀旧','治愈','旅行'] ,
        //当前选择的tag标签
        selected:'全部',
       
       }
  },
  watch:{
    selected(newVal,oldVal){
      //顶部的精品歌单
      this.getTopData(),
       //下面那一坨
       this.getBottomData(),
       //修改页码为1
       this.page=1
    }
  },
  created() {
      //顶部的精品歌单
      this.getTopData(),
       //下面那一坨
       this.getBottomData()
  },    
  methods: {
      // 去歌单详情页
    toPlayListDetail(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
      //抽取方法顶部的精品歌单
      getTopData(){
          api.getRecommendHighQualityList({limit:1,cat:this.selected}).then(res=>{
        if(res.status==200){
            this.topList=res.data.playlists[0];
        }
      }).catch(err=>{
          console.log(err);
          })
      },
      //抽取方法下面那一坨
      getBottomData(){
          //偏移值offset用于分页 起始值为（页码-1）*每页限制limit
          api.getRecommendHighQualityListTags({limit:10,offset:(this.page-1)*10,cat:this.selected}).then(res=>{
        if(res.status==200){
            //保存总条目数
            this.total=res.data.total;
            this.belowList=res.data.playlists;
        }
     }).catch(err=>{
            console.log(err);
            })
      },
        //页码改变事件
    handleCurrentChange(val) {
       this.page=val;
       //上面保存页码后重新获取数据
       this.getBottomData();
    }
  }
};
</script>

<style scoped>
    .playlists-container .tab-bar{
        position: relative;
    }
    .playlists-container .tab-bar .item {
        color: aqua;
    }
     .playlists-container .tab-content .items{
        position: relative;
    }
    .playlists-container .tab-content .name {
        color: blanchedalmond;
    }
    div.el-pagination {
        position: relative;
    }

</style>
