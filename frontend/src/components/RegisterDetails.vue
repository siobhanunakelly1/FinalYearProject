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
                    <vuetify-google-autocomplete
                        ref="address"
                        id="map"
                        classname="form-control"
                        placeholder="Please type your address"
                        v-on:placechanged="getAddressData"
                        outlined
                        country="ie"
                    >
                    </vuetify-google-autocomplete>
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

    export default {
        data() {
            return {
                user: null,
                companyName: "",
                ethereum: "", 
                address: "",
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
                ref = firebase.database().ref('TransportCompany/Customers/' + userID);
                ref.set({
                    'Company': this.companyName,
                    'EthereumAccount': this.ethereum,
                    'Address': this.address

                });
                this.$router.replace({name: "Dashboard"});
            },
            getAddressData: function (addressData) {
                this.address = addressData;
            }
        }   
    }
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}
</style>