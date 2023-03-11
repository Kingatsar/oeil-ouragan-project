<template>
    <h1>Archive</h1>
    <div class="graphs">
        <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
            <ChartCard v-if="loaded" :charttype="chartType[index]" :featureName="value[0]"
                :chartDataTemplate="allChartData[value[0]]" :featureUrlArchive="serverDataFromProps"
                @clickFromChildComponent="handleClickInParent" :chartOptionsTemplate="options">
            </ChartCard>
            <!--p>{{ allChartData[value[0]] }}</p-->
        </div>
    </div>
</template>

<script>
import ChartCard from "../Cards/ChartCard.vue"
export default {
    name: 'archiveComponent',
    components: {
        ChartCard,
    },

    props: {
        server: String,
    },


    watch: {
        server: function () {
            this.serverDataFromProps = this.server;
            this.getAllData()

        }
    },


    data() {
        return {
            serverDataFromProps: this.server,
            allChartData: {},
            dataNames: {
                "lum": "lumière",
                "hum": "Humidity",
                "temp": "Temperature",
                "pre": "Pressure",
                "rain": "Rainfall",
                "wind_speed": "Wind Speed",
                "wind_dir": "Wind Direction"
            },

            chartType: [
                "bar",
                "line",
                "bar",
                "line",
                "bar",
                "line",
                "bar",

            ],
            loaded: false,
            nbloaded: 0,

            localTitle: "test",

            options: {



                scales: {
                    // yAxes: [{
                    //     ticks: {
                    //         beginAtZero: true
                    //     },
                    //     gridLines: {
                    //         display: true
                    //     }
                    // }],
                    // xAxes: [{
                    //     gridLines: {
                    //         display: false
                    //     }
                    // }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.getAllData();
    },
    methods:
    {
        handleClickInParent: function (data) {
            console.log('Event accessed from parent:' + data);
            this.getOnelData(data.feature)
        },
        getAllData() {
            console.log(Object.keys(this.dataNames).length);

            for (let i = 0; i < Object.keys(this.dataNames).length; i++) {
                let key = Object.keys(this.dataNames)[i]
                this.getOnelData(key)


            }

        },

        async getOnelData(key) {

            let data = await fetch(this.serverDataFromProps + "/archive")

            let json = await data.json();

            console.log("ARCHIBEEEEEEEEEEEEEEE");
            console.log(json);

            console.log(json.measurements.feature.times);
            this.allChartData[key] = {
                "labels": json.measurements.feature.times,
                "datasets": [
                    {
                        label: json.measurements.feature.name,
                        borderColor: '#05CBE1',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'red',
                        borderWidth: 1,
                        "data": json.measurements.feature.values
                    }
                ]
            }

            this.nbloaded++

            if (this.nbloaded == Object.keys(this.dataNames).length) {
                this.loaded = true
            }

        }
    }

}


</script>

<style>
.graphs {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

}

@media (min-width: 600px) {
    .graphs {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media (min-width: 900px) {
    .graphs {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
  