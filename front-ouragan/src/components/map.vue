<template>
    <div class="map-component" style="height:600px; width:800px">
        <l-map ref="map" :zoom="zoom" :center="[47.41322, -1.219482]">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" name="OpenStreetMap"></l-tile-layer>

            <LMarker :latlng="[48.864716, 2.349014]" />


        </l-map>
    </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
    name: "MapComponent",
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data() {
        return {
            zoom: 12,
        };
    },
};
</script>
  
<style>

</style>