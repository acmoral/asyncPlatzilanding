
var map;
function initMap(){
    const location = { lat: -25.344, lng: 131.031 };
    map = new google.maps.Map(document.getElementById("map"),{zoom:4,center:location,mapId:'47a8e1278757ffad'});
}
window.initMap = initMap();

