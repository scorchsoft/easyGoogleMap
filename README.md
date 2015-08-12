#Setup Steps

##1) Firstly include the maps API like so:

`<script type='text/javascript' src="https://maps.googleapis.com/maps/api/js?v=3.6&sensor=false&callback=initialize&key=XXX"></script>`
You will also need JQuery installed on the page

You can get an API key like so:
https://developers.google.com/maps/documentation/javascript/tutorial#api_key

##2)Include this script on any pages you would like a map on

##3) Put HTML onto the page to set the map address and marker.

Example HTML for the page to create a map:

`<div class="quickGoogleMap" id="contactGoogleMap"
data-address="ADDRESS HERE"
data-show-marker="1"
data-marker-lat="52.440983"
data-market-long="-1.865927"
data-type="ROADMAP"
data-zoom="13"></div>`
Minimum setup example (simplest implementation)

`<div class="quickGoogleMap" id="contactGoogleMap" data-address="ADDRESS HERE"></div>`
Info window examples:

with info window on map pin click:

`<div class="quickGoogleMap" id="contactGoogleMap" data-address="ADDRESS HERE">
<h2>My info window title</h2>
<p>Some info window text</p>
</div>`
Auto show the info window without pin click:

`<div class="quickGoogleMap" id="contactGoogleMap"
data-address="ADDRESS HERE"
data-auto-show-infowindow="1" >
<h2>My inf window title</h2>
<p>Some info window text</p>
</div>`
## 4) Make sure you have set the height and width of the map container div so that the map will display ok.

Data Fields Explained

**data-address***
The postal data address that the map is to center on

**data-show-marker**
1 or 0. Set to determine if a map pin is to be displayed or not

**data-marker-lat & data-marker-long**
If you would like the marker to go on a different location than the map address then you can define it here.

**data-type**
The style of map to display. Options: ROADMAP, SATELLITE, HYBRID, TERRAIN

**data-zoom**
How far to zoom in on the map. Set between 1 and 14

**data-auto-show-infowindow**
1 or 0. If you have set html for an info window popup then you can use this to display the popup right away without the need for the map pin to be clicked.