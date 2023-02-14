<template>

  <div class="my-card">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Data: {{ name }}</h5>
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
    value: String
  },
};


</script>
<style>

</style>
