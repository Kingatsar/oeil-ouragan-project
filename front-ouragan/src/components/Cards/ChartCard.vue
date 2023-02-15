<template>

  <div class="chart-card">
    <va-card>
      <BarChart></BarChart>
      <va-card-title>{{ name }}</va-card-title>
      <va-date-input v-model="dateStart" manual-input />
      <va-date-input v-model="dateEnd" manual-input />

    </va-card>
  </div>

</template> 

<script>
import BarChart from '../Chart/BarChart.vue';


export default {
  name: "ChartCard",
  components: {
    BarChart
  },
  props: {
    name: String,
    unit: String,
    value: String
  },

  data() {
    return {
      dateStart: new Date(),
      dateEnd: new Date()
    }
  },
};
</script>
<style>
.chart-card {
  width: 400px;
  height: 400px;
  padding: auto;
  margin: 10px;
}
</style>