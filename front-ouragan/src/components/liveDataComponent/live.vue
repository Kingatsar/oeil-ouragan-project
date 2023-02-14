<template>
    <div class="live-component">
        <h1>{{ msg }}</h1>
    </div>

    <div class="scrollableCard">
        <div v-for="(value, index) in Object.entries(measurements)" :key="index">
            <MyCard v-bind:name="value[1].name" v-bind:unit="value[1].unit" v-bind:value="value[1].value"></MyCard>
        </div>
    </div>



</template>

<script>
import MyCard from '../Cards/Card.vue'

export default {
    name: 'LiveComponent',
    data() {
        return {
            measurements: {}
        }
    },
    props: {
        msg: String
    },
    components: {
        MyCard
    },

    created: function () {
        fetch("http://localhost:3000/live/")
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
