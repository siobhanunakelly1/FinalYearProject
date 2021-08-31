import firebase from 'firebase'

export default {
    distance: async function(origins, destinations) {
        const google = await window.google;
        var distanceService = await new google.maps.DistanceMatrixService();
        var distanceMatrix = await distanceService.getDistanceMatrix({
            origins: [origins],
            destinations: [destinations],
            travelMode: 'DRIVING'
        },
        function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log('Error:', status);
            } 
        });
        return distanceMatrix.rows[0].elements[0].distance.value/1000;
    },
    cost: function(distance, overnight){
        var price;
        var priceRef = firebase.database().ref('TransportCompany/Price');
        priceRef.on('value', (snapshot) => {
            price = snapshot.val();
        });

        var overnightRate;
        var overnightRef = firebase.database().ref('TransportCompany/Overnight');
        overnightRef.on('value', (snapshot) => {
            overnightRate = snapshot.val();
        });

        var cost = distance * parseInt(price);
        if(overnight){
            cost= cost + parseInt(overnightRate);
        }
        return cost.toFixed(0);
    }
}