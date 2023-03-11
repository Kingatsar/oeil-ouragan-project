<template>
    <h1>Archive</h1>
    <div class="graphs">
        <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
            <!-- we wait that all data are fetched before diplaying them-->
            <ChartCard v-if="dataLoaded" :charttype="chartType[index]" :featureName="value[0]"
                :chartDataTemplate="allChartData[value[0]]" :featureUrlArchive="serverFromProps"
                @clickFromChildComponent="handleClickInParent" :chartOptionsTemplate="options">
            </ChartCard>
            <!-- vue fetched data-->
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
        // watcher for the param server => if it changes, get dall data again from the choose server
        server: function () {
            this.serverFromProps = this.server;
            this.getAllData()

        }
    },


    data() {
        return {
            serverFromProps: this.server,
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
            dataLoaded: false,
            nbDataLoaded: 0,

            options: {
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
            // console.log('Event accessed from parent:' + data);
            alert("fetch data from this api:" + this.serverFromProps + "/archive/" + data.period + "/" + data.feature + "/" + new Date(data.date).toISOString())
            this.getOneDataFromArchive(data.feature, this.serverFromProps + "/archive/" + data.period + "/" + data.feature + "/" + new Date(data.date).toISOString())
        },
        getAllData() {
            // console.log(Object.keys(this.dataNames).length);
            for (let i = 0; i < Object.keys(this.dataNames).length; i++) {
                let feature = Object.keys(this.dataNames)[i]
                let apiUrl = this.serverFromProps + "/archive/" + "week" + "/" + feature + "/" + new Date().toISOString()
                this.getOneDataFromArchive(feature, apiUrl)
            }

        },

        async getOneDataFromArchive(feature, apiUrl) {
            console.log(apiUrl);
            let data = await fetch(this.serverFromProps + "/archive")
            let json = await data.json();
            // console.log("ARCHIBEEEEEEEEEEEEEEE");
            // console.log(json);
            // console.log(json.measurements.feature.times);

            //store chart data in allChartData 
            this.allChartData[feature] = {
                "labels": json.measurements.feature.times.map(date => new Date(date).toLocaleString()),
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
            this.nbDataLoaded++
            if (this.nbDataLoaded == Object.keys(this.dataNames).length) {
                this.dataLoaded = true
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
  