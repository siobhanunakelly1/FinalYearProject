

export default {
    distance: async function(origins, destinations) {
        const google = window.google;
        var distanceService = new google.maps.DistanceMatrixService();
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
    cost: function(distance){
        return distance*8;
    }
}