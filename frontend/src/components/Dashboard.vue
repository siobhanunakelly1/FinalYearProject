<template>
  <div class="dashboard">
    
    <v-container class = "my-5">
      <h1 class="subheading grey--text">
        <span class="font-weight-light">Dashboard</span>
      </h1>
      <v-divider></v-divider>
      <v-layout row class="mb-3 mt-3"> 
        <v-btn small text color="grey" @click="sortBy('number')">
          <v-icon left small>sort</v-icon>
          <span class="caption">By number</span>
        </v-btn>
        <v-btn small text color="grey" @click="sortBy('status')">
          <v-icon left small>sort</v-icon>
          <span class="caption">By status</span>
        </v-btn>
      </v-layout>
    
      <v-card flat class="pa-3" v-for="job in deliveries" :key="job.number">
        <v-layout row :class="`pa-3 job ${job.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Job Number</div>
            <div>{{ job.number }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Collection From</div>
            <div> {{ job.collect }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Deliver To</div>
            <div> {{ job.deliver }}</div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2 sm4 md2>
            <v-spacer></v-spacer>
            <v-chip small :class="`${job.status} white--text my-2 caption`">{{ job.status }}</v-chip>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>


import firebase from 'firebase';
//import web3 from '../../contracts/web3-metamask';
import delivery from '../../contracts/DeliveryInstance';
import deliveries from '../../contracts/DeliveriesInstance';
import { mapGetters } from "vuex";

let deliveriesRef;
let contractList = [];

export default {
  async beforeMount() {
  // get auctionBox method: returnAllAuctions()
  deliveries.methods
    .returnAllDeliveries()
    .call()
    .then((auctions) => {
      console.log(auctions);
      this.getDeets(auctions);
    });

},
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getAllContractAddresses(user);
        this.getDeliveryDetails();
      }
    });   
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
        user: "user"
    })
  },
  data() {
    return {
        deliveries:[
          { number: "123", collect: "Murray Timber", deliver: "Laois Sawmills", status: "Collected"},
          { number: "124", collect: "Coca Cola", deliver: "Ballygowan", status: "Pending"},
          { number: "125", collect: "Kildea", deliver: "Burren", status: "Collected"},
          { number: "126", collect: "Electrosteel", deliver: "Peak Pipe", status: "Delivered"},
        ]
    }
  },
  methods: {
    async createDelivery(){
        this.$router.replace({name: "createDelivery"});
      },
    async getAllContractAddresses(user){
      var uid = user.uid;
      deliveriesRef = firebase.database().ref("/sellers/" + uid + "/Deliveries");
      deliveriesRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            contractList.push(data.EthereumAddress); 
        });
        
      });
      console.log(contractList[0]);
      const deliveryInstance = await delivery("0xf9Df6589129A3fa14ce56A9B1b42806899dE528c");
      const status = await deliveryInstance.methods.status().call();
      console.log(status);
    },
    async getDeliveryDetails(){
      var i;
      console.log(contractList.length);
      for(i =0; i < contractList.length; i++){
        const deliveryInstance = delivery(contractList[i]);
        console.log(deliveryInstance.methods.status().call());
        console.log(contractList[i]);
      }
    },
    sortBy(prop){
      this.deliveries.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    async getDeets(prop){
      for (let x of prop){
        const deliveryInstance = await delivery(x);
        const status = await deliveryInstance.methods.status().call();
        const id = await deliveryInstance.methods.id().call();
        const desc = await deliveryInstance.methods.description().call();
        console.log(status, id, desc);
      }
    }
  }  
};
        
</script>

<style>

.job.Delivered{
  border-left: 4px solid #3CD1C2;
}
.job.Collected{
  border-left: 4px solid yellow;
}
.job.Pending{
  border-left: 4px solid orange;
}

.v-chip.v-chip--no-color.theme--light.Delivered {
  background: #3CD1C2;
}
.v-chip.v-chip--no-color.theme--light.Collected{
  background: yellow;
}
.v-chip.v-chip--no-color.theme--light.Pending{
  background: orange;
}

</style>

