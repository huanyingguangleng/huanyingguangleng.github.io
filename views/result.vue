<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{queryKeyWords}}</h2>
      <span class="sub-title">找到{{ songCount }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in gotSongList"
              :key="index"
              
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名字 -->
                    <span class="songhahaha" @click="playSong(item.id)">播放:{{ item.name }}</span>
                    <span @click="toPlayMV(item.mvid)"  class="iconfont icon-mv" v-if="item.mvid != 0"
                      >播放MV</span
                    >
                  </div>
                  <!-- 二级标题 -->
                  <span v-show="item.alias.length != 0">{{
                    item.alias[0]
                  }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in gotPlayList" :key="index" @click="toPlaylisthaha(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount|abbreviatedPlayCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
         
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in gotMV" :key="index" @click="toPlayMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | abbreviatedPlayCount}}</div>
              </div>
              <span class="time">{{item.duration | formatTime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../axios/index.js";
// import axios from 'axios'
export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      gotSongList: [],
      songCount: 0,
      gotPlayList: [],
      gotMV:[],
      queryKeyWords:'',
    };
  },
  computed:{
      searchChange(){
          return this.$route.query.query
      }
  },
  watch: {
    searchChange:{
      handler:function(){
          this.queryKeyWords=this.$route.query.query;
          api
            .getSearchThings({ keywords: queryKeyWords, type: type, limit: limit })
             .then((res) => {
        // console.log(res);
        this.gotSongList = res.data.result.songs;
        this.songCount = res.data.result.songCount;
        // console.log(this.songCount);
      })
      .catch((err) => {
        console.log(err);
      });
      },
        deep:true,
    },
    activeIndex() {
        let type = 1;
        let limit = 30;
        switch (this.activeIndex) {
            case 'songs':
                type = 1;
                limit = 50;
                break;
            case 'lists':
                type = 1000;
                limit = 50;
                break;
            case 'mv':
                type = 1004;
                limit = 64;
                break;       
            default:
                break;
        }

       api.getSearchThings({ keywords: this.$route.query, type: type, limit: limit }).then((res) => {
                if(type==1){
                    this.gotSongList = res.data.result.songs;
                    this.songCount = res.data.result.songCount;
                }else if(type==1000){
                     this.gotPlayList = res.data.result.playlists;
                     this.songCount = res.data.result.playlistCount;      
                    //  console.log(this.gotSongList);                 
                }else{
                    this.gotMV = res.data.result.mvs;
                    this.songCount = res.data.result.mvCount;
                }
                }).catch((err) => {console.log(err)})
    },
  },
  filters: {
    //时间格式化
    formatTime(time) {
      let min =
        Math.floor(time / 1000 / 60) < 10
          ? "0" + Math.floor(time / 1000 / 60)
          : Math.floor(time / 1000 / 60);
      let sec =
        Math.floor((time / 1000) % 60) < 10
          ? "0" + Math.floor((time / 1000) % 60)
          : Math.floor((time / 1000) % 60);
      return `${min}:${sec}`;
    },
    // 时间戳转换
    abbreviatedPlayCount(count) {
      if(count > 100000) {
        return (count / 10000).toFixed(1) + '万';
      } else {
        return count;
      }
    }
  },
  created() {
    api
      .getSearchThings({ keywords: this.$route.query, type: 1, limit: 10 })
      .then((res) => {
        // console.log(res);
        this.gotSongList = res.data.result.songs;
        this.songCount = res.data.result.songCount;
        // console.log(this.songCount);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios({
    //   method: 'get',
    //   url: 'https://autumnfish.cn/search',
    //   params: {
    //     keywords: this.$route.query,
    //     type: 1,
    //     limit: 10
    //   }
    // }).then((res) => {
    //   console.log(res);
    //   this.gotSongList = res.data.result.songs;
    //   this.songCount=res.data.result.songCount ;
    //   console.log(this.songCount);
    // }).catch((err) => {
    //   console.log(err);
    // });
  },

  methods: {
    toPlayMV(id){
          this.$router.push({
              path:'/mv',
              query:{
                  id:id
              }
          });
          let thisTimeMV = 1;
                this.$store.dispatch('thisTimePlayMV', thisTimeMV);
      },
    playSong(id) {
      api
        .getPlayMusic({ id })
        .then((res) => {
          if (res.status === 200) {
            let url = res.data.data[0].url;
            console.log(url);
            //设置给父组件的播放地址
            this.$parent.musicUrl = url;
            let thisTime = 1;
          this.$store.dispatch('thisTimePlay', thisTime);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toPlaylisthaha(id){
        this.$router.push(`/playlist?id=${id}`)
    }
  },
};
</script>

<style scoped>
.result-container {
  position: relative;
}
.result-container .title-wrap .title {
  font-size: 25px;
  color: white;
}
.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: rgb(4, 0, 0);
}
.result-container .el-table .el-table__row .name-wrap span {
    cursor: pointer;
}
.result-container .el-table__row {
  padding-bottom: 5px;
  height: 50px;
}
.result-container .el-table__row td {
  text-align: center;
}
.result-container .song-wrap .name-wrap .songhahaha {
  font-size: 13px;
}
</style>
