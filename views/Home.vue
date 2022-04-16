<template>
    <div class="home-container">
        
        <div class="home-route">
			    <div class="btn">
                    <el-button class="innerbtn1" type="info" round size="mini" @click="pandemic" >共克时艰</el-button>
                    <el-button class="innerbtn2" type="warning" round size="mini" @click="visiblemusic" >本次听闻</el-button>
                    <el-button class="yiqing" type="text" @click="open">点击看疫情新闻速报</el-button>
                </div>
					
			    <div class="visual">
			        <router-view></router-view>
                </div>	
		</div>
    </div>
</template>

<script>
// import CovidNum from '../components/CovidNum.vue'
import api from '../axios/index.js'
// import Map from '../components/Map.vue'

export default {
    name: 'Home',
    components:{
        
    },
    data () {
        return {
        caseNumData:{
                modifyTime:'',
                currentConfirmedCount:'',//现存确诊
                confirmedCount:'',//累计确诊
                suspectedCount:'',//疑似病例
                curedCount:'',//治愈
                deadCount:'',//死亡
                seriousCount:'',//重症

                currentConfirmedIncreased:'',//现存确诊增长
                confirmedIncreased:'',//累计确诊增长
                suspectedIncreased:'',//疑似增长
                curedIncreased:'',//治愈增长
                deadIncreased:'',//死亡增长
                seriousIncreased:'',//重症增长

            },
            summaryh:'',
            titleh:'',
        }
    },
    methods: {
        pandemic(){
            this.$router.push({
                name:'shanghai',
            })
        },
        visiblemusic(){
            this.$router.push({
                name:'musicdata',
            })
        },
        open() {
        this.$alert(this.summaryh, this.titleh, {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    
    mounted(){
        
        api.getNcov({
            key:"05e5f61488bfa3b5fdf01a2fc4ed5303"
        }).then(res=>{
            // console.log(res.data);
            if (res.status == 200) {
                let desc = res.data.newslist[0].desc;
                // this.covidInfo.globalConfirmedCount = desc.globalStatistics.confirmedCount;
                // this.covidInfo.globalCuredCount = desc.globalStatistics.curedCount;
                // this.covidInfo.globalDeathsCount = desc.globalStatistics.deadCount;
                //疫情病例数据
                this.caseNumData.modifyTime = desc.modifyTime;//时间
                this.caseNumData.currentConfirmedCount = desc.globalStatistics.currentConfirmedCount;//现存确诊
                this.caseNumData.confirmedCount = desc.globalStatistics.confirmedCount;//累计确诊
                this.caseNumData.suspectedCount = desc.suspectedCount;//疑似病例
                this.caseNumData.curedCount = desc.globalStatistics.curedCount;//治愈
                this.caseNumData.deadCount = desc.globalStatistics.deadCount;//死亡
                this.caseNumData.seriousCount = desc.seriousCount;//重症
                //疫情病例数据增长
                this.caseNumData.currentConfirmedIncreased = desc.foreignStatistics.currentConfirmedIncr;//现存确诊增长
                this.caseNumData.confirmedIncreased = desc.foreignStatistics.confirmedIncr;//累计确诊增长
                this.caseNumData.suspectedIncreased = desc.foreignStatistics.suspectedIncr;//疑似增长
                this.caseNumData.curedIncreased = desc.foreignStatistics.curedIncr;//治愈增长
                this.caseNumData.deadIncreased = desc.foreignStatistics.deadIncr;//死亡增长
                this.caseNumData.seriousIncreased = desc.seriousIncr;//重症增长
                //新闻
                this.summaryh = (res.data.newslist[0].news[1].summary)+'...';
                this.titleh = res.data.newslist[0].news[1].title;
                // console.log(res.data.newslist[0].news[1].summary);
            }                
        }).catch(err=>{
            console.log(err)
        })
        // this.$charts.line('line');
        // this.$charts.chinaMap('chinaMap');
    }
}
</script>

<style scoped>
    .home-container{
        /* 加个定位才显示出来 淦 */
        position: relative;
        width: 1100px;
        height: 100%;
        /* display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center; */
        /* background-color: rgb(100, 118, 231); */
        backdrop-filter: blur(30px);
    
    }
    .home-container .home-route{
        width: 100%;
    }
    .home-container .home-route .btn{
        flex-direction: row;
        justify-content:center;
        width: 100%;;  
        height: 50px;
        /* background-color: #fff; */
    }
    .home-container .home-route .btn .yiqing{
        color: black;
        font-size: .15rem;
    }
    .home-container .home-route .btn .innerbtn1 {
        font-size: .1875rem;
        color: rgb(249, 251, 247);
    }
    .home-container .home-route .btn .innerbtn2 {
        font-size: .1875rem;
        color: rgb(4, 141, 254);
    }

</style>