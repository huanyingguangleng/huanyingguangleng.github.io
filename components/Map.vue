<template>
    <div>
      <p class="title"><i></i>上海疫情地图显示</p>
        <div id="shanghaiMap"></div>
  </div>
</template>

<script>
import api from "../axios/index.js"
export default {
    //     {name:"内蒙古",value:191,itemStyle:{ normal:{ areaColor:"#ff0000" } }}
    mounted() {
        
        api.getShanghaiCityPandemic().then(res=>{
            let allData=[];
            let temp2 ={
                        name:"嘉定区",value:res.data.retdata.subList[0].confirm
                    };
            allData.push(temp2);
            for (let i = 2; i < 17; i++) {
                let temp ={
                    name:res.data.retdata.subList[i].city,
                    value:res.data.retdata.subList[i].confirm,
                    
                    }
                allData.push(temp);
                }
                
            
            console.log(res);
            this.$charts.provinceMap("shanghaiMap",allData);
        }).catch(err=>{
            console.log(err);
        })
    },
}
</script>

<style scoped>
    #shanghaiMap{
        width:100%;
        height:1000px;
        /* position: relative!important; */
        background-color: #fff ;
        /* z-index: 8; */
        opacity: .8;       
    }
    .title{
        font-size:20px;
        font-weight:bold;
        color: rgb(8, 243, 169);
       
    }
</style>