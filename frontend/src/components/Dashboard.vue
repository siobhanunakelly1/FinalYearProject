<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class ="card-head">
            <button @click="createDelivery">Create</button>
          </div>
          <div class="card-body"> 
            <ul id="example-1">
              Deliveries
              <li v-for="item in deliveries" :key="item.EthAddress">
                Delivery {{ item }}
              </li>
            </ul>         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import firebase from 'firebase';
//import web3 from '../../contracts/web3-metamask';
import delivery from '../../contracts/DeliveryInstance';
//import deliveries from '../../contracts/DeliveriesInstance';
import { mapGetters } from "vuex";

let deliveriesRef;
let contractList = [];

export default {
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
        deliveries: contractList
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

