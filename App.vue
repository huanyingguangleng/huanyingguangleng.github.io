<template>
  <div id="app">

      <div class="video-box">
            <video class="video-background" preload="auto" loop playsinline autoplay
                src="http://thenewcode.com/assets/videos/lake.mp4" tabindex="-1"
                muted="muted"></video>
                <!-- https://assets.codepen.io/3364143/7btrrd.mp4 -->
                <!-- http://thenewcode.com/assets/videos/lake.mp4 -->
                <!-- https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/floodplain-clean.mp4 -->
             <TopBar/>
             <MainArea/>
    </div>

  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import MainArea from './components/MainArea.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    MainArea
  }
}
</script>

<style scoped>
        .video-box {
            position: relative;
            height: 100vh;
            background-color: #adc0f4;
            /*进行视频裁剪*/
            overflow: hidden;
            /* z-index: -5; */
        }

        .video-box .video-background {
            position: absolute;
            left: 50%;
            top: 50%;
            /*保证视频内容始终居中*/
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            object-fit: cover;
            min-height: 800px;
            /* z-index: -1; */
        }
</style>
