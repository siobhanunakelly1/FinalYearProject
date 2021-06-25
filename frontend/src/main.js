
import 'mutationobserver-shim'



import Vue from 'vue'
import App from "./App.vue"
import firebase from "firebase"
import router from './routes'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


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
