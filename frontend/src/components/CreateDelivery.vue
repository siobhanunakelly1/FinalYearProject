<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            New Delivery
            <div class="description">
                <input v-model= "description" placeholder="Description">
            </div>
            <div>
                <input v-model= "recieverName" placeholder="Reciever">
            </div>
            <button type = "submit">Create</button>
        </form>
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
            recieverName: '',
            //sender: '',
            error: ''
          }
        },
        methods:{
            async getCurrentUser(){
                firebase.default.auth().onAuthStateChanged(user => {
                    this.user = user;
                });
            },
            async getSenderAccount(){
                await this.getCurrentUser();
                let senderAccount;
                this.senderUid = this.user.uid;
                var dbRef = firebase.database().ref("/sellers/"+this.senderUid);
                await dbRef.once("value", snap => {
                    senderAccount = snap.val().EthereumAccount;
                    });
                this.sender = senderAccount;
                
            },
            async getRecieverAccount(){
                var name = this.recieverName;
                let account;
                let uid;
                var sellersRef = firebase.database().ref("/sellers");
                await sellersRef.once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        
                        var data = childSnapshot.val();
                        if(data.Company == name){
                            account = data.EthereumAccount;
                            uid = childSnapshot.key;
                        }
                    });
                });
                this.reciever = account;
                this.recieverUid = uid;
                console.log("Reciever UID " + this.recieverUid);
            },
            async pressed(){
                await this.getRecieverAccount();
                await this.getSenderAccount();
                console.log("Sender" +this.sender);
                console.log("Reciever" +this.reciever);
                deliveries.methods.createDelivery('0xc3BE006B92551968050247e3d021FC639505b6Ad', this.reciever)
                .send({from: this.sender
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
                var senderRef = firebase.database().ref('/sellers/' + this.senderUid + '/Deliveries');
                senderRef.push({
                        'EthereumAddress': this.deliveryAddress

                    });
                var recieverRef = firebase.database().ref('/sellers/' + this.recieverUid + '/Deliveries');
                recieverRef.push({
                        'EthereumAddress': this.deliveryAddress
                    });
                console.log(status);
                console.log("Sender" + this.sender);
                console.log("Reciever" + this.reciever);
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