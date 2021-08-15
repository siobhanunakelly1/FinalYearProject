<template>
    <div>
        <v-card class="mx-auto my-15 pa-10" max-width="500" elevation = 5>
            <v-card-title class="text-uppercase grey--text">
                Company Details
            </v-card-title>
            <v-card-text>
                <div v-if="error" class="error">{{error.message}}</div>
                <v-form  class="px-3">
                    <v-text-field label = "Company Name" v-model="companyName" outlined></v-text-field>
                    <v-text-field label = "Address" v-model="address" outlined></v-text-field>
                    <v-text-field label = "Ethereum Account" v-model="ethereum" outlined>
                        <template v-slot:append>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                    mdi-help-circle-outline
                                </v-icon>
                                </template>
                                You must have an Ethereum Wallet to register for this service.
                            </v-tooltip>
                            </template>
                    </v-text-field>
                    <v-btn class = "mt-3" elevation="2" @click="pressed">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
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