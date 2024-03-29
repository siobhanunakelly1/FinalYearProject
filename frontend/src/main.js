
import 'mutationobserver-shim'
import Vue from 'vue'
import App from "./App.vue"
import firebase from "firebase"
import router from './routes'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

Vue.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyC4F2RO3v9qlp5X18XzzrvEjCwToHjZ0Fc',
      // This is required to use the Autocomplete plugin
      libraries: 'places', // 'places,drawing,visualization'
  },
});

Vue.use(VuetifyGoogleAutocomplete, {
  /*
    not used as loaded with component
    apiKey: key,
  */
  vueGoogleMapsCompatibility: true,
});

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyApxYeNch7iykSm88R1A-M-PSo4wCDeQfA",
    authDomain: "fyproject-d9b81.firebaseapp.com",
    projectId: "fyproject-d9b81",
    storageBucket: "fyproject-d9b81.appspot.com",
    messagingSenderId: "37978560345",
    appId: "1:37978560345:web:23be370adc347c76771e48",
    measurementId: "G-HG1HL486VJ"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
