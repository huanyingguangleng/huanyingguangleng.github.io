<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
         autoplay="autoplay"
          controls
          :src="url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="singerIcon" alt="" />
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <span class="number">播放{{mvInfo.playCount | abbreviatedPlayCount}} 次</span>
          <p class="desc">
            {{mvInfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{mvCommentCount}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in mvHotComment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time |formatData}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">({{mvCommentCount}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in mvComment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">{{item.time |formatData}}</div>
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
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in simiMV" :key="index" @click="toPlayMV(item.id)">
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
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios/index.js";
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      //mv地址
      url:"",
      //相关的mv信息
      simiMV:[],
      //mv信息
        mvInfo:{},
        //mv歌手头像
        singerIcon:"",
        //mv一般评论
        mvComment:[],
        //mv热评
        mvHotComment:[],
        //mv评论总数
        mvCommentCount:0,
    };
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
    // 数量转换
    abbreviatedPlayCount(count) {
      if(count > 100000) {
        return (count / 10000).toFixed(1) + '万';
      } else {
        return count;
      }
    }
  },
  created() {
      api.getMvDetail({id:this.$route.query.id}).then(
          res=>{
                if(res.status==200){
                    // console.log(res);
                this.url=res.data.data.url;
                }
          }
      ).catch(err=>{
          console.log(err);
      });
      api.getMvDetailRelativeMV({mvid:this.$route.query.id}).then(res=>{
          if(res.status==200){
              console.log(res);
            this.simiMV=res.data.mvs
          }
      }).catch(err=>{
          console.log(err);
      });
      api.getMvDetailMVInfo({mvid:this.$route.query.id}).then(res=>{
          if(res.status==200){
            //   console.log(res);
            this.mvInfo=res.data.data
            //获取歌手信息，就是为了那张头像吧？
            api.getMvDetailSingerInfo({id:this.mvInfo.artists[0].id}).then(
          res=>{
                if(res.status==200){
                    // console.log(res);
                    //歌手头像信息
                    this.singerIcon=res.data.artist.picUrl
                }
          }
      ).catch(err=>{
          console.log(err);
      });
          }
      }).catch(err=>{
          console.log(err);
      });
      api.getMvDetailComment({id:this.$route.query.id,limit:10,offset:0}).then(
          res=>{
                if(res.status==200){
                    // console.log(res);
                    this.mvComment=res.data.comments;
                    this.mvHotComment=res.data.hotComments;
                    this.mvCommentCount=res.data.total;
                }
          }
      ).catch(err=>{
          console.log(err);
      });
  },
  methods: {
      toPlayMV(id){
          api.getMvDetail({id:id}).then(
          res=>{
                if(res.status==200){
                    console.log(res);
                this.url=res.data.data.url;
                let thisTimeMV = 1;
                this.$store.dispatch('thisTimePlayMV', thisTimeMV);
                }
          }
      ).catch(err=>{
          console.log(err);
      });
      api.getMvDetailRelativeMV({mvid:id}).then(res=>{
          if(res.status==200){
              console.log(res);
            this.simiMV=res.data.mvs
          }
      }).catch(err=>{
          console.log(err);
      });
      api.getMvDetailMVInfo({mvid:id}).then(res=>{
          if(res.status==200){
            //   console.log(res);
            this.mvInfo=res.data.data
            //获取歌手信息，就是为了那张头像吧？
            api.getMvDetailSingerInfo({id:this.mvInfo.artists[0].id}).then(
          res=>{
                if(res.status==200){
                    // console.log(res);
                    //歌手头像信息
                    this.singerIcon=res.data.artist.picUrl
                }
          }
      ).catch(err=>{
          console.log(err);
      });
          }
      }).catch(err=>{
          console.log(err);
      });
      api.getMvDetailComment({id:id,limit:10,offset:0}).then(
          res=>{
                if(res.status==200){
                    // console.log(res);
                    this.mvComment=res.data.comments;
                    this.mvHotComment=res.data.hotComments;
                    this.mvCommentCount=res.data.total;
                }
          }
      ).catch(err=>{
          console.log(err);
      });
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val;
         api.getMvDetailComment({id:this.$route.query.id,limit:10,offset:(this.page-1)*10}).then(res=>{
          if(res.status==200){
                    this.mvComment=res.data.comments;
                    this.mvHotComment=res.data.hotComments;
                    this.mvCommentCount=res.data.total;
          }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style></style>
