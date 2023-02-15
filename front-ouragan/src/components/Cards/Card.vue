<template>
  <div class="my-card">
    <div class="card" style="width: 12rem;">
      <div class="icon-container">
        <img class="card-img-top" v-bind:src="imageUrl" />
      </div>
      <div class="card-body">
        <p class="card-title">Data: {{ name }}</p>
        <!-- <h5 class="card-text">Unit:{{ unit }} </h5> -->
        <a href="#" class="btn btn-primary">{{ value }} {{ unit }}</a>
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
    imageUrl: String
  },
};


</script>
<style>
.card {
  margin-right: 10px;
}

.icon-container {
  margin: auto;
  width: 25%;
  height: 25%;
  object-fit: contain;

}
</style>
