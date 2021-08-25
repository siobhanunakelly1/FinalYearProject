<template>
    <v-container>
        <v-row justify="center">
            <GmapMap
                :center="{lat:53.4239, lng:-7.95}"
                :zoom="6.5"
                map-type-id="terrain"
                style="width: 800px; height: 600px"
            >
            
                <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :icon="icon"
                        :title="m.title"
                        :clickable="true"
                        @click="selectedMarker=m"
                />
                <GmapMarker
                        :position="userPosition"
                        :title="label"
                />
            </GmapMap>

        </v-row>
        <v-row justify="center">
            <v-btn class = "mt-3" elevation="2" @click="calculate">Calculate</v-btn>
        </v-row>
        <v-row justify="center">
            <h1>Cost: €{{cost}}</h1>
        </v-row>
    </v-container>
</template>

<script>
import firebase from 'firebase';
import shared from '../shared';


export default {
    data() {
        
        return{
            userPosition: {
                lat: '',
                lng: ''
            },
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
            cost: ''
        }
    },
    beforeMount(){
       firebase.auth().onAuthStateChanged(user => {
           if(user){
                var senderRef = firebase.database().ref("TransportCompany/Customers/" + user.uid);
                senderRef.on('value', (snapshot) => {
                    var s = snapshot.val();
                    this.userPosition.lat = s.Address.latitude;
                    this.userPosition.lng = s.Address.longitude;
                });

                var customersRef = firebase.database().ref('TransportCompany/Customers/');
                customersRef.once('value', (snapshot) =>{
                    snapshot.forEach((childSnapshot) => {
                        if(childSnapshot.key != user.uid){
                            var childData = childSnapshot.val();
                            var custName = childData.Company;
                            var custLat = childData.Address.latitude;
                            var custLng = childData.Address.longitude;
                            this.markers.push({
                                position: {
                                    lat: custLat,
                                    lng: custLng
                                },
                                title: custName
                            })
                        }
                        
                    });
                });
           }
       });
       
    },
    methods: {
        async calculate(){
            var distance = await shared.distance(this.userPosition, this.selectedMarker.position);
            this.cost = shared.cost(distance);
        }
    }
    
}
</script>