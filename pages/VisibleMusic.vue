<template>
    <div class="visiblemusic">
            <div id="allCount"></div>
            <div id="allMVCount"></div>
    </div>
</template>

<script>
export default {
    name:'VisibleMusic',
    mounted() {
        // let allMusicCount=[];
        let  allMusicCount=[this.$store.state.thisTimePlayCount,this.$store.state.thisTimePlayMVCount,
        this.$store.state.thisTimeSelfSearchCount,this.$store.state.thisTimeHotSearchCount];
         this.$charts.allPlayCount("allCount",allMusicCount);
         let allMVCount = [
             {value:this.$store.state.thisTimeMainlandCount,name:'内地音乐MV'},
             {value:this.$store.state.thisTimeHongKongCount,name:'港台音乐MV'},
             {value:this.$store.state.thisTimeEuropeCount,name:'欧美音乐MV'},
             {value:this.$store.state.thisTimeJapanCount,name:'日本音乐MV'},
             {value:this.$store.state.thisTimeKoreaCount,name:'韩国音乐MV'},            
         ];
         this.$charts.allPlayPieChart("allMVCount",allMVCount);
    },
}
</script>

<style scoped>
    .visiblemusic{
        position: relative;
        width: 100%;
        height: 2000px;
        /* z-index: 8; */
        background-color: #fff;
        opacity: 0.9;
        border-radius: 15px;
        /* 父元素上border-radius失效可加此行 */
        overflow: hidden;
        
}
    #allCount{
        width:100%;
        height:1000px;
        /* position: relative!important; */
        background-color: #fff ;
        /* z-index: 8; */
        opacity: .8;       
    }
     #allMVCount{
        width:100%;
        height:1000px;
        /* position: relative!important; */
        background-color: #fff ;
        /* z-index: 8; */
        /* opacity: .8;        */
    }

</style>