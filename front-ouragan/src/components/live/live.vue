<template>
    <div class="live-component">
        <h1> Live: {{ groupeName }}</h1>
    </div>

    <div v-if="jsonOk" class="scrollableCard">
        <div v-for="(value, index) in Object.entries(measurements)" :key="index">
            <MyCard v-bind:name="value[1].name" v-bind:unit="value[1].unit" v-bind:value="value[1].value"
                v-bind:imageUrl="url[value[0]]" v-bind:uniqueLiveUrl="serverFromProps + '/live/' + value[0]">
            </MyCard>
        </div>
    </div>

    <div v-else class="scrollableCard">
        <p>{{ serverFromProps }} /live: json api not ok <span style='font-size:20px;'>&#9940;</span></p>
    </div>
</template>

<script>
import MyCard from '../Cards/liveCard.vue'

export default {
    name: 'LiveComponent',

    emits: {
        updatedcount: null,
    },

    data() {
        return {
            groupeName: "",
            serverFromProps: this.server, //fetch data from the specified server
            measurements: {},
            jsonOk: "false",
            url: {
                "lum": "https://cdn-icons-png.flaticon.com/512/0/370.png",
                "hum": "https://static.thenounproject.com/png/1512650-200.png",
                "temp": "https://cdn-icons-png.flaticon.com/512/6587/6587775.png",
                "pre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtmemqGRk88OJJplZN4XsVkjx0PjS8daAlQ&usqp=CAU",
                "rain": "https://cdn-icons-png.flaticon.com/512/175/175913.png",
                "wind_speed": "https://cdn-icons-png.flaticon.com/512/54/54298.png",
                "wind_dir": "https://cdn-icons-png.flaticon.com/512/2830/2830040.png"
            }
        }
    },
    props: {
        server: String,
    },

    watch: {
        // watcher for the param server => if it changes, get dall data again from the choose server
        server: function () {
            this.serverFromProps = this.server;
            this.getAlldaData();

        }
    },
    components: {
        MyCard
    },

    created: function () {
        this.getAlldaData();
    },

    methods:
    {
        //fetc all live data at once from the specified server
        getAlldaData() {
            // console.log("this.serverFromProps")
            // console.log(this.serverFromProps)

            fetch(this.serverFromProps + "/live")
                .then((res) => res.json())
                .then((json) => {
                    // console.log(json.measurements);
                    this.groupeName = json.name;
                    this.measurements = json.measurements;
                    this.jsonOk = true;
                })
                .catch(
                    this.jsonOk = false
                )
        }





    }
}


</script>

<style>
.scrollableCard {
    display: flex;
    flex-direction: row;
    width: 90%;
    border-style: solid;
    overflow-y: scroll;
    margin: auto;

}
</style>
