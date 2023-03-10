<template>
  <div class="compareLive">
    <ChartCard v-if="loaded" charttype='radar' :chartDataTemplate="radaradata" :chartOptionsTemplate="options">
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

      nbloaded: 0,
      loaded: false,


      options: {



        scales: {

        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },

      radaradataFetch: {
        labels: [
          "lumière",
          "Humidity",
          "Temperature",
          "Pressure",
          "Rainfall",
          "Wind Speed",
          "Wind Direction"
        ]
      }

      ,

      radaradata: {
        labels: [
          "lumière",
          "Humidity",
          "Temperature",
          "Pressure",
          "Rainfall",
          "Wind Speed",
          "Wind Direction"
        ],
        datasets: [
          {
            label: 'server1',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: 'server2',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },



    }
  },


  mounted() {
    console.log("compare")
    this.getAlldaDataFormComparaison();
  },

  methods:
  {
    async getAlldaDataFormComparaison() {

      // console.log("compare")
      const listServer = ["http://localhost:3000", "http://localhost:3000", "http://localhost:3000", "http://localhost:3000"]

      // console.log("this.serverDataFromProps")
      // console.log(this.serverDataFromProps)
      // console.log(listServer.length)

      for (let i = 0; i < listServer.length; i++) {
        console.log(listServer[i] + "/live")
        let resp = await fetch(listServer[i] + "/live");
        // console.log(promise)
        let jsonData = await resp.json()
        console.log(jsonData)

        this.nbloaded++

        if (this.nbloaded == listServer.length) {
          this.loaded = true
        }

      }

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