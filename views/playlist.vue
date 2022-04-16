<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playListDetail.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{playListDetail.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playListDetail.creator.avatarUrl" alt="" />
          <span class="name">{{playListDetail.creator.nickname}}</span>
          <span class="time">{{playListDetail.createTime}} 创建</span>
        </div>
        <div class="play-wrap" >
          <span class="iconfont icon-circle-play" ></span>
          <span class="text" @click="playMusich(smileUrl)">随性点歌</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 标签分类 -->
          <ul>
            <li v-for="(item,index) in playListDetail.tags" :key="index">{{item}}</li>
            
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">
              {{playListDetail.description}}
              </span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item,index) in playListDetailTracks" :key="index" @click="playMusic(item.id)">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv" @click="playMV(item.mvid)" v-if="item.mvid"></span>
                  </div>
                  <!-- <span>电视剧加油练习生插曲</span> -->
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatTime }}</td>
            </tr>
            
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="2" class="fuck">
        <!-- 精彩评论 -->
        <!-- <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">(666)</span></p>
          <div class="comments-wrap">
            <div class="item">
              <div class="icon-wrap">
                <img src="../assets/avatar.jpg" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">爱斯基摩：</span>
                  <span class="comment">谁说的，长大了依旧可爱哈</span>
                </div>
                <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{total}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}:</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <!-- 评论回复 -->
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time | formatData}}</div>
              </div>
            </div>
            
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '../axios/index.js'
export default {
  name: 'playlist',
  data() {
    return {
        smileUrl:require("../static/sexylove.mp3"),
        
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //歌单详情对象
      playListDetail:{},
      //一坨歌曲列表
      playListDetailTracks:[],
      //评论
        comment:[],
        //评论总数
        
    };
  },
  filters:{
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
    formatData(time){
            let date = new Date(time);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let day = (date.getDate()) < 10 ? '0' + (date.getDate()) : (date.getDate());
            let hour = (date.getHours()) < 10 ? '0' + (date.getHours()) : (date.getHours());
            let minute = (date.getMinutes()) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes());
            // let second = (date.getSeconds()) < 10 ? '0' + (date.getSeconds()) : (date.getSeconds());
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ' 发表' ;//+second;
        },
  },
  created() {
      api.getSearchPlayListDetail({id:this.$route.query.id,limit:50}).then(res => {
        if(res.status==200){
            // console.log(res)
        this.playListDetail = res.data.playlist;
        this.playListDetailTracks=res.data.playlist.tracks;
        }
      }).catch(err => {
        console.log(err)
      }),
      api.getSearchPlayListDetailComment({id:this.$route.query.id,limit:10}).then(res=>{
          if(res.status==200){
            this.comment=res.data.comments;
            this.total=res.data.total;
          }
      }).catch(err=>{
        console.log(err)
      })
  },
  methods: {
        playMusich(url){
            let thisTime = 1;
            this.$store.dispatch('thisTimePlay', thisTime);
            this.$parent.musicUrl = url;
        
    },
      playMV(id) {
      this.$router.push(`/mv?id=${id}`)
    },
      playMusic(id){
          
        api.getPlayMusic({id}).then(res => {
            let url = res.data.data[0].url;
            this.$parent.musicUrl = url;
            let thisTime = 1;
          this.$store.dispatch('thisTimePlay', thisTime);
        }).catch(err => {
            console.log(err);
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val;
         api.getSearchPlayListDetailComment({id:this.$route.query.id,limit:50,offset:(this.page-1)*10}).then(res=>{
          if(res.status==200){
            this.comment=res.data.comments;
            this.total=res.data.total;
          }
      }).catch(err=>{
        console.log(err)
      })
    
    }
  }
};
</script>

<style scoped>
    .play-wrap{
        cursor: pointer;
    }
</style>
