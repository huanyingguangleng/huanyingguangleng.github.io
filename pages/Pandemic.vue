<template>
    <div class="pandemic-container">
        <!-- <h1>淦</h1> -->
        <CovidNum :caseNumData="caseNumData"/>
        <Map/>
    </div>
</template>

<script>
import CovidNum from '../components/CovidNum.vue'
import api from '../axios/index.js'
import Map from '../components/Map.vue'
export default {
    name: 'Pandemic',
    components:{
        CovidNum,
        Map
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

            }
        }
    },
    methods: {
        
    },
    
    mounted(){
        api.getNcov({
            key:"05e5f61488bfa3b5fdf01a2fc4ed5303"
        }).then(res=>{
            console.log('chule');
            console.log(res.data);
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
            }                
        }).catch(err=>{
            console.log(err)
        })
       
    }
}
</script>

<style scoped>
    .pandemic-container{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 8;
        background-color: #fff;
        opacity: 0.9;
        border-radius: 15px;
        overflow: hidden;  /*父元素上border-radius失效可加此行*/
}
    

</style>