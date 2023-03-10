<template>
  <label></label>
  <label for="servers">Select Server</label>
  <select class="form-select" @change="changeServer" aria-label="Default select example" name="servers"
    v-model="selectedServer" :change="onChange()">
    <option value="http://localhost:3000" selected>localhost:3000</option>
    <option value="http://piensg028:3000/sensor">pi@piensg028</option>
    <option value="pi@piensg030">pi@piensg030</option>
  </select>

  <SideBar></SideBar>
  <LiveComponent msg="Live" :server="selectedServer" />
  <ArchiveComponent :server="selectedServer"></ArchiveComponent>
  <compareMeteoLive></compareMeteoLive>
  <compareArchivearchiveComponent></compareArchivearchiveComponent>
  <MapCompoment></MapCompoment>
</template>

<script>

import LiveComponent from './components/liveDataComponent/live.vue'
import SideBar from './components/Sidebar/sidebar.vue'
import ArchiveComponent from "./components/ArchiveComponent/archive.vue"
import MapCompoment from "./components/map.vue"
import compareMeteoLive from "./components/ArchiveComponent/compareSercer.vue"
import compareArchivearchiveComponent from "./components/ArchiveComponent/compareArchive.vue"


export default {
  name: 'App',
  emits: {
    changeServer: null,
  },


  components: {
    SideBar,
    LiveComponent,
    ArchiveComponent,
    MapCompoment,
    compareMeteoLive,
    compareArchivearchiveComponent
  },
  data() {
    return {
      selectedServer: 'http://localhost:3000',
    }
  },

  methods: {
    onChange() {
      console.log(this.selectedServer);
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
  /* color: #2c3e50; */
  color: white;
  margin-top: 60px;

}
</style>
