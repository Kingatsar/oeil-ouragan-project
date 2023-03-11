<template>
    <div class="live-component">
        <h1> Live </h1>
    </div>

    <div class="scrollableCard">
        <div v-for="(value, index) in Object.entries(measurements)" :key="index">
            <MyCard v-bind:name="value[1].name" v-bind:unit="value[1].unit" v-bind:value="value[1].value"
                v-bind:imageUrl="url[value[0]]" v-bind:uniqueLiveUrl="serverFromProps + '/live/' + value[0]">
            </MyCard>
        </div>
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
            serverFromProps: this.server, //fetch data from the specified server
            measurements: {},
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
        // watcher fot the param server => if id changes, class the data ser
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
                    this.measurements = json.measurements;
                })
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
