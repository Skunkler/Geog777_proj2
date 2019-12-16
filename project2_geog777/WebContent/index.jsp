<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="width=device-width, initial-scale=1 text/html; charset=ISO-8859-1">
<title>Web Project</title>

<!-- link rel="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"-->


 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
    
<!-- link rel="stylesheet" href="css/leaflet.css"-->
<link rel="stylesheet" href="css/style.css">

<!-- script src="//code.jquery.com/jquery-1.11.3.min.js"></script-->
<!--script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script-->
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/jquery-migrate-3.0.1.min.js"></script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  

    

</head>
<body>

<div id="map-canvas"></div>

<span onclick="openNav()">open</span>
<div id="mySidenav" class="sidenav">
  <!--<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>-->
  <div><a href="javascript:void(0)" onclick="openInfo()">UserInfo</a></div>
  <div><a href="javascript:void(0)" onclick="openAttr()">Trails and Attractions</a></div>
  <div><a href="javascript:void(0)" onclick="openLocation()">User Location</a></div>
  <div><a href="#javascript:void(0)" onclick="openWild()">Wildlife sitings</a></div>
  <div><a href="#javascript:void(0)" onclick="openWildInput()">Report Wildlife siting</a></div>
</div>
<form id="User" class="sidenav">
<div>
<a href="javascript:void(0)" class="closebtn" onclick="closeUser()">&times;</a>
<div><label>First Name &nbsp</label><input placeholder = "First Name" name="user_fn"></div>
<div><label>Last Name &nbsp</label><input placeholder = "Last Name" name="user_ln"></div>
<div><label>Email &nbsp</label><input placeholder = "email address" name="user_email"></div>
<div><label>Address &nbsp</label><input placeholder = "address" name="user_add"></div>
<div><label>Telephone &nbsp</label><input placeholder = "phone number" name="user_tel"></div>
<div><button type="submit">submit</button></div>
</div>
</form>

<form id="Wild" class="sidenav">
<div>
<a href="javascript:void(0)" class="closebtn" onclick="closeWild()">&times;</a>
<div><label>Animal</label></div>
<div><label>Animal type</label><input placeholder = "what kind of animal?" name="description"></div>


<div><button type="submit">submit</button></div>
</div>
</form>

<form id="WildInput" class="sidenav">
<div>
<a href="javascript:void(0)" class="closebtn" onclick="closeWildInput()">&times;</a>
<div><label>Report Animal Siting</label><input placeholder="enter description of animal" name="animal"></div>
<div><label>Lat</label><input placeholder="enter latitude" name = "Lat"></div>
<div><label>Lon</label><input placeholder="enter longitude" name = "Lon"></div>
<div><button type="submit">submit</button></div>
</div>
</form>

<div id="Attr" class="sidenav">
<a href="javascript:void(0)" class="closebtn" onclick="closeAttr()">&times;</a>
</div>


<div id="Location" class="sidenav">
<a href="javascript:void(0)" class="closebtn" onclick="closeLocation()">&times;</a>
</div>

<!-- Use any element to open the sidenav -->


<!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
<div id="main">
  ...
</div>
    
  
    <script type="text/javascript">
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */

 function openWildInput(){
	document.getElementById("WildInput").style.width = "250px";
}
 
function closeWildInput(){
	document.getElementById("WildInput").style.width = "0px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}
function openInfo(){
	document.getElementById("User").style.width="250px";
}

function closeUser(){
	document.getElementById("User").style.width="0px";
}

function openAttr(){
	document.getElementById("Attr").style.width="250px";
}

function closeAttr(){
	
document.getElementById("Attr").style.width="0px";
}
        
function openLocation(){
    document.getElementById("Location").style.width="250px";
}        
function closeLocation(){
    document.getElementById("Location").style.width="0px";
}

function openWild(){
	document.getElementById("Wild").style.width="250px";
}
function closeWild(){
	document.getElementById("Wild").style.width="0px";
}
       

    </script>
    
    


   
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
 integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
  
   <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="js/attractions2.geojson"></script>
    <script type="text/javascript" src="js/Park_Trails.geojson"></script>
    <script type="text/javascript" src="js/parkingsLots.geojson">
    </script>

    <script type="text/javascript" src="js/facilities.geojson"></script>
    <script type="text/javascript" src="js/loadmap.js"></script>
    <script type="text/javascript" src="js/loadform.js"></script>





</body>


</html>