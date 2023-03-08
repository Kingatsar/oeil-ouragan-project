<template>
  <label></label>
  <label for="servers">Select Server</label>
  <select class="form-select" @change="changeServer" aria-label="Default select example" name="servers"
    v-model="selectedServer" :change="onChange()">
    <option value="http://localhost:3000" selected>localhost:3000</option>
    <option value="pi@piensg029">pi@piensg029</option>
    <option value="pi@piensg030">pi@piensg030</option>
  </select>

  <SideBar></SideBar>
  <LiveComponent msg="Live" v-model:server="selectedServer" @changeServer="getAlldaData()" />
  <ArchiveComponent></ArchiveComponent>
  <MapCompoment></MapCompoment>
</template>

<script>

import LiveComponent from './components/liveDataComponent/live.vue'
import SideBar from './components/Sidebar/sidebar.vue'
import ArchiveComponent from "./components/ArchiveComponent/archive.vue"
import MapCompoment from "./components/map.vue"



export default {
  name: 'App',
  emits: {
    changeServer: null,
  },


  components: {
    SideBar,
    LiveComponent,
    ArchiveComponent,
    MapCompoment
  },
  data() {
    return {
      selectedServer: 'http://localhost:3000',
    }
  },

  methods: {
    onChange() {
      console.log(this.selectedServer);
      this.$root.$emit('changeServer', 'new message!');
    },

  }
}





</script>

<style>
#map {
  height: 180px;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
