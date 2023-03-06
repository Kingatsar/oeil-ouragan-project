<template>
  <SideBar></SideBar>
  <LiveComponent msg="Live" />

  <h1>Archive</h1>

  <div class="graphs">
    <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
      <ChartCard :charttype="chartType[index]"></ChartCard>
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
      },

      chartType: [
        "bar",
        "line",
        "bar",
        "line",
        "bar",
        "line",
        "bar",

      ]


    }
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

.graphs {
  display: grid;
  grid-template-columns: 33% 33% 34%;
  row-gap: 2px;
  column-gap: 1%;
  justify-content: center;
  margin-left: 6%;
}
</style>
