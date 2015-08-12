/**
 * Scorchsoft easyGoogleMap v1.0
 * Author: Andrew Ward
 * Date: 12/08/2015
 *
 * This is a simple javascript module for display a map
 * on a page, with a pin on it and an info window.  *
 *
 * **************
 * *** SET UP ***
 * **************
 *
 * 1) Firstly include the maps API like so:
 * <script type='text/javascript' src="https://maps.googleapis.com/maps/api/js?v=3.6&sensor=false&callback=initialize&key=XXX"></script>
 * You will also need JQuery installed on the page
 *
 * You can get an API key like so:
 * https://developers.google.com/maps/documentation/javascript/tutorial#api_key
 *
 * 2)Include this script on any pages you would like a map on
 *
 * 3) Put HTML onto the page to set the map address and marker.
 * Example HTML for the page to create a map:
 *
 *      <div class="quickGoogleMap" id="contactGoogleMap"
 *           data-address="ADDRESS HERE"
 *           data-show-marker="1"
 *           data-marker-lat="52.440983"
 *           data-market-long="-1.865927"
 *           data-type="ROADMAP"
 *           data-zoom="13"></div>
 *
 *
 *      Minimum setup example (simplest implementation)
 *      <div class="quickGoogleMap" id="contactGoogleMap" data-address="ADDRESS HERE"></div>
 *
 *      Info window examples:
 *
 *      with info window on map pin click:
 *      <div class="quickGoogleMap" id="contactGoogleMap" data-address="ADDRESS HERE">
 *          <h2>My info window title</h2>
 *          <p>Some info window text</p>
 *      </div>
 *
 *      Auto show the info window without pin click:
 *      <div class="quickGoogleMap" id="contactGoogleMap"
 *           data-address="ADDRESS HERE"
 *           data-auto-show-infowindow="1" >
 *              <h2>My inf window title</h2>
 *              <p>Some info window text</p>
 *      </div>
 *
 *
 *  4) Make sure you have set the height and width of the map container div so that
 *  the map will display ok.
 *
 *  *****************************
 *  *** Data Fields Explained ***
 *  *****************************
 *
 *  data-address
 *  The postal data address that the map is to center on
 *
 *  data-show-marker
 *  1 or 0. Set to determine if a map pin is to be displayed
 *  or not
 *
 *  data-marker-lat & data-marker-long
 *  If you would like the marker to go on a different location
 *  than the map address then you can define it here.
 *
 *  data-type
 *  The style of map to display. Options:
 *  ROADMAP, SATELLITE, HYBRID, TERRAIN
 *
 *  data-zoom
 *  How far to zoom in on the map. Set between 1 and 14
 *
 *  data-auto-show-infowindow
 *  1 or 0. If you have set html for an info window popup then you
 *  can use this to display the popup right away without the need for
 *  the map pin to be clicked.
 *
 **/
var $ = jQuery;

var quickGoogleMaps = function(){

    var count;
    var maps=[];
    var root = this;
    var baseMap;

    this.construct = function(){
        //now initialise the maps
        this.initMaps();
    };

    this.initMaps = function(){

        var i = 0;

        $('.quickGoogleMap').each(function(){


            var opt = {}

            //load values from the map html code on the page

            //container ID must be unique
            opt.containerID = $(this).prop('id');
            opt.address = $(this).data('address');

        console.log($(this).data('auto-show-infowindow'));

            if($(this).data('auto-show-infowindow') == undefined || $(this).data('auto-show-infowindow') != '1'){
                opt.autoShowInfowindow = false;
            }else{
                opt.autoShowInfowindow = true;
            }

            if($(this).html() != undefined && $(this).html != ''){
                opt.infoContent = $(this).html();
            }else{
                opt.infoContent = '';
            }

            if($(this).data('zoom') == undefined){
                opt.zoom = 14;
            }else{
                opt.zoom = $(this).data('zoom');
            }

            if($(this).data('show-marker') == undefined){
                opt.showMarker = 0;
            }else{
                opt.showMarker = $(this).data('show-marker');
            }


            if(opt.showMarker != undefined && opt.showMarker == "1"){
                opt.markerLat = $(this).data('marker-lat');
                opt.markerLong = $(this).data('marker-long');
                opt.showMarker = true;
            }else{
                opt.showMarker = false;
                opt.markerLat = 0;
                opt.markerLong = 0;
            }



            if( $(this).data('type') != undefined){
                switch( $(this).data('type').toLowerCase()){

                    case 'roadmap':
                        opt.type = google.maps.MapTypeId.ROADMAP;
                        break;

                    case 'hybrid':
                        opt.type = google.maps.MapTypeId.HYBRID;
                        break;

                    case 'terrain':
                        opt.type = google.maps.MapTypeId.TERRAIN;
                        break;

                    case 'satellite':
                    default:
                        opt.type = google.maps.MapTypeId.SATELLITE;
                        break;
                }
            }else{
                opt.type = google.maps.MapTypeId.SATELLITE;
            }


            root.initSingleMap(opt);
            count = count + 1;
            i = i + 1;
        });
    }

    this.initSingleMap = function(opt){
        this.getLongLat(opt, opt.address, function(opt,  coordsArray){
            root.initSingleMapHelper(opt,  coordsArray);
        });
    }

    /**
     * This function is configured to run once the long and lat
     * positions have been found
     * @param opt = map options
     * @param coords = the long lat values
     */
    this.initSingleMapHelper = function(opt, coords){


        var latLong = new google.maps.LatLng(coords[0], coords[1]);

        var thisMap = maps[maps.length] = new google.maps.Map(document.getElementById(opt.containerID), {
            zoom: opt.zoom,
            center: latLong,
            mapTypeId: opt.type
        });


        if(opt.showMarker){

            //default to map address/locale should no custom long or lat be set
            if(opt.markerLat != undefined && opt.markerLong != undefined){
                var latLongMarker = new google.maps.LatLng(opt.markerLat, opt.markerLong);
            }else{
                var latLongMarker = latLong;
            }

            var marker = new google.maps.Marker({
                position: latLongMarker,
                map: thisMap,
                title: 'Location'
            });

            console.log('INFO');
            console.log(opt.infoContent);
            console.log(opt.autoShowInfowindow);

            //only show the info window if some data has been set
            if(opt.infoContent != undefined && opt.infoContent.trim() != ''){

                var infowindow = new google.maps.InfoWindow({
                    content: opt.infoContent
                });

                //clicking the market controls it.
                marker.addListener('click', function() {
                    infowindow.open(thisMap, marker);
                });


                if(opt.autoShowInfowindow){
                    infowindow.open(thisMap, marker);
                }
            }




        }

    }


    this.getLongLat = function(opt, address, callbackfunction){

        var coords = {
            latlng : '0,0'
        };


        var custom_map = new google.maps.Geocoder();
        custom_map.geocode({address: address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
                    coords.latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                } else {
                    coords.latlng = results[0].geometry.location.toString();
                    coords.latlng = coords.latlng.replace(/\(\)/g, '');
                }
            } else {
                console.log('Problem getting long and lat data from address');
            }

            var coordsArray= coords.latlng.split(',');

            //callback to run once long and lat positions are known.
            callbackfunction(opt,  coordsArray);

        });

    }

    this.construct();
};

function initialize() {
    //this will get run as soon as the Google maps code intialises
    //it calls based on the function name in the script include
    var maps = new quickGoogleMaps();
}