<template>
    <Bar v-if="type == 'bar'" :data="chartDataBar" />
    <Line v-if="type == 'line'" :data="chartDataLine" />
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

export default {
    name: 'ChartTemplate',
    props: { type: String },
    components: { Bar, Line },
    data() {
        return {
            chartDataBar: {
                labels: ['January', 'February', 'March'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12]
                    }
                ]
            },

            chartDataLine: {
                labels: ['January', 'February', 'March'],
                datasets: [
                    {

                        data: [40, 20, 12]
                    }
                ]
            }
        }
    }
}
</script>
