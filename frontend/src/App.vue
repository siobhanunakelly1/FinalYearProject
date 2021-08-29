<template>
  <v-app class="grey lighten-3">
    <navbar></navbar>
    <v-content class="mx-10">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";
export default {
  watch: {
      '$route':{
        handler: (to) => {
          document.title = to.meta.title || 'Transporter'
        },
         immediate: true
      }
    },
  components: {
    navbar
  }
};
</script>

<style>

</style>
