<template>
  <v-dialog v-model="dialog" width ="600px">
      <template v-slot:activator="{ on }">
      <v-btn  v-on="on" small text color="grey">
          <v-icon left small>add</v-icon>
          <span class="caption">New Delivery</span>
      </v-btn>
      </template>
      <v-card>
          <v-card-title>
              <h2>Book Delivery</h2>
          </v-card-title>
          <v-card-text>
              <v-text-field label = "Description" v-model="description" outlined></v-text-field>
              <v-combobox 
                outlined
                solo
                label= "Recipient"
                v-model="select"
                :items="customerList"
                item-text="comp"
                >
              </v-combobox>
              <v-btn class = "mt-3" elevation="2" @click="pressed">Book</v-btn>
          </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>

import firebase from "firebase";
import deliveries from '../../contracts/DeliveriesInstance';

export default {
    
    data(){
        return {
            user: '',
            recipient: '',
            sender: '',
            transporter: '',
            description: '',
            customerList: [],
            select: '',
            dialog: '',
            deliveryAddress: ''
        }
    },
    mounted() {
        firebase.default.auth().onAuthStateChanged(user => {
                this.user = user;
            });
        var customersRef = firebase.database().ref('TransportCompany/Customers/');
        customersRef.once('value', (snapshot) =>{
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var ethAcc = childData.EthereumAccount;
                var comp = childData.Company;
                this.customerList.push({ethAcc, comp});
            });
        });
    },
    methods: {
        pressed(){
            var senderRef = firebase.database().ref("TransportCompany/Customers/" + this.user.uid);
            senderRef.on('value', (snapshot) => {
                var s = snapshot.val();
                this.sender = s.EthereumAccount;
            });

            var transporterRef = firebase.database().ref("TransportCompany/EthereumAccount");
            transporterRef.on('value', (snapshot) => {
                this.transporter = snapshot.val();
            });

            this.recipient = this.select.ethAcc;

            deliveries.methods.createDelivery(this.transporter, this.recipient, this.description, 1)
            .send({from:this.sender}).then(() => {
                return deliveries.methods.returnAllDeliveries().call();
            }).then((listDeliveries) => {
                const index = listDeliveries.length -1;
                this.deliveryAddress = listDeliveries[index];
            }).then(() => {
                var deliveryRef = firebase.database().ref('TransportCompany/Deliveries/');
                deliveryRef.push({
                    'EthereumAddress': this.deliveryAddress
                });
            });
            
            this.dialog = false;
        }
    },

}
</script>