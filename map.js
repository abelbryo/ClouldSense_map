var map; // Reference to base google map

var WIDTH = 547; 
var HEIGHT = 330;

/**
 * The raster tiles from Geoserver. It is made global to make it
 * easy to debug from browser.
 * This is a WMS service and the request should comply with WMS standards
 * as shown in the url below.
 */
var tuasTiles = new google.maps.ImageMapType( {

    getTileUrl: function (coord, zoom) {
            var proj = map.getProjection(); 
            var zoomFactor = 1 << zoom; // 2^zoom

            var top = proj.fromPointToLatLng(
                    new google.maps.Point(coord.x * WIDTH / zoomFactor, coord.y * HEIGHT / zoomFactor));
            var bottom = proj.fromPointToLatLng(
                    new google.maps.Point((coord.x + 1) * WIDTH / zoomFactor, (coord.y + 1) * HEIGHT / zoomFactor));

            var bbox = top.lng()+","+
                        bottom.lat()+","+
                        bottom.lng()+","+
                        top.lat();

            /* WMS request url */
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
        isPng: true,
        name: "TUAS Talo",
        opacity: 0.8

    });

function init(){
    detectBrowser();  // Different layouts for mobile and desktop
    var mapOptions = {
        center: new google.maps.LatLng(60.18718, 24.81886),
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.overlayMapTypes.push(tuasTiles);

    var opacity = new OpacityControl(tuasTiles);
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(opacity.getElement());
} 

/**
 * We will have different layouts based on device i.e. phone vs desktop. 
 */
function detectBrowser(){
    var userAgent = navigator.userAgent;
    var mapdiv = document.getElementById('map_canvas');

    if(userAgent.indexOf('iPhone') != -1 || userAgent.indexOf('Android') != -1){
        mapdiv.style.width="100%";
        mapdiv.style.height="100%";
    }else{
        mapdiv.style.width="1200px";
        mapdiv.style.height="800px";
    }
}

