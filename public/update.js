/*Sarah Beidelschies
  CS 290
  Databases and UI
  Update js
*/

document.addEventListener("DOMContentLoaded", getData);
document.addEventListener("DOMContentLoaded", bindUpdate);


/*get row of data using id from update.handlebars
  auto fill in form using data*/
  
function getData () {
		var req = new XMLHttpRequest();
		var payload = {};
		var id = document.getElementById("hiddenVal").value;
		payload.id = id;
		req.open("POST", "http://52.26.106.49:3000/getRow", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function() {
		  if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var data = JSON.parse(response.results);
			document.getElementById('animalName').value = data[0].name;
			document.getElementById('species').value = data[0].reps;
			document.getElementById('breed').value = data[0].weight;
			document.getElementById('dob').value = data[0].date;
			document.getElementById('dateIn').value = data[0].dateIn;
		    
			}
		  else {
		    console.log("Error in network request: " );
		}});
		
        req.send(JSON.stringify(payload));
		event.preventDefault();
}		

/*create event listener for update button
  submit data from form to server update
  send user back to home page
*/
function bindUpdate() {
	 document.getElementById("updateAnimal").addEventListener('click', function(event) {
		
		var req = new XMLHttpRequest();
		var id = document.getElementById("hiddenVal").value;
		var animalName = document.getElementById("animalName").value;
		var speciesCurrent = document.getElementById("species").value;
		var breedCurrent = document.getElementById("breed").value;
		var dobCurrent = document.getElementById("dob").value;
		var dateInCurrent = document.getElementById("dateIn").value;
		
		
		var payload = {};
		payload.id=id;
		payload.name=animalName;
		payload.species=speciesCurrent;
		payload.breed=breedCurrent;
		payload.dob=dobCurrent;
		payload.dateIn=dateInCurrent;
		req.open("POST", "http://52.26.106.49:3000/update", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function() {
		  if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var data = JSON.parse(response.results);
			window.location.assign("http://52.26.106.49:3000/");
		    
			}
		  else {
		    console.log("Error in network request: " );
		}});
		
        req.send(JSON.stringify(payload));
		event.preventDefault();
		
	  });
	  }
