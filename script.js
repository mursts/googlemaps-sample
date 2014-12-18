var currentInfoWindow = null;

function initialize(markers) {
    var myLatlng = new google.maps.LatLng(35.170911, 136.881537);
    var mapOptions = {
        zoom: 14,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
    var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    var lineCoordinates = [];
    for(var i in markers) {
        var m = markers[i];
        var latlng = new google.maps.LatLng(m.y, m.x);
        var obj =  {
            position: latlng,
            map: map,
            title: m.name,
        };
        var marker = new google.maps.Marker(obj);
        infoBox(map, marker, m);

        lineCoordinates.push(latlng);
    }

    var line = new google.maps.Polyline({
        path: lineCoordinates,
        icons: [{
            icon: lineSymbol,
            offset: '100%',
        }],
        map: map,
    });
}

function infoBox(map, marker, data) {
    var infoWindow = new google.maps.InfoWindow({
        content: data.name,
        size: new google.maps.Size(500, 500),
    });
    google.maps.event.addListener(marker, "click", function(e) {
        if(currentInfoWindow != null) {
            currentInfoWindow.close();
        }
        currentInfoWindow = infoWindow;

        infoWindow.open(map, marker);
    });
}

$(function() {
    var url = "http://express.heartrails.com/api/json?jsonp=?";
    $.getJSON(url, {
        method: "getStations",
        line: "名古屋市東山線",
    }, function(response) {
        var data = [];
        var station = response.response.station;
        if(station) {
            for(var i = 0; i < station.length; i++) {
                data.push(station[i]);
            }
        }
        initialize(data);
    });
});
