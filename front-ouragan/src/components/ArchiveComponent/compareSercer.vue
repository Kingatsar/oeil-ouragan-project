<template>
  <h1>CompareLive</h1>
  <div class="compareLive">
    <ChartCard v-if="loaded" charttype='radar' :chartDataTemplate="radaraDataFetch" :chartOptionsTemplate="options">
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
        console.log(jsonData);
        console.log(Object.values(jsonData.measurements));
        let listdata = [];
        Object.values(jsonData.measurements).forEach(element => {
          listdata.push(element.value * (Math.random() + 10))

        });
        console.log(listdata);

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



        this.nbloaded++

        if (this.nbloaded == listServer.length) {
          this.loaded = true
        }

      }

      console.log(this.radaraDataFetch)

    }
    ,

    getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;


      return ['rgb(' + r + ', ' + g + ', ' + b + ', 0.2)', 'rgb(' + r + ', ' + g + ', ' + b + ', 1)'];
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