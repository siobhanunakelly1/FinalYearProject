<template>
<div>
  <v-dialog v-model="dialog" width ="600px">
      <template v-slot:activator="{ on }">
      <v-btn  v-on="on" small text color="grey">
          <v-icon class="primary--text" left small>add</v-icon>
          <span class="primary--text">New Delivery</span>
      </v-btn>
      </template>
      <v-card>
          <v-card-title>
              <h2 class="primary--text font-weight-light">Book Delivery</h2>
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
              <v-checkbox
                v-model="checkbox"
                label="Overnight"
                color = "primary"
            ></v-checkbox>
              <div>
                <v-btn color = "accent" @click="pressed">Book</v-btn>
                <v-btn color="primary" text @click="dialog = false">Close</v-btn>
              </div>
          </v-card-text>
          <v-card-actions>
              <div justify = center>
              Recipient not listed?
              <v-btn small color="accent" dark @click="dialog2 = !dialog2">Invite Them</v-btn>
              </div>
          </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
            <v-card-title>
                <h2 class="primary--text font-weight-light">Invite</h2>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
                <v-text-field label = "Recipient Name" v-model="name" outlined></v-text-field>
                <v-text-field label = "Recipient Email" v-model="email" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color = "accent"  @click="sendEmail">Send Invite</v-btn>
                <v-btn color="primary" text @click="dialog2 = false">Close</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    >
        Email Sent.
    </v-snackbar>
</div>
</template>

<script>

import firebase from "firebase";
import deliveries from '../../contracts/DeliveriesInstance';
import emailjs, {init}  from 'emailjs-com';
import shared from '../shared';

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
            dialog: false,
            dialog2: false,
            deliveryAddress: '',
            email: '',
            name: '',
            snackbar: false,
            timeout: 2000,
            origin: {
                lat: 0,
                lng: 0
            },
            destination: {
                lat: 0,
                lng: 0
            },
            checkbox: false
        }
    },
    async mounted() {
        await firebase.default.auth().onAuthStateChanged(user => {
                this.user = user;
            });
        var customersRef = firebase.database().ref('TransportCompany/Customers/');
        customersRef.once('value', (snapshot) =>{
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                if(childSnapshot.key != this.user.uid){
                    var ethAcc = childData.EthereumAccount;
                    var comp = childData.Company;
                    var lat = childData.Address.latitude;
                    var lng = childData.Address.longitude;
                    this.customerList.push({ethAcc, comp, lat, lng});
                }
            });
        });

        var senderRef = firebase.database().ref("TransportCompany/Customers/" + this.user.uid);
            senderRef.on('value', (snapshot) => {
                var s = snapshot.val();
                this.sender = s.EthereumAccount;
                this.origin.lat = s.Address.latitude
                this.origin.lng = s.Address.longitude;
            });

            var transporterRef = firebase.database().ref("TransportCompany/EthereumAccount");
            transporterRef.on('value', (snapshot) => {
                this.transporter = snapshot.val();
            });
    },
    methods: {
        async pressed(){

            this.recipient = this.select.ethAcc;
            this.destination.lat = this.select.lat;
            this.destination.lng = this.select.lng;

            var distance = await shared.distance(this.origin, this.destination);
            var cost = shared.cost(distance, this.checkbox);
            deliveries.methods.createDelivery(this.transporter, this.recipient, this.description, cost)
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
        },
        async sendEmail() {
            init("user_9LCMBgvoDCWBJPANp5yls");
            try {
                await emailjs.send('service_lgulh7n', 'template_n0czcty', {
                to_name: this.name,
                to_email: this.email
                })
                this.snackbar = true;
                this.dialog2 = false;
                this.dialog = false;

            } catch(error) {
                console.log({error})
            }
            
        }
    }

}
</script>