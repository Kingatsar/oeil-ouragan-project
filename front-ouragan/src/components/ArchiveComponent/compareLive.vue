<template>
  <h1>CompareLive</h1>
  <div v-if="jsonOk" class="compareLive">
    <ChartCard v-if="dataLoaded" charttype='radar' :chartDataTemplate="radaraDataFetch" :chartOptionsTemplate="options"
      :withFooter="false">
    </ChartCard>
  </div>

  <div v-else class="compareLive">
    <p> json api not ok in one of live server <span style='font-size:20px;'>&#9940;</span></p>
  </div>
</template>

<script>

import ChartCard from "../Cards/ChartCard.vue"
export default {
  name: 'compareMeteoLive',
  components: {
    ChartCard
  },
  data() {
    return {
      listServer: ["http://localhost:3000", "http://piensg027:3000", "http://piensg028:3000"],
      nbDataLoaded: 0,
      dataLoaded: false,
      jsonOk: true,

      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },

      radaraDataFetch: {
        labels: [
          "lumière",
          "Humidity",
          "Temperature",
          "Pressure",
          "Rainfall",
          "Wind Speed",
          "Wind Direction"
        ],
        datasets: [],
      },



    }
  },


  mounted() {
    this.getAlldaDataFormComparaison();
  },

  methods:
  {
    async getAlldaDataFormComparaison() {
      try {

        for (let i = 0; i < this.listServer.length; i++) {

          let resp = await fetch(this.listServer[i] + "/live");

          let jsonData = await resp.json()
          let listdata = [];
          Object.values(jsonData.measurements).forEach(element => {
            listdata.push(element.value * (Math.random()))

          });
          let colors = this.getRandomRgb();
          this.radaraDataFetch.datasets[i] =
          {
            label: jsonData.name,
            backgroundColor: colors[0],
            borderColor: colors[1],
            pointBackgroundColor: colors[1],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors[1],
            data: listdata
          }

          this.nbDataLoaded++
          if (this.nbDataLoaded == this.listServer.length) {
            this.dataLoaded = true
          }

        }
        this.jsonOk = true;

      }
      catch (error) {
        this.jsonOk = false;
      }

    },

    getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;
      return ['rgb(' + r + ', ' + g + ', ' + b + ', 0.2)', 'rgb(' + r + ', ' + g + ', ' + b + ', 0.4)'];
    }
  },
}
</script>

<style>
.compareLive {
  display: flex;
  justify-content: center;
}
</style>