<template>
  <div class="my-card">
    <div class="card" style="width: 12rem;">
      <div class="icon-container">
        <img class="card-img-top" v-bind:src="imageUrl" />
      </div>
      <div v-if="jsonOk" class="card-body">
        <p class="card-title">Data: {{ name }}</p>
        <p>{{ localValue }} {{ unit }}</p>
        <!-- refrech individual live data from this button -->
        <button @click="uniqueLive(localUniqueLiveUrl)" class="btn btn-primary">refresh</button>
      </div>

      <div v-else class="card-body">
        <p>{{ localUniqueLiveUrl }}: json api not ok <span style='font-size:20px;'>&#9940;</span></p>

      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "MyCard",
  props: {
    name: String, //name of the feature 
    unit: String, //unit of the feature 
    value: String, //value of the feature 
    imageUrl: String,//icon of the feature 
    uniqueLiveUrl: String //api of the feature 
  },

  watch: {
    // watcher for the param server => if it changes, get dall data again from the choose server
    uniqueLiveUrl: function () {
      console.log("change to 3001")
      this.localUniqueLiveUrl = this.uniqueLiveUrl;
    },
    value: function () {
      console.log("change to 3001 value")
      this.localValue = this.value;
    }

  },


  data() {
    return {
      localValue: this.value,
      localUniqueLiveUrl: this.uniqueLiveUrl,
      jsonOk: true
    }
  },
  methods: {
    uniqueLive(uniqueLiveUrl) {
      // alert(uniqueLiveUrl)
      fetch(uniqueLiveUrl)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.measurements.temp.value);
          this.localValue = json.measurements[uniqueLiveUrl.split("/").pop()].value;
          this.jsonOk = true
        }).catch(
          this.jsonOk = false
        )
    }
  },

};


</script>
<style>
.card {
  margin-right: 10px;
  color: rgb(0, 0, 0);
}

.icon-container {
  margin: auto;
  width: 25%;
  height: 25%;
  object-fit: contain;

}
</style>
