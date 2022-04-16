<template>
  <div class="index-container">
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            {{this.$store.state.discov}}
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            {{this.$store.state.reco}}
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            {{this.$store.state.lastestMusi}}
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            {{this.$store.state.lastestMv}}
          </router-link>
        </li>
        <li>
          <router-link to="/home">
            <span class="iconfont icon-home"></span>
            {{this.$store.state.dataVisual}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src="musicUrl" controls ref="aplayer" autoplay
        :lrcType="1"
        :volume="volume"
        :mini="mini"
        :loop="loop"
        :order="order"
        :listFolded="listFolded"
        :fixed="fixed"
        >
        
        </audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainArea',
  data() {
    return {
      musicUrl:'',
      volume: 0.7,
      // 迷你模式
      mini: false,
      // 音频循环播放, 可选值: 'all', 'one', 'none'
      loop: 'all',
      // 音频循环顺序, 可选值: 'list', 'random'
      order: 'list',
      // 吸底模式
      fixed: true,
      // 是否显示音乐控制面板
      listFolded: true,
    };
  }
};
</script>

<style scoped >
    .player {
  transition: all 0.3s;
  z-index: 999;
}
</style>
