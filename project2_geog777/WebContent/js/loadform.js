
/**function queryReport(event) {
  //event.preventDefault(); // stop form from submitting normally
  
  var a = $("#Wild").serializeArray();
  a.push({ name: "tab_id", value: "1" });
  a = a.filter(function(item){return item.value != '';});
  $.ajax({
    url: 'HttpServlet',
    type: 'POST',
    data: a,
    success: function(reports) {
      alert(JSON.stringify(reports));
    	return reports;
    },
    error: function(xhr, status, error) {
      alert("Status: " + status + "\nError: " + error);
    }
  });
}**/





function CreateReport2(event){
	event.preventDefault();
	alert("inside CreateReport2");
	var c = $("#WildInput").serializeArray();
	c.push({name: "tab_id", value: "2"});
	
	c = c.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: c,
		succes: function(reports){
			alert("Success! reported animal siting submitted!")
			document.getElementById("create_report_form").reset();
			//use ajax again to query all entries in the database and regenerate the map, thus displaying our newly entered data on the map
			$.ajax({
				url: 'HttpServlet',
				type: 'POST',
				data: { "tab_id": "1"},
				success: function(reports) {
					alert("success animal siting reported!");
				},
				error: function(xhr, status, error){
					alert("An AJAX error occured: " + status + "\Error: " + error);
				}
			});
			
			},
				
			error: function(xhr, status, error){
				alert("Status: " + status + "\nError: " + error);
			}
		});
		
	}
	//calls the createReport function when a create_report_form has been submitted by the us
	$('#WildInput').on("submit", CreateReport2);



function createReport(event){
	
	event.preventDefault();
	
	//create an array called b that is an array that stores the values for tab_id, longitude, and latitude
	var b = $("#User").serializeArray();
	b.push({name: "tab_id", value: "0"});
	
	
	b = b.filter(function(item){return item.value != '';});
	
	//using ajax, post the data stored in b to HttpServlet to store the values into our database
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: b,
		
		//our success function creates a pop-up window that displays a success message to the user
		success: function(reports){
		alert("A report has been successfully submitted!");
		//resets the create_report_form to the default after the report has been submitted by the user
		//document.getElementById("create_report_form").reset();
		//use ajax again to query all entries in the database and regenerate the map, thus displaying our newly entered data on the map
		$.ajax({
			url: 'HttpServlet',
			type: 'POST',
			data: { "tab_id": "1"},
			success: function(reports) {
				alert("success a user was created!");
			},
			error: function(xhr, status, error){
				alert("An AJAX error occured: " + status + "\Error: " + error);
			}
		});
		
		},
			
		error: function(xhr, status, error){
			alert("Status: " + status + "\nError: " + error);
		}
	});
	
}
//calls the createReport function when a create_report_form has been submitted by the user
$("#User").on("submit", createReport);