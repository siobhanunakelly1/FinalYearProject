<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class ="card-head">
            <button @click="createDelivery">Create</button>
          </div>
          <div class="card-body">          
            <div class="list">
              <ul id="example-1">
                <li v-for="item in list" :key="item">
                  <b>Contract Address:</b> {{ item.address  }} <b>Status: </b>{{item.status}}
                  <br>
                </li>
              </ul>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};*/

import firebase from 'firebase';
import web3 from '../../contracts/web3-metamask';
import delivery from '../../contracts/DeliveryInstance';
import deliveries from '../../contracts/DeliveriesInstance';


    export default {
        data() {
            return {
                user: null,
                deliveryAddress: '',
                deliveries: '',
                listDeliveries: '',
                list: [

                ],
                template: `
                <div class = "hello">
                  <div class="card1">
                    <div class="card-body">
                      <span>Number:</span> #:number#<br>
                      <span>Collection Address:</span> #:coll#<br>
                      <span>Delivery Address:</span> #:dest#<br>
                      
                    </div>
                  </div>
                </div>

                  `,

              }
            
        },
        created(){
        this.getAllDeliveries();
        firebase.default.auth().onAuthStateChanged(user => {
          console.log(user);
          if (user) {
                this.user = user;
                
             } else {
                this.user = null;
                }
              }); 
        },
        methods: {
          async createDelivery(){
              //this.$router.replace({name: "newDelivery"});

              web3.eth.getAccounts().then((accounts) => {
                return deliveries.methods.createDelivery('0x10863742Fd543f441325588c35f81517ef08A7f9', '0xd86Fdd7BC008dA187c9e52934f975ABbc9d492fd')
                .send({from: accounts[0]});
              }).then(() => {
                return deliveries.methods.returnAllDeliveries().call();
              }).then((listDeliveries) => {
                this.listDeliveries = listDeliveries;
                const index = listDeliveries.length -1;
                console.log(listDeliveries.length);
                this.deliveryAddress = listDeliveries[index];
                console.log(this.deliveryAddress);
                const deliveryInstance = delivery(listDeliveries[index]);
                return deliveryInstance.methods.status().call();
              }).then((status) => {
                console.log(status);
              }).catch((err) => {
                 console.log(err);
              });
            },
            async getAllDeliveries(){
              var allDeliveries = await deliveries.methods.returnAllDeliveries().call();
              var i;
              for(i = 0; i < allDeliveries.length; i++){
                const deliveryInstance = delivery(allDeliveries[i]);
                var status = await deliveryInstance.methods.status().call();
                const deliveryView = {
                  address: allDeliveries[i], status: status
                }
                this.list.push(deliveryView);
              }
              
            }
            
          }  
        
    };
        
</script>

<style>
#app {
  width: 95%;
  min-width: 360px;
  margin: 0 auto;
  font-family: 'helvetica';
}

.k-listview {
 
 background: #7bd3cc;
 

}

.buttons {
  margin-left: 3%;
  margin-right: 80%;
  display: inline-block;
}


.card1 {
  background: #fff;
  font-size: 16px;
  width: 85%;
  min-width: 286px;
  margin: 2em auto;
  padding: 1.25em;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
}

.card {
  background: #fff;
  width: 85%;
  min-width: 286px;
  margin: 2em auto;
  padding: 1.25em;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
}

.card-body span {
  width: 300px;
  display: inline-block;
  font-weight: bold;
}

li {
  margin: 0 0 3px 0;
  font-size: 14px;
}


</style>

