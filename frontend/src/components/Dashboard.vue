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
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Description</div>
            <div> {{ job.Description }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Collection From</div>
            <div> {{ job.Sender.Company }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Deliver To</div>
            <div> {{ job.Buyer.Company }}</div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2 sm4 md2>
            <v-spacer></v-spacer>
            <v-chip small :class="`${job.Status} white--text my-2 caption`">{{ job.Status }}</v-chip>
            <v-menu
              top
              :close-on-click="closeOnClick"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon 
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="selectSection(item, job.ContractInstance)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
      deliveries: '',
      menuItems: [
        { title: 'Collected' },
        { title: 'Delivered' }
      ],
      closeOnClick: true
    }
  },
  beforeMount() {
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
      console.log(contractAddresses);
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
          'ContractInstance': this.deliveryInstances[i],
          'Sender': sender,
          'Buyer': buyer,
          'Description': description,
          'Status': status
        });

      }
    },
    selectSection(item, instance) {
      switch(item.title) {
        case 'Collected':
          this.collected(instance);
          break
        case 'Delivered':
          console.log('Delivered')
      }
    },
    async collected(instance) {
      instance.methods.collected().send({
        from: '0xe90a1BD2f2b82b540F1975eA288AFe0b47ed1884'
      }).then(() => {
        console.log("Delivery has been collected");
      });
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

