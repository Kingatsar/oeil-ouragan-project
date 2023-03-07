<template>
  <SideBar></SideBar>
  <LiveComponent msg="Live" />

  <h1>Archive</h1>

  <div class="graphs">
    <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
      <ChartCard v-if="loaded" :charttype="chartType[index]" :chartNum="index"
        :chartDataTemplate="allChartData[value[0]]">
      </ChartCard>
      <!--p>{{ allChartData[value[0]] }}</p-->

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
      allChartData: {},
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

      ],
      loaded: false
      ,
      localTitle: "test",
      chartDataLine: {
        labels: ["this.localTitle", 'February', 'March'],
        datasets: [
          {

            data: [40, 20, 12]
          }
        ]
      },

      options: {

        plugins: {
          title: {
            display: true,
            text: this.titre,
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },


        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  async mounted() {


    console.log("dfqsfdqsfsqdf");

    const data = await fetch("http://localhost:3000/archive")

    const json = await data.json();

    console.log("ARCHIBEEEEEEEEEEEEEEE");
    console.log(json);
    Object.entries(this.dataNames).forEach(([key, value]) => {
      console.log(key, value)

      console.log(json.measurements.feature.times);
      this.allChartData[key] = {
        "labels": json.measurements.feature.times,
        "datasets": [
          {

            "data": json.measurements.feature.values
          }
        ]
      }
    }),
      console.log("ARCHIBEEEEEEEEEEEEEEE");

    console.log(this.allChartData["lum"]);
    console.log(this.chartDataBar);



    this.loaded = true
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
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

}

@media (min-width: 600px) {
  .graphs {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .graphs {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
