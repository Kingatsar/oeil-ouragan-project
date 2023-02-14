<template>
  <SideBar></SideBar>
  <LiveComponent msg="Dashbord" />

</template>

<script>

import LiveComponent from './components/liveDataComponent/live.vue'
import SideBar from './components/Sidebar/sidebar.vue'


export default {
  name: 'App',
  components: {
    SideBar,
    LiveComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
