<template>
  <div class="top-container">
    <div class="left-box left">
      <!-- <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div> -->
        <img src="../assets/changchun.jpg" class="homeImg" align="middle" alt="" />
        <el-tooltip class="item" :enterable="false" effect="dark" content="GitHub：https://github.com/huanyingguangleng/huanyingguangleng.github.io" placement="bottom-end">
            <a href="https://github.com/huanyingguangleng/huanyingguangleng.github.io" target="blank">WR的Git主页</a>
         </el-tooltip>

      <div class="history-wrapperh">
        <span class="iconfont fuckleft" @click="go(-1)"> <</span>
        <span class="iconfont fuckright" @click="go(1)"> ></span>
        
        <el-button type="primary" round size="mini" @click="goHome"
          >回到主页</el-button>
      </div>
    </div>
    <!-- <div class="right-box">
            <div class="el-input el-input--small el-input--prefix">
            <input
            @keyup.native.enter="toResult"
          type="text"
          autocomplete="off"
          placeholder="听点啥好呢？"
          class="el-input__inner"
          v-model="inputValue"/>
             <span class="el-input__prefix">
                 <i class="el-input__icon el-icon-search"></i>
             </span>
            </div>
        </div> -->

    <div class="center">
        <div class="input-box">
        <el-input
        class="inputa"
                placeholder="搜索"
                v-model="inputValue"
                prefix-icon="el-icon-search"
                clearable
                @keyup.enter.native="toResult"
                @focus="getSearchHot"
                @blur="showHot = false">
            </el-input>

            <div class="search-hot" v-show="showHot" ref="hot" @mousedown.stop="prevent">
            
                    <el-scrollbar style="height:100%">
                        <div class="history" v-if="history.length">
                                 <span class="hot-title" style="display: inline-block;margin-right: 5px;">搜索历史</span>
                                <span class="iconfont icon-lajitong" style="cursor:pointer" title="清空搜索历史" @mousedown="deleteHistory(0,true)"></span>
                            <div class="history-wrap">
                                <div class="history-item" v-for="(item,index) in history" :key="index" @mousedown="toHot(item)">
                                 {{item}}
                                    <span class="delete-btn" title="删除" @mousedown.stop="deleteHistory(index,false)">×</span>
                                 </div>
                            </div>
                         </div>

                            <div class="hot-title">实时热搜榜</div>
                            <ul>
                                <li class="hot-item" v-for="(item,index) in hotData" :key="index" @mousedown.prevent="toHot(item.searchWord)">
                                    <div class="hot-index">{{index+1}}</div>
                                    <div class="hot-info">
                                        <div class="hot-top">
                                            <div class="hot-name">{{item.searchWord}}</div>
                                            <div class="hot-score">{{item.score}}</div>
                                            <img class="hot-icon" v-show="item.iconUrl && item.iconType!=5" :src="item.iconUrl"/>
                                        </div>
                                        <div class="hot-content">{{item.content}}</div>
                                    </div>
                                </li>
                            </ul>
                     </el-scrollbar>
            
            </div>

    </div>
      
    </div>

    <div class="right">
        <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link"> 跳转链接<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          
          <el-dropdown-item divided class="droppp">
            <a href="https://www.bilibili.com/video/BV1RE411W776" target="_blank" style='color:blue'>B站教程</a>
          </el-dropdown-item>
          <el-dropdown-item class="droppp">
            <a href="https://gitee.com/penggang-home/cloud-music" target="_blank" style='color:green'>项目地址</a>
          </el-dropdown-item>
          <el-dropdown-item  class="droppp">
            <a href="https://autumnfish.cn" target="_blank" style='color:red'>API接口文档</a>
          </el-dropdown-item>
        
          <el-dropdown-item disabled>2022.03</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import api from "../axios/index.js";
export default {
  name: "TopBar",
  data() {
    return {
            inputValue:"",
            showHot:false,
            hotData:[],
            history:[]
     
    };
  },
  methods: {
      getSearchHot(){
          this.showHot=true;
          if(this.hotData.length==0){
              api.getSearchHotDetail().then(res=>{
                  if(res.status==200){
                      console.log(res);
                        this.hotData=res.data.data;
                  }
              }).catch(err=>{
                  console.log(err);
              })
          }
      },
         toHot(value){
            this.inputValue = value
            this.toResult();
            let thisTime = 1;
            this.$store.dispatch('thisTimeHotSearch', thisTime);
        },
        deleteHistory(index,all){
            if(all)
                this.history = []
            else
                for(let i=0;i<this.history.length;i++){
                    if(i == index)
                        this.history.splice(i,1)
                }
            // 防止点击x删除的时候，导致热搜榜消失，也可以通过.prevent修饰符
            event.preventDefault();
        },
        prevent(){
            event.preventDefault();
        },

    toResult() {
      if (this.inputValue == "") {
        this.$message.warning("你想搜索什么嘛？");
      } else {
        this.$router.push("/result?query=" + this.inputValue);
        let thisTime = 1;
        this.$store.dispatch('thisTimeSelfSearch', thisTime);
      }
    },
    // handleSelect(item){
    //     this.inputValue = item;
    //     this.toResult();
        
    // },
    // 去主页
    goHome() {
      if (this.$route.path != "/discovery") {
        this.$router.push("/discovery");
      }
    },
    // 前进 or 后退
    go(index) {
      window.history.go(index);
    },
  },
};
</script>

<style scoped>
.history-wrapperh{
    position: absolute;
  right: -207px;
}
.left .homeImg {
  width: 28px;
  height: auto;
  object-fit: cover;
}
.left {
  position: relative;
  right: -15px;
  flex-basis: 200px;
  text-align: center;
}
.left a {
  padding-left: 5px;
  font-size: 22px;
  color: black;
}
.top-container {
    position: relative;
  padding: 0;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-container .center {
  flex-basis: 15.5%;
}
.top-container .center .input-box{
    width: 200px;
}
.top-container .center .input-box .inputa{
    border-radius: 20px;
        background-color: rgb(225, 62, 62);
        border: none;
        outline: none;
        font-size: 12px;
        color: #fff;
}
.top-container .center .input-box .search-hot{
        width: 400px;
        height: 300px;
        border: 1px solid #333;
        box-shadow: 0 0 5px 2px rgba(240, 28, 28, 0.3);
        border-radius: 10px;
        background-color: #fff;
        position: absolute;
        top: 55px;
        right: 666px;
        z-index: 25;
        padding: 10px 10px;
        box-sizing: border-box;
        float: left;
}
.top-container .center .input-box .search-hot .hot-title{
    margin: 10px 0;
        font-weight: bold;
        
}
.top-container .center .input-box .search-hot .hot-item {
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: default;
    }

    .top-container .center .input-box .search-hot .hot-item:hover {
        background-color: seashell;
    }

    .top-container .center .input-box .search-hot .hot-index {
        font-size: 20px;
        color: rgb(236, 65, 65);
        margin-right: 15px;
    }

    .top-container .center .input-box .search-hot .hot-info {
        flex: 1;
        font-size: 12px;
        color: slategray;
    }

    .top-container .center .input-box .search-hot .hot-top {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .top-container .center .input-box .search-hot .hot-name {
        font-size: 16px;
        margin-right: 15px;
        color: #000;
    }

    .top-container .center .input-box .search-hot .hot-icon {
        width: 30px;
        /* height: 15px; */
        margin-left: 5px;
    }

    .top-container .center .input-box .search-hot .history-wrap {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .top-container .center .input-box .search-hot .history-item {
        border: 1px solid #ddd;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 13px;
        display: inline-block;
        cursor: pointer;
        margin: 5px;
    }

    .top-container .center .input-box .search-hot .history-item:hover {
        background-color: #F5F7FA;
    }

    .top-container .center .input-box .search-hot .history-item:hover .delete-btn{
        opacity: 1;
    }

    .top-container .center .input-box .search-hot .delete-btn {
        cursor: pointer;
        opacity: 0;
    }



.el-autocomplete {
  width: 25%;
}

.top-container .left-box .history-wrapperh .fuckleft {
    position: absolute;
   border-radius: 15%;
  color: black;
  background-color: white;
  font-size: 20px;
  opacity: 0.8;
  right: 167px;
}
.top-container .left-box .history-wrapperh .fuckleft:hover {
  background-color: rgb(246, 22, 22);
}
.top-container .left-box .history-wrapperh .fuckright {
    position: absolute;
    right: 127px;
  color: white;
  background-color: rgb(66, 71, 85);
  border-radius: 25%;
  font-size: 20px;
}
.top-container .left-box .history-wrapperh .fuckright:hover {
  background-color: rgb(10, 248, 10);
}
.top-container .right .el-dropdown-link{
    color: rgb(177, 250, 6);
    font-size: .1875rem;
}

.el-dropdown {
  cursor: pointer;
}
.el-dropdown-menu__item {
  user-select: none;
}
</style>
