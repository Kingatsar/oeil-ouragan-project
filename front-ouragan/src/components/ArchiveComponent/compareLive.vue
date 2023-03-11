<template>
  <h1>CompareLive</h1>
  <div class="compareLive">
    <ChartCard v-if="dataLoaded" charttype='radar' :chartDataTemplate="radaraDataFetch" :chartOptionsTemplate="options"
      :withFooter="false">
    </ChartCard>
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

      nbDataLoaded: 0,
      dataLoaded: false,

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
      const listServer = ["http://localhost:3000", "http://localhost:3000", "http://localhost:3000", "http://localhost:3000"]
      for (let i = 0; i < listServer.length; i++) {

        let resp = await fetch(listServer[i] + "/live");

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
        if (this.nbDataLoaded == listServer.length) {
          this.dataLoaded = true
        }

      }
    }
    ,

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