<template>
    <h1>Archive: {{ groupeName }}</h1>
    <div v-if="jsonOk" class="graphs">
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

    <div v-else class="graphs">
        <p>{{ apiUrl }}: json api not ok <span style='font-size:20px;'>&#9940;</span></p>
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
            groupeName: "",
            apiUrl: "",
            serverFromProps: this.server,
            allChartData: {},
            jsonOk: false,
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
        //evement clilck émis par le composant fils chartCart et génrer par ce composent parent 
        handleClickInParent: function (data) {
            this.getOneDataFromArchive(data.feature, this.serverFromProps + "/archive/" + data.period + "/" + data.feature + "?endDateTime=" + new Date(data.date).toISOString())
        },
        // récupérer tous les donnés des archive en utilisant la list dataNames de la propriété data en haut
        getAllData() {
            try {
                for (let i = 0; i < Object.keys(this.dataNames).length; i++) {
                    let feature = Object.keys(this.dataNames)[i]
                    let apiUrl = this.serverFromProps + "/archive/" + "day" + "/" + feature
                    this.getOneDataFromArchive(feature, apiUrl)

                }
                this.jsonOk = true

            }
            catch (error) {
                this.jsonOk = false

            }


        },

        // récupérer les donéées d'un feature  de archive 
        // chart js exige que ce fontion soit asycnrone, d'ou async
        async getOneDataFromArchive(feature, apiUrl) {
            try {
                // console.log(apiUrl);
                this.apiUrl = apiUrl;
                let data = await fetch(apiUrl)
                let json = await data.json();
                this.groupeName = json.name;
                //store chart data in allChartData 
                this.allChartData[feature] = {
                    "labels": json.measurements[feature].times.map(date => new Date(date).toLocaleString()),
                    "datasets": [
                        {
                            label: json.measurements[feature].name,
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: 'red',
                            borderWidth: 1,
                            "data": json.measurements[feature].values
                        }
                    ]
                }
                this.nbDataLoaded++
                if (this.nbDataLoaded == Object.keys(this.dataNames).length) {
                    this.dataLoaded = true
                    this.nbDataLoaded = 0;
                }

            }
            catch (error) {
                this.jsonOk = false
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
  