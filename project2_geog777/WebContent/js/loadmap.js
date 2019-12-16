var NorthEastCorner = L.latLng(37.819547, -122.449798);
	var SouthWestCorner = L.latLng(37.779133, -122.492464);
	var map = L.map('map-canvas', {
	center:[37.799929, -122.4635829],
	zoom: 15
	//maxBounds: L.latLngBounds(NorthEastCorner, SouthWestCorner)
});

function createMap(){
    console.log("inside CreateMap function");
    
	/*var NorthEastCorner = L.latLng(37.819547, -122.449798);
	var SouthWestCorner = L.latLng(37.779133, -122.492464);
	var map = L.map('map-canvas', {
	center:[37.799929, -122.4635829],
	zoom: 15
	//maxBounds: L.latLngBounds(NorthEastCorner, SouthWestCorner)
});*/

	console.log(map);
/*L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);*/
	
	L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 18,
		ext: 'png'
	}).addTo(map)

    var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
	map.on('click', function(e){
		alert("coordinates: " + e.latlng.lat + ", " + e.latlng.lng)
	});
    var geojsonMarkerOptions2 = {
        radius: 5,
        fillColor: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };


    var myStyle = {
    "color": "black",
    "weight": 1,
    "opacity": 0.9
    } 
    
var Trails = L.geoJson(Park_Trails, {
    style: myStyle
    
}).addTo(map);    
    
    
console.log(Park_Trails);








var attraction_points = L.geoJson(attractions, {
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }, 
    onEachFeature: onEachFeature
    
    
}).addTo(map);


function onEachFeature(feature, layer){
	console.log(feature);
	//console.log(layer);
	var popupContent = "";
	popupContent += "<p><b>Name of attraction :</b> " + feature.properties.Name + "</p>";
	layer.bindPopup(popupContent);
	layer.on({
		mouseover: function(){
			this.openPopup();
			
		},
		mouseout: function(){
			this.closePopup();
		}
	});
	
}



L.geoJson(ParkingLots,{
    style: function(feature){
        return {color: "grey", fillOpacity: 1};
    }
}).addTo(map);

L.geoJson(facilities, {
    style: function(feature){
        switch(feature.properties.type){
            case 1: return {color: "blue", fillOpacity: 1};
            case 2: return {color: "purple", fillOpacity: 1};
            case 3: return {color: "yellow", fillOpacity: 1};
        }
    }
}).addTo(map);
 
function enableLocation(){    
function onLocationFound(e){
    var radius= e.accuracy/2;
    L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
    L.circle(e.latlng, geojsonMarkerOptions2).addTo(map);
}    
    map.on('locationfound', onLocationFound);
    map.locate({setView: true, maxZoom: 16});
}
    
    function closeLocaion(){
    map.off('locationfound', enableLocation().onLocationFound);
    map.locate({setView:false, center: [37.799929, -122.4635829]})
}
    
    

    
    createFilter(map, attraction_points, Trails);
   createEnableLocation(map);
   
  
   function queryReport(event) {
	   event.preventDefault(); // stop form from submitting normally
	   
	   var a = $("#Wild").serializeArray();
	   a.push({ name: "tab_id", value: "1" });
	   a = a.filter(function(item){return item.value != '';});
	   $.ajax({
	     url: 'HttpServlet',
	     type: 'POST',
	     data: a,
	     success: function(reports) {
	       alert(JSON.stringify(reports));
	       
	     	CreatePoints(reports);
	     },
	     error: function(xhr, status, error) {
	       alert("Status: " + status + "\nError: " + error);
	     }
	   });
	 }
  var report = $("#Wild").on("submit",queryReport);
  
  //console.log(JSON.stringify(report));
   //CreatePoints(map, report);
   
};


function CreatePoints(report){
	
	
	console.log(JSON.stringify(report));
	console.log("hi");
	for (var key in report){
	var wordOne = JSON.stringify(report[key].Location).replace("POINT", "").replace('\"(', "").replace(')\"', "").split(' ');
	//var FinalWord = wordOne.replace("(", '').replace(")", '').split(' ');
	var x = parseFloat(wordOne[0]);
	var y = parseFloat(wordOne[1]);
	console.log(x);
	console.log(y);
	
	
    var geojsonMarkerOptions = {
    	    radius: 8,
    	    fillColor: "#ff7800",
    	    color: "#000",
    	    weight: 1,
    	    opacity: 1,
    	    fillOpacity: 0.8
    	};
	
	var Point = L.latLng(x, y);
	console.log(map);
	L.marker(Point).addTo(map);
	
	
	
	
	}
}



function createFilter(map, attraction_points, Trails){
	$('#Attr').append('<div><button id="oldest">oldest attractions</button></div>');
	$('#Attr').append('<div><button id="Popular">popular attractions</button></div>');
	$('#Attr').append('<div><button id="All">Restore All Points</button></div>');
	$('#Attr').append('<div><button id="TrailQuality">See Trail Quality</button></div>');
	$('#Attr').append('<div><button id="Biking">See bike trails</button></div>');
	
	var TrailsQuality = L.geoJson(Park_Trails, {
	    style: function(feature){
        switch(feature.properties.TrailQual){
            case 1: return {color: "blue", fillOpacity: 1};
            case 2: return {color: "yellow", fillOpacity: 1};
            case 3: return {color: "orange", fillOpacity: 1};
            case 4: return {color: "red", fillOpacity: 1};
        }
    }
	}).addTo(map); 
	map.removeLayer(TrailsQuality);
	
	
	
	var bikeTrails = L.geoJson(Park_Trails, {
		style: function(feature){
			switch(feature.properties.TravelType){
			case 1: return {color: "lightgreen"};
			default: return{color: "black"};
			}
		}
	}).addTo(map);
	
	map.removeLayer(bikeTrails);
	
	
	
	
	
	
	
	var Popcoords0_X = attractions.features[0].geometry.coordinates[1];
	var Popcoords0_y = attractions.features[0].geometry.coordinates[0];
	var Popcoords0 = L.latLng(Popcoords0_X, Popcoords0_y);
	
	 var Popcoords1_x = attractions.features[1].geometry.coordinates[1];
	 var Popcoords1_y = attractions.features[1].geometry.coordinates[0];		 
	 var Popcoords1 = L.latLng(Popcoords1_x, Popcoords1_y);
	 
	 var Popcoords2_x = attractions.features[2].geometry.coordinates[1];
	 var Popcoords2_y = attractions.features[2].geometry.coordinates[0];
	 var Popcoords2 = L.latLng(Popcoords2_x, Popcoords2_y);
	 
	 var Popcoords7_x = attractions.features[7].geometry.coordinates[1];
	 var Popcoords7_y = attractions.features[7].geometry.coordinates[0];
	 var Popcoords7 = L.latLng(Popcoords7_x, Popcoords7_y);
	 
	 var Popcoords8_x = attractions.features[8].geometry.coordinates[1];
	 var Popcoords8_y = attractions.features[8].geometry.coordinates[0];
	 var Popcoords8 = L.latLng(Popcoords8_x, Popcoords8_y);
	 
	 var Popcoords9_x = attractions.features[9].geometry.coordinates[1];
	 var Popcoords9_y = attractions.features[9].geometry.coordinates[0];
	 var Popcoords9 = L.latLng(Popcoords9_x, Popcoords9_y);
	 
	 var Popcoords10_x = attractions.features[10].geometry.coordinates[1];
	 var Popcoords10_y = attractions.features[10].geometry.coordinates[0];
	 var Popcoords10 = L.latLng(Popcoords10_x, Popcoords10_y);
	 
	 var Popcoords11_x = attractions.features[11].geometry.coordinates[1];
	 var Popcoords11_y = attractions.features[11].geometry.coordinates[0];
	 var Popcoords11 = L.latLng(Popcoords11_x, Popcoords11_y);
	 
	 var Popcoords14_x = attractions.features[14].geometry.coordinates[1];
	 var Popcoords14_y = attractions.features[14].geometry.coordinates[0];
	 var Popcoords14 = L.latLng(Popcoords14_x, Popcoords14_y);
	 var MarkerOptions2 = {
			    radius: 8,
			    fillColor: "teal",
			    color: "#000",
			    weight: 1,
			    opacity: 1,
			    fillOpacity: 0.8
			};
	 
		var MarkerOptions4 = {
			    radius: 8,
			    fillColor: "indigo",
			    color: "#000",
			    weight: 1,
			    opacity: 1,
			    fillOpacity: 0.8
			};
	 var Pop0 = L.circleMarker(Popcoords0, MarkerOptions2).addTo(map);
	 var Pop1 = L.circleMarker(Popcoords1, MarkerOptions2).addTo(map);
	 var Pop2 = L.circleMarker(Popcoords2, MarkerOptions2).addTo(map);
	 var Pop3 = L.circleMarker(Popcoords7, MarkerOptions2).addTo(map);
	 var Pop4 = L.circleMarker(Popcoords8, MarkerOptions2).addTo(map);
	 var Pop5 = L.circleMarker(Popcoords9, MarkerOptions2).addTo(map);
	 var Pop6 = L.circleMarker(Popcoords10, MarkerOptions2).addTo(map);
	 var Pop7 = L.circleMarker(Popcoords11, MarkerOptions2).addTo(map);
	 var Pop8 = L.circleMarker(Popcoords14, MarkerOptions2).addTo(map);
	 var old0 = L.circleMarker(Popcoords0, MarkerOptions4).addTo(map);
	 var old1 = L.circleMarker(Popcoords1, MarkerOptions4).addTo(map);
	 var old2 = L.circleMarker(Popcoords2, MarkerOptions4).addTo(map);
	 var old8 = L.circleMarker(Popcoords8, MarkerOptions4).addTo(map);
	 var old14 = L.circleMarker(Popcoords14, MarkerOptions4).addTo(map);
	 map.removeLayer(Pop0);
	 map.removeLayer(Pop1);
	 map.removeLayer(Pop2);
	 map.removeLayer(Pop3);
	 map.removeLayer(Pop4);
	 map.removeLayer(Pop5);
	 map.removeLayer(Pop6);
	 map.removeLayer(Pop7);
	 map.removeLayer(Pop8);
	 map.removeLayer(old0);
	 map.removeLayer(old1);
	 map.removeLayer(old2);
	 map.removeLayer(old8);
	 map.removeLayer(old14);
	$("#Popular").on('click', function(){
		map.removeLayer(attraction_points);
		map.removeLayer(old0);
		map.removeLayer(old1);
		map.removeLayer(old2);
		map.removeLayer(old8);
		map.removeLayer(old14);
		map.addLayer(Pop0);
		map.addLayer(Pop1);
		map.addLayer(Pop2);
		map.addLayer(Pop3);
		map.addLayer(Pop4);
		map.addLayer(Pop5);
		map.addLayer(Pop6);
		map.addLayer(Pop7);
		map.addLayer(Pop8);
		
	
		
		
	})
	
	$("#Biking").on('click', function(){
		map.removeLayer(Trails);
		map.removeLayer(TrailsQuality);
		map.addLayer(bikeTrails);
	})
	
	
	$("#TrailQuality").on('click', function(){
		map.removeLayer(Trails);
		map.removeLayer(bikeTrails)
		map.addLayer(TrailsQuality);
		
	})
	
	
	
	$("#oldest").on('click', function(){
		
		console.log(attractions.features)
		 map.removeLayer(attraction_points);
		map.removeLayer(Pop0);
		map.removeLayer(Pop1);
		map.removeLayer(Pop2);
		map.removeLayer(Pop3);
		map.removeLayer(Pop4);
		map.removeLayer(Pop5);
		map.removeLayer(Pop6);
		map.removeLayer(Pop7);
		map.removeLayer(Pop8);
		map.addLayer(old0);
		map.addLayer(old1);
		map.addLayer(old2);
		map.addLayer(old8);
		map.addLayer(old14);
		
		
		
	
})
	$("#All").on('click', function(){
		map.removeLayer(Pop0);
		map.removeLayer(Pop1);
		map.removeLayer(Pop2);
		map.removeLayer(Pop3);
		map.removeLayer(Pop4);
		map.removeLayer(Pop5);
		map.removeLayer(Pop6);
		map.removeLayer(Pop7);
		map.removeLayer(Pop8);
		map.removeLayer(old0);
		map.removeLayer(old1);
		map.removeLayer(old2);
		map.removeLayer(old8);
		map.removeLayer(old14);
		map.addLayer(attraction_points);
		
	})





	
	
}
			
		
	
	
	








 function createEnableLocation(map){
    $('#Location').append('<div><button id="EnableLoc">Enable Location</button></div>');
    $('#Location').append('<div><button id="CloseLoc">Close Location</button></div>');
      var btn = $("#EnableLoc");
     
     $("#EnableLoc").on('click', function(){
        
        map.on('locationfound', function(event){
            var radius = event.accuracy /2;
          L.marker(event.latlng).addTo(map).bindPopup("You are here").openPopup();
            L.circle(event.latlng, event.accuracy).addTo(map);
        });
         map.locate({setView: true, maxZoom: 16});
   });
     
     $("#CloseLoc").on('click', function(){
         map.off('locationfound')
        // map.locate({setView: false, center: [37.799929, -122.4635829]});
     });
     
   


    
    
};








console.log("outside CreateMap Function");
window.onload = createMap();