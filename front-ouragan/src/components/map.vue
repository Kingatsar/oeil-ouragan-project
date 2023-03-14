<template>
    <div id="map"></div>
</template>

<script>

import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
    name: 'mapComponent',
    components: {

    },

    props: {

    },


    watch: {

    },


    data() {
        return {

        }
    },
    mounted() {
        this.disp()

    },
    methods:
    {
        disp() {
            var map = L.map('map').setView([48, 891807, 2.303593], 4);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let listServer = ["http://localhost:3000", "http://piensg027:3000", "http://piensg028:3000"]

            let sondeIcon = L.icon({
                iconUrl: require("@/assets/sonde.png"),

                iconSize: [50, 50], // size of the icon
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            for (let i = 0; i < listServer.length; i++) {
                fetch(listServer[i] + "/live")
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json.measurements);
                        let lon = json.location["long"];
                        let lat = json.location.lat;
                        let groupName = json.name;

                        var marker = L.marker([lat, lon], { icon: sondeIcon }).addTo(map);
                        marker.bindPopup(groupName).openPopup();

                    })
            }
        }

    }

}


</script>

<style>
#mapCard {
    height: 500px;
    width: 50%;
    margin: auto;
}

#map {
    height: 500px;
    width: 60%;
    margin: auto;
    margin-bottom: 200px;
}
</style>
  