<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners"  :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        <!-- 推荐歌单 -->
        {{this.$store.state.reco}}
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in recommendList" :key="index" @click="toPlayListDetail(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
        
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in lastMusic" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
       
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mv" :key="index" @click="playMV(item.id)">
          <div class="img-wrap" >
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
        
      </div>
    </div>

     <!-- 回到顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import api from '../axios/index.js'

export default {
  name: 'discovery',
  data() {
      return {
          banners:[],//轮播图
          recommendList:[],//推荐歌单
          lastMusic:[],//最新音乐
          mv:[],//推荐MV
      }
  },
  methods: {
      // 去往歌单详情页
    toPlayListDetail(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
      playMV(id) {
      this.$router.push(`/mv?id=${id}`);
      let thisTimeMV = 1;
      this.$store.dispatch('thisTimePlayMV', thisTimeMV);
    },
      playMusic(id){
          
          api.getPlayMusic({id}).then(res=>{
              if(res.status === 200){
                  let url = res.data.data[0].url
                  console.log(url);
                  //设置给父组件的播放地址
                  this.$parent.musicUrl = url
                  let thisTime = 1;
                  this.$store.dispatch('thisTimePlay', thisTime);
              }
          }).catch(err=>{
              console.log(err)
          })
      }
  },
  created() {
    //   拿轮播图
      api.getBanner().then(res => {
          if (res.status === 200) {
              this.banners = res.data.banners
          }
      }).catch(err => {
          console.log(err)
      }),
    //   拿推荐歌单
      api.getRecommendList({limit:15}).then(res => {
          if (res.status === 200) {
              this.recommendList = res.data.result
          }
      }).catch(err => {
          console.log(err)
      }),
      //   拿最新音乐
      api.getLastMusic({limit:10}).then(res => {
          if (res.status === 200) {
              this.lastMusic = res.data.result
          }
      }).catch(err => {
          console.log(err)
      }),
      //拿推荐的MV
      api.getRecommendMV().then(res => {
          if (res.status === 200) {
            this.mv = res.data.result
          }
      }).catch(err => {
          console.log(err)
      })
  },
};
</script>

<style scoped>
.el-backtop {
    z-index: 5;
    position: fixed;
    bottom: 80px !important;
    background-color: #fff;
}
    .items .item p {
        color: rgb(238, 77, 77);
    }
    .recommend .title{
        position: relative;
        font-size: 25px;
        color: rgb(218, 245, 11);
    }
    .recommend .item:hover{
        cursor: pointer;
    }
    .news .title{
        position: relative;
        font-size: 25px;
        color: rgb(6, 250, 18);
    }
    .news .items .item{
        position: relative;
        height: 100px;
        width: 50%;

    }
    .news .items .item:hover{
        background-color: #fff;
    }
    .news .items .item .img-wrap span:hover {
        cursor: crosshair;
    }
    .news .items .song-wrap{
        position: relative;
        color: rgb(252, 9, 252);
        font-size: 18px;
    }
    .news .items .song-wrap .singer{
        color: coral;
        /* position: relative; */
    }
    .news .items .img-wrap span {
        position: relative;
    }
    .mvs{
        position: relative;
        color: rgb(231, 114, 141);
    }
    .mvs .title {
        font-size: 18px;
        color: rgb(252, 86, 9);
    }
</style>
