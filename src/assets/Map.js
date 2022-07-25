
function initMap(){
    const location = { lat: -25.344, lng: 131.031 };
    var map = new google.maps.Map(document.getElementById("map"),{zoom:4,center:location});
    return map;
}

window.initMap = initMap();

