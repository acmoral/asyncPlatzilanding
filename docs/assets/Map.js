
var map;
function initMap(){
    const location = { lat: -25.344, lng: 131.031 };
    map = new google.maps.Map(document.getElementById("map"),{zoom:4,center:location,mapId:'47a8e1278757ffad'});
    map.data.addListener('click', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: `#${Math.floor(Math.random()*16777215).toString(16)}`});
     });
    map.data.addListener('mouseover', function(event){
      map.data.overrideStyle(event.feature,{fillOpacity:0.5,strokeColor:"black"});  
    });
    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
      });
}
window.initMap = initMap();

