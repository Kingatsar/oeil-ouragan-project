<template>
    <Bar v-if="type == 'bar'" :data="localChartData" :options="localChartOptions" />
    <Line v-if="type == 'line'" :data="localChartData" :options="localChartOptions" />
    <Radar v-if="type == 'radar'" :data="localChartData" :options="localChartOptions" />
</template>

<script>
import { Bar, Line, Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'

ChartJS.register(Title, RadialLinearScale, Filler, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

export default {
    name: 'ChartTemplate',
    props: {
        type: String,
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            default: () => { }
        }
    },
    components: { Bar, Line, Radar },

    watch: {
        chartData: function () {
            this.localChartData = this.chartData

        },
        chartOptions: function () {
            this.localChartOptions = this.chartOptions
        }

    },

    data() {
        return {
            localChartData: this.chartData,
            localChartOptions: this.chartOptions,
        }
    }
}

</script>
