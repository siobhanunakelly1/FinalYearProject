<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            Enter Your Details {{user.displayName}}
            <div>
                <input type="radio" id="customer" value="Customer" v-model="picked">
                <label for="customer">Customer</label>
                <input type="radio" id="admin" value="Administrator" v-model="picked">
                <label for="admin">Administrator</label>
            </div>
            <div>
                
            </div>
            <div class="ethereum">
                <input v-model="ethereum" placeholder="Ethereum Account">
            </div>
            <div v-if="this.picked === 'Customer'">
                <input v-model="companyName" placeholder="Company Name">
                <textarea v-model="address" placeholder="Address"></textarea>
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import firebase from "firebase"

//import "firebase/auth";
    export default {
        data() {
            return {
                user: null,
                name: "",
                companyName: "",
                ethereum: "", 
                address: "",
                picked: "Seller",
                error: ""
            }
        },
        created(){
        this.user = firebase.auth().currentUser;
        },
        methods: {
            async pressed(){
                var userID = firebase.auth().currentUser.uid;
                let ref;
                if(this.picked === 'Administrator'){
                    ref = firebase.database().ref('/transporters/' + userID);
                    ref.set({
                        'Ethereum Account': this.ethereum
                    });
                }else if(this.picked === 'Customer'){
                    ref = firebase.database().ref('/sellers/' + userID);
                    ref.set({
                        'Company': this.companyName,
                        'EthereumAccount': this.ethereum,
                        'Address': this.address

                    });
                }
                this.$router.replace({name: "Dashboard"});
            }
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
textarea {
    width: 400px;
    padding-top: 10px;
    padding-inline: 30px;
    margin: 20px;
    font-size: 21px;
}
input[type = "radio"] {
    width: 30px;
    padding: 0px;
    margin-right: 0%;
    font-size: 21px;
}
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
</style>