<template>
  <SideBar></SideBar>
  <LiveComponent msg="Live" />

  <h5>Archive</h5>

  <div class="container-fluid">
    <div class="row">
      <div class="d-flex flex-lg-row flex-lg-row justify-content-lg-center panel">
        <div v-for="(value, index) in Object.entries(dataNames)" :key="index">
          <ChartCard></ChartCard>
        </div>
      </div>
    </div>
  </div>

  <MapCompoment></MapCompoment>

</template>

<script>

import LiveComponent from './components/liveDataComponent/live.vue'
import SideBar from './components/Sidebar/sidebar.vue'
import ChartCard from "./components/Cards/ChartCard.vue"
import MapCompoment from "./components/map.vue"



export default {
  name: 'App',
  components: {
    SideBar,
    LiveComponent,
    ChartCard,
    MapCompoment
  },
  data() {
    return {
      dataNames: {

        "lum": "lumière",
        "hum": "Humidity",
        "temp": "Temperature",
        "pre": "Pressure",
        "rain": "Rainfall",
        "wind_speed": "Wind Speed",
        "wind_dir": "Wind Direction"
      }
    }
  }

}



</script>

<style>
#map {
  height: 180px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: 100px 200px;
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
