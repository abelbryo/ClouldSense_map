 var map;
function init(){
    var mapOptions = {
        center: new google.maps.LatLng(60.18718, 24.81886),
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var WIDTH = 547; 
    var HEIGHT = 330;


    var tuasTiles = new google.maps.ImageMapType( {

        getTileUrl: function (coord, zoom) {
                        var proj = map.getProjection(); 
                        var zoomFactor = 1 << zoom; // Math.pow(2, zoom); 

                        var top = proj.fromPointToLatLng(
                            new google.maps.Point(coord.x * WIDTH / zoomFactor, coord.y * HEIGHT / zoomFactor));
                        var bottom = proj.fromPointToLatLng(
                            new google.maps.Point((coord.x + 1) * WIDTH / zoomFactor, (coord.y + 1) * HEIGHT / zoomFactor));

                        var bbox = top.lng()+","+
                                   bottom.lat()+","+
                                   bottom.lng()+","+
                                   top.lat();
        
                    // WMS url
                    var url = "http://localhost:8080/geoserver/cite/wms?";
                    url += "SERVICE=WMS";
                    url += "&VERSION=1.1.1";
                    url += "&REQUEST=GetMap";
                    url += "&LAYERS=" + "cite:tuas_pyramid";
                    url += "&FORMAT=image/png";
                    url += "&BGCOLOR=0xFFFFFF";
                    url += "&TRANSPARENT=TRUE";
                    url += "&SRS=EPSG:4326";
                    url += "&BBOX="+bbox; 
                    url += "&WIDTH="+WIDTH; 
                    url += "&HEIGHT="+HEIGHT;

                    return url;
        }, 

        tileSize: new google.maps.Size(WIDTH, HEIGHT), 
        isPng: true
    });

    map.overlayMapTypes.push(tuasTiles);
}
