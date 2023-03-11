<template>
    <h1>CompareArchive</h1>
    <div class="graphs">
        <div class="graph" v-for="(value, index) in Object.entries(dataNames)" :key="index">
            <ChartCard v-if="loadedServer" :charttype="chartType[index]" :featureName="value[0]"
                :chartDataTemplate="allChartData[value[0]]" :featureUrlArchive="serverDataFromProps"
                @clickFromChildComponent="handleClickInParent" :chartOptionsTemplate="lisOptions[index]">
            </ChartCard>
            <!--p>{{ allChartData[value[0]] }}</p-->
        </div>
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
            loadedServer: false,
            nbLodadedCompareArchive: 0,

            localTitle: "test",

            lisOptions: [],


        }
    },
    mounted() {
        this.getAllData();
    },
    methods:
    {
        handleClickInParent: function (data) {
            console.log('Event accessed from parent:' + data);
            this.getOnelDataPerServer(data.feature)
        },
        getAllData() {
            console.log(Object.keys(this.dataNames).length);

            for (let i = 0; i < Object.keys(this.dataNames).length; i++) {
                let key = Object.keys(this.dataNames)[i]
                this.getOnelDataPerServer(key)


            }

        },

        async getOnelDataPerServer(key) {

            const listServer = ["http://localhost:3000", "http://localhost:3000", "http://localhost:3000", "http://localhost:3000"]

            this.lisOptions.push(
                {
                    plugins: {
                        title: {
                            display: true,
                            text: this.dataNames[key]
                        }
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false

                }

            )



            this.allChartData[key] = {
                "datasets": []
            }

            for (let i = 0; i < listServer.length; i++) {

                let data = await fetch(listServer[i] + "/archive")

                let json = await data.json();

                console.log("ARCHIBEEEEEEEEEEEEEEE");
                console.log(json);


                console.log(json.measurements.feature.times);
                this.allChartData[key].labels = json.measurements.feature.times;


                this.allChartData[key].datasets[i] = (
                    {
                        label: json.name + i,
                        borderColor: this.getRandomRgb(),
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'red',
                        borderWidth: 1,
                        "data": json.measurements.feature.values.map(x => x * Math.random() * 2)
                    }


                )

                console.log(this.allChartData)




                this.nbLodadedCompareArchive++

                if (this.nbLodadedCompareArchive == Object.keys(this.dataNames).length * listServer.length) {
                    this.loadedServer = true
                }


            }


        },

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
  