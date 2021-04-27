<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
            New Delivery
            <div class="description">
                <input v-model="description" placeholder="Description">
            </div>
            <div>
                <input v-model="reciever" placeholder="Reciever">
            </div>
            <button @click="createDelivery">Create</button>
        
    </div>
</template>

<script>
//import dropdown from 'vue-dropdowns';
import firebase from 'firebase';
//import web3 from '../../contracts/web3-metamask';
import delivery from '../../contracts/DeliveryInstance';
import deliveries from '../../contracts/DeliveriesInstance';

export default {
        data() {
          return {
            user: null,
            description: '',
            error: ''
          }
        },
        methods:{
            async getSenderAccount(){
                firebase.default.auth().onAuthStateChanged(user => {
                    let uid = user.uid;
                    let dbRef = "sellers/"+uid;
                    firebase.database().ref(dbRef).once("value", snap => {
                    this.sender = snap.val().EthereumAccount;
                })

                });
                
            },
            async getRecieverAccount(){
                    
                
            },
            async createDelivery(){
                
              this.getSenderAccount().then(() => {
                deliveries.methods.createDelivery('0x10863742Fd543f441325588c35f81517ef08A7f9', this.reciever)
                .send({from: this.sender});
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
            
            created(){
                firebase.default.auth().onAuthStateChanged(user => {
                    this.user = user;

                });


            },
        }
}
        
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}
input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
</style>