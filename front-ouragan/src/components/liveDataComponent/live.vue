<template>
    <div class="live-component">
        <h1>{{ msg }}</h1>
    </div>

    <div class="scrollableCard">
        <div v-for="(value, index) in Object.entries(measurements)" :key="index">
            <MyCard v-bind:name="value[1].name" v-bind:unit="value[1].unit" v-bind:value="value[1].value"
                v-bind:imageUrl="url[value[0]]"></MyCard>
        </div>
    </div>



</template>

<script>
import MyCard from '../Cards/Card.vue'

export default {
    name: 'LiveComponent',
    data() {
        return {
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
        msg: String
    },
    components: {
        MyCard
    },

    created: function () {
        fetch("http://172.31.58.187:3000/sensor/live")
            .then((res) => res.json())
            .then((json) => {
                console.log(json.measurements);
                this.measurements = json.measurements;
            })
    }


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../../assets/css/card.css">

</style>
