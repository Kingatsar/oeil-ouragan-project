<template>
  <div class="chart-card">
    <div class="card" style="width:100%; height:300px;">
      <div class="card-body">
        <ChartTemplate :type="charttype"></ChartTemplate>
      </div>
      <!--va-card-title>{{ name }}</va-card-title-->
      <!--va-date-input v-model="dateStart" manual-input />
      <va-date-input v-model="dateEnd" manual-input /-->
      <div class="card-footer">
        <div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='"inlineRadioOptions" + chartNum' value="option1"
              checked>
            <label class="form-check-label" for="inlineRadio1">week</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='"inlineRadioOptions" + chartNum' value="option2">
            <label class="form-check-label" for="inlineRadio2">month</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='"inlineRadioOptions" + chartNum' value="option2">
            <label class="form-check-label" for="inlineRadio2">year</label>
          </div>
          <va-date-input v-model="dateStart" manual-input />
          <button class="btn btn-primary">refresh</button>

        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import ChartTemplate from '../Chart/ChartTemplate.vue';


export default {
  name: "ChartCard",
  components: {
    ChartTemplate
  },
  props: {
    name: String,
    unit: String,
    value: String,
    charttype: String,
    chartNum: Number,
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