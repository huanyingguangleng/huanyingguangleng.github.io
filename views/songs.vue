<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span :class="['item', {active:selected === indiv.tagName}]" 
      v-for="(indiv ,index) in tagList" :key="index" @click="selected=indiv.tagName;fucktagId=indiv.tagId">{{indiv.tagName}}</span>
      <!-- <span class="item">华语</span>
      <span class="item">欧美</span>
      <span class="item">日本</span>
      <span class="item">韩国</span> -->
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item,index) in latestSongList" :key="index">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv" @click="playMV(item.mvid)" v-if="item.mvid"></span>
              </div>
              <span>{{item.album.company}}</span>
            </div>
          </td>
            
                <td>{{item.album.artists["0"].name}}</td>
                <td>{{item.album.name}}</td>
                <td>{{item.duration | formatTime}}</td>
            
        </tr>
       
      </tbody>
    </table>

    

  </div>
</template>

<script>
import api from '../axios/index.js'

export default {
  name: 'songs',
  data() {
    return {
      
        //歌曲列表一大坨信息
        latestSongList:[],
        tagList:[{tagName:'全部',tagId:0},
        {tagName:'华语',tagId:7},
        {tagName:'欧美',tagId:96},
        {tagName:'日本',tagId:8},
        {tagName:'韩国',tagId:16}],
        selected:'全部',
        fucktagId:0,

    };
  },
  filters: {
    //时间格式化
    formatTime(time) {
      let min = (Math.floor(time/1000 / 60)) < 10 ? '0' + Math.floor(time/1000 / 60) : Math.floor(time/1000 / 60);
      let sec = (Math.floor(time /1000% 60)) < 10 ? '0' + Math.floor(time /1000% 60) : Math.floor(time /1000% 60);
      return `${min}:${sec}`;
    }
  },
  created() {
    this.getFuckLastSong();
  },
  watch:{
      selected(){
          console.log(this.fucktagId);
          this.getFuckLastSong();
         
      }
  },
  methods: {
       playMV(id) {
      this.$router.push(`/mv?id=${id}`)
    },
    getFuckLastSong(){
        api.getLastSong({type:this.fucktagId,limit:20}).then(res => {
            if(res.status==200){
                console.log(res);
            this.latestSongList=res.data.data
            // console.log(this.latestSongList);
            }
    }).catch(err => {
      console.log(err);
    })
    },
    playMusic(id){
        api.getPlayMusic({id}).then(res => {
            let url = res.data.data[0].url;
            this.$parent.musicUrl = url;
            // this.$store.state.musicUrl = url;
            let thisTime = 1;
            this.$store.dispatch('thisTimePlay', thisTime);
        }).catch(err => {
            console.log(err);
        })
    },
    
  },
  
};
</script>

<style scoped>
        .songs-container .tab-bar{
            position: relative;
        }
        .songs-container .el-table .song-wrap {
            text-align: center;
        }
        .songs-container .el-table td {
            text-align: center;
        }
</style>
