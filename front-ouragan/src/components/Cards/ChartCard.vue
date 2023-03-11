<template>
  <div class="chart-card">
    <div class="card" style="width:100%; height:100%;">
      <div class="card-body">
        <ChartTemplate :type="charttype" :chartData="chartDataTemplate" :chartOptions="chartOptionsTemplate">
        </ChartTemplate>
      </div>
      <!--https://vuestic.dev/fr/introduction/overview-->
      <!--va-card-title>{{ name }}</va-card-title-->
      <!--va-date-input v-model="dateStart" manual-input />
      <va-date-input v-model="dateEnd" manual-input /-->
      <div v-if="datawithFooter" class="card-footer">
        <div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='featureName' value="week" v-model="selected"
              checked>
            <label class="form-check-label" for="inlineRadio1">week</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='featureName' value="month" v-model="selected">
            <label class="form-check-label" for="inlineRadio2">month</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-bind:name='featureName' value="year" v-model="selected">
            <label class="form-check-label" for="inlineRadio2">year</label>
          </div>
          <va-date-input v-model="dateEnd" manual-input />
          <button @click="uniqueArchive()" class="btn btn-primary">refresh</button>

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
    featureName: String,
    featureUrlArchive: String,
    chartDataTemplate: {
      type: Object,
    },
    chartOptionsTemplate: {
      type: Object,
      default: () => { }
    },
    withFooter: {
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      datawithFooter: this.withFooter,
      dateEnd: new Date(),
      selected: 'week',
    }
  },

  methods: {
    uniqueArchive() {
      // console.log(featureUrlArchive + "/archive/" + this.featureName
      //   + "/" + this.selected + "/" + this.dateEnd.toISOString())
      this.$emit("clickFromChildComponent", { "feature": this.featureName, "period": this.selected, "date": this.dateEnd })
    }
  },


};
</script>
<style>
.chart-card {
  width: 600px;
  height: 500px;
  padding: auto;
  margin: 10px;
}
</style>