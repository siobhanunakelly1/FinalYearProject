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
        <v-spacer></v-spacer>
        <BookDelivery/>
      </v-layout>

      <v-card flat class="pa-3" v-for="job in jobs" :key="job.number">
        <v-layout row :class="`pa-3 job ${job.Status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Job Number</div>
            <div>1</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Description</div>
            <div> {{ job.Description }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Collection From</div>
            <div> {{ job.Sender }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Deliver To</div>
            <div> {{ job.Buyer }}</div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2 sm4 md2>
            <v-spacer></v-spacer>
            <v-chip small :class="`${job.Status} white--text my-2 caption`">{{ job.Status }}</v-chip>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>


import firebase from 'firebase';
import delivery from '../../contracts/DeliveryInstance';
import deliveries from '../../contracts/DeliveriesInstance';
import BookDelivery from './BookDelivery.vue'


export default {
  components: { BookDelivery },
  data() {
    return {
      user: '',
      deliveryInstances: [],
      jobs: [],
      deliveries: ''
    }
  },
  mounted() {
    firebase.default.auth().onAuthStateChanged(user => {
        this.user = user;
    });
    this.getAllDeliveryInstances().then(() => {
      this.getDeliveryDetails();
    });
  },
  methods: {
    async getAllDeliveryInstances(){
      var contractAddresses = await deliveries.methods.returnAllDeliveries().call();
      let i;
      for (i = 0; i < contractAddresses.length; i++) {
        var delInst = await delivery(contractAddresses[i]);
        this.deliveryInstances.push(delInst);
      }
    },
    async getDeliveryDetails(){
      var dbRef = firebase.database().ref('TransportCompany/Customers');
      var sender;
      var buyer;
      let i;
      for (i = 0; i < this.deliveryInstances.length; i++) {
        var senderEth = await this.deliveryInstances[i].methods.seller().call();
        var buyerEth = await this.deliveryInstances[i].methods.buyer().call();
        
        dbRef.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.val();
            if(childData.EthereumAccount === senderEth){
              console.log(childData.Company);
              sender = childData;
            }

            if(childData.EthereumAccount === buyerEth){
              console.log(childData.Company);
              buyer = childData;
            }
          });
        });

        
        var description = await this.deliveryInstances[i].methods.description().call();
        var status = await this.deliveryInstances[i].methods.status().call();
        this.jobs.push({
          'Sender': sender,
          'Buyer': buyer,
          'Description': description,
          'Status': status
        });

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
.job.Created{
  border-left: 4px solid orange;
}

.v-chip.v-chip--no-color.theme--light.Delivered {
  background: #3CD1C2;
}
.v-chip.v-chip--no-color.theme--light.Collected{
  background: yellow;
}
.v-chip.v-chip--no-color.theme--light.Created{
  background: orange;
}

</style>

