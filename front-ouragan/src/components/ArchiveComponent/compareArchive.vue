<template>
    <h1>CompareArchive</h1>
    <div v-if="jsonOk" class="graphs">
        <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
            <ChartCard v-if="AllDataloaded" :charttype="chartType[index]" :featureName="value[0]"
                :chartDataTemplate="allChartData[value[0]]" :featureUrlArchive="serverFromProps"
                @clickFromChildComponent="handleClickInParentComp" :chartOptionsTemplate="lisOptions[index]"
                :withFooter="true">
            </ChartCard>
            <!--p>{{ allChartData[value[0]] }}</p-->
        </div>
    </div>

    <div v-else class="graphs">
        <p>archive: json api not ok in one of archive server <span style='font-size:20px;'>&#9940;</span></p>
    </div>
</template>

<script>
import ChartCard from "../Cards/ChartCard.vue"
export default {
    name: 'compareArchivearchiveComponent',
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
            this.AllDataloaded = false
            // console.log("switch server to " + this.serverFromProps)
            this.getAllData()
        }
    },


    data() {
        return {
            serverFromProps: this.server,
            jsonOk: true,
            listServer: ["http://piensg027:3000", "http://piensg028:3000", "http://piensg031:3000"],
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
                "line",
                "line",
                "line",
                "line",
                "line",
                "line",
                "line",

            ],
            AllDataloaded: false,
            nbLodadedCompareArchive: 0,

            lisOptions: [],


        }
    },
    mounted() {
        this.getAllData();
    },
    methods:
    {
        handleClickInParentComp(data) {
            // alert("fetch data from this api:" + this.serverFromProps + "/archive/" + data.period + "/" + data.feature + "/" + new Date(data.date).toISOString())
            // this.nbLodadedCompareArchive = 0;
            this.AllDataloaded = false,
                this.getOneDataPerServer(data, true)
        },
        // récupérer tous les donnés des archive en utilisant la list dataNames de la propriété data en haut
        getAllData() {
            // console.log(Object.keys(this.dataNames).length);

            for (let i = 0; i < Object.keys(this.dataNames).length; i++) {
                let key = Object.keys(this.dataNames)[i]
                this.getOneDataPerServer({ feature: key }, false)
            }

        },

        // récupérer les donéées d'un feature  de archive pour chaque server
        // chart js exige que ce fontion soit asycnrone, d'ou async
        async getOneDataPerServer(data, isUniqueFeature) {

            this.lisOptions.push(
                {
                    plugins: {
                        title: {
                            display: true,
                            text: this.dataNames[data.feature]
                        }
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false

                }

            )



            this.allChartData[data.feature] = {
                "datasets": []
            }





            for (let i = 0; i < this.listServer.length; i++) {

                let json = {};

                let promiseData;

                if (isUniqueFeature) {
                    try {
                        // console.log(this.listServer[i] + "/archive/" + data.period + "/" + data.feature + "/" + new Date(data.date).toISOString())
                        promiseData = await fetch(this.listServer[i] + "/archive/" + data.period + "/" + data.feature + "?endDateTime=" + new Date(data.date).toISOString())
                        this.jsonOk = true
                    }
                    catch (error) {
                        this.jsonOk = false
                    }
                }
                else {
                    try {
                        // console.log(this.listServer[i] + "/archive/" + "day" + "/" + data.feature + "/" + new Date().toISOString())
                        promiseData = await fetch(this.listServer[i] + "/archive/" + "day" + "/" + data.feature)
                        this.jsonOk = true
                    } catch (error) {
                        this.jsonOk = false
                    }

                }




                json = await promiseData.json();

                this.allChartData[data.feature].labels = json.measurements[data.feature].times.map(date => new Date(date).toLocaleString());

                this.allChartData[data.feature].datasets[i] = (
                    {
                        label: json.name + i,
                        borderColor: this.getRandomRgb(),
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'red',
                        borderWidth: 1,
                        "data": json.measurements[data.feature].values.map(x => x * Math.random() * 2)
                    }


                )

                this.nbLodadedCompareArchive++

                // console.log(this.nbLodadedCompareArchive)
                // console.log(this.listServer.length)

                if (!isUniqueFeature) {

                    if (this.nbLodadedCompareArchive == Object.keys(this.dataNames).length * this.listServer.length) {
                        this.AllDataloaded = true
                        this.nbLodadedCompareArchive = 0;
                    }
                }

                else {
                    if (this.nbLodadedCompareArchive == this.listServer.length) {
                        this.AllDataloaded = true
                        // console.log("this.listServer.length")

                        this.nbLodadedCompareArchive = 0;

                    }
                }


            }

        }
        ,
        // colorisation random des chart pour chaque groupe
        getRandomRgb() {
            var num = Math.round(0xffffff * Math.random());
            var r = num >> 16;
            var g = num >> 8 & 255;
            var b = num & 255;
            return 'rgb(' + r + ', ' + g + ', ' + b + ', 1)';

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
  