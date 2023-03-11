<template>
  <label id="labelSelectServer" for="servers">Select server</label>
  <select id="selectServer" class="form-select" @change="changeServer" aria-label="Default select example" name="servers"
    v-model="selectedServer" :change="onChange()">
    <option value="http://localhost:3000" selected>localhost:3000</option>
    <option value="http://piensg028:3000/sensor">pi@piensg028</option>
    <option value="http://piensg030:3000/sensor">pi@piensg030</option>
    <option value="http://piensg027:3000/sensor">pi@piensg027</option>
    <option value="http://piensg029:3000/sensor">pi@piensg029</option>
  </select>

  <NavbarComponent></NavbarComponent>

  <div id="live">
    <LiveComponent msg="Live" :server="selectedServer" />
  </div>

  <div id="archive">
    <ArchiveComponent :server="selectedServer"></ArchiveComponent>
  </div>

  <div id="compareLive">
    <compareMeteoLive :server="selectedServer"></compareMeteoLive>
  </div>

  <div id="compareArchive">
    <compareArchivearchiveComponent :server="selectedServer"></compareArchivearchiveComponent>
  </div>

  <div id="map">
    <MapCompoment></MapCompoment>
  </div>
</template>

<script>

import LiveComponent from './components/live/live.vue'
import NavbarComponent from './components/navbar/navbar.vue'
import ArchiveComponent from "./components/ArchiveComponent/archive.vue"
import MapCompoment from "./components/map.vue"
import compareMeteoLive from "./components/ArchiveComponent/compareLive.vue"
import compareArchivearchiveComponent from "./components/ArchiveComponent/compareArchive.vue"


export default {
  name: 'App',
  emits: {
    changeServer: null,
  },


  components: {
    NavbarComponent,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: white;
  margin-top: 60px;
}

#selectServer {
  width: fit-content;
  margin: auto;
}

#labelSelectServer {
  font-size: x-large;
}
</style>
