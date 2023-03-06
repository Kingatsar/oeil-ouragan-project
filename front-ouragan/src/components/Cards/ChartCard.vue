<template>
  <div class="chart-card">
    <div class="card" style="width:100%; height:300px;">
      <div class="card-body">
        <BarChart :type="charttype"></BarChart>
      </div>
      <!--va-card-title>{{ name }}</va-card-title-->
      <!--va-date-input v-model="dateStart" manual-input />
      <va-date-input v-model="dateEnd" manual-input /-->
      <div class="card-footer">
        <div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
            <label class="form-check-label" for="inlineRadio1">today</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
            <label class="form-check-label" for="inlineRadio2">last week</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
            <label class="form-check-label" for="inlineRadio2">last month</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
            <label class="form-check-label" for="inlineRadio2">this years</label>
          </div>
        </div>
      </div>
    </div>
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
    value: String,
    charttype: String
  },

  data() {
    return {
      dateStart: new Date(),
      dateEnd: new Date(),
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