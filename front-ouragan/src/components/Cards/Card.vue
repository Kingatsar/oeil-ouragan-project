<template>
  <div class="my-card">
    <div class="card" style="width: 12rem;">
      <div class="icon-container">
        <img class="card-img-top" v-bind:src="imageUrl" />
      </div>
      <div class="card-body">
        <p class="card-title">Data: {{ name }}</p>
        <!-- <h5 class="card-text">Unit:{{ unit }} </h5> -->
        <p>{{ localValue }} {{ unit }}</p>
        <button @click="uniqueLive(uniqueLiveUrl)" class="btn btn-primary">refresh</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyCard",
  props: {
    name: String,
    unit: String,
    value: String,
    imageUrl: String,
    uniqueLiveUrl: String
  },

  data() {
    return {
      localValue: this.value
    }
  },
  methods: {
    uniqueLive(uniqueLiveUrl) {
      // alert(uniqueLiveUrl)
      fetch(uniqueLiveUrl)
        .then((res) => res.json())
        .then((json) => {
          console.log(json.measurements.temp.value);
          this.localValue = json.measurements.temp.value;
        })
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
