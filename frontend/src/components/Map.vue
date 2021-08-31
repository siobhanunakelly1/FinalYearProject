<template>
    <v-container>
        <v-row>
        <v-col justify="center">
            <div v-if = "!admin">
                Click marker to choose destination.
            </div>
            <div class = "primary--text" v-else>
                <h1 class="primary--text">
                    <span class="font-weight-light">Our Customers</span>
                </h1>
            </div>
            <GmapMap
                :center="{lat:53.4239, lng:-7.95}"
                :zoom="6.5"
                map-type-id="terrain"
                style="width: 600px; height: 500px"
            >
            
                <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :icon="icon"
                        :title="m.title"
                        :clickable="true"
                        @click="selectedMarker=m; custComp=m.title; custAdd=m.address"
                />
                <GmapMarker
                        :position="userPosition"
                        :title="label"
                />
            </GmapMap>

        </v-col>
        <v-col v-if = "!admin" class = "ma-10" align = "left">
            <div><strong>From:</strong> {{userComp + ", " + userAddress}}</div>
            <div><strong>To:</strong> {{custComp + ", " + custAdd}}</div>
            <v-checkbox
                v-model="checkbox"
                label="Overnight"
                color = "primary"
            ></v-checkbox>
            <v-btn color = "accent" class = "mt-3" elevation="2" @click="calculate">Calculate</v-btn>
            <h1 class = "primary--text">Cost: €{{cost}}</h1>
        </v-col>
        <v-col v-else>
            <v-btn @click="dialog=true">
                <v-icon>settings</v-icon>
            </v-btn>  
        </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
            <v-card-title>
                <h2 class="primary--text font-weight-light">Pricing</h2>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
                Price per km:
                <v-text-field v-model="price" outlined></v-text-field>
                Overnight Extra:
                <v-text-field v-model="overnight" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color = "accent" @click="updatePrices">Save</v-btn>
                <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import firebase from 'firebase';
import shared from '../shared';


export default {
    data() {
        
        return{
            userPosition: {
                lat: 0,
                lng: 0
            },
            userComp: '',
            userAddress: '',
            custComp: '',
            custAdd: '',
            label: 'You are here',
            icon: {
                    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "blue",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 1
                },
            markers:[],
            distance: '',
            selectedMarker: null,
            cost: '',
            checkbox: false,
            admin: true,
            dialog: false,
            price: '',
            overnight: ''
        }
    },
    beforeMount(){
       firebase.auth().onAuthStateChanged(user => {
           if(user){
               var dbRef = firebase.database().ref('TransportCompany/Customers');
                dbRef.once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key;
                        if( childKey === user.uid){
                        this.admin = false;
                        }
                    });
                }).then(() => {
                    if(!this.admin){
                        var senderRef = firebase.database().ref("TransportCompany/Customers/" + user.uid);
                        senderRef.on('value', (snapshot) => {
                            var s = snapshot.val();
                            this.userAddress = s.Address.name;
                            this.userComp = s.Company;
                            this.userPosition.lat = s.Address.latitude;
                            this.userPosition.lng = s.Address.longitude;
                        });
                    }
                    var customersRef = firebase.database().ref('TransportCompany/Customers/');
                        customersRef.once('value', (snapshot) =>{
                            snapshot.forEach((childSnapshot) => {
                                if(childSnapshot.key != user.uid){
                                    var childData = childSnapshot.val();
                                    var custName = childData.Company;
                                    var custAdd = childData.Address.name;
                                    var custLat = childData.Address.latitude;
                                    var custLng = childData.Address.longitude;
                                    this.markers.push({
                                        position: {
                                            lat: custLat,
                                            lng: custLng
                                        },
                                        title: custName,
                                        address: custAdd
                                    })
                                }
                                
                            });
                        });
                }) 
                
           }
       });
       
    },
    methods: {
        async calculate(){
            var distance = await shared.distance(this.userPosition, this.selectedMarker.position);
            this.cost = shared.cost(distance, this.checkbox);
            
            this.custAdd = this.selectedMarker.address;
        },
        updatePrices(){
            var dbRef = firebase.database().ref('TransportCompany/Price');
            dbRef.set(this.price);
            var dbRef2 = firebase.database().ref('TransportCompany/Overnight');
            dbRef2.set(this.overnight);
        }
    }
    
}
</script>