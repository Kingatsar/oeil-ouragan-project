<template>
    <Bar v-if="type == 'bar'" :data="chartData" :options="chartOptions" />
    <Line v-if="type == 'line'" :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

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
    components: { Bar, Line }
}

</script>
