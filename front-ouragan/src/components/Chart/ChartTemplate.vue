<template>
    <Bar v-if="type == 'bar'" :data="chartData" :options="chartOptions" />
    <Line v-if="type == 'line'" :data="chartData" :options="chartOptions" />
    <Radar v-if="type == 'radar'" :data="chartData" :options="chartOptions" />
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
    components: { Bar, Line, Radar }
}

</script>
