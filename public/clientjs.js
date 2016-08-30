/*Sarah Beidelschies
  CS 290
  Databases and UI
  Client js file
*/

document.addEventListener("DOMContentLoaded", bindButtons);
document.addEventListener("DOMContentLoaded", iniBuildTable);


/*build table body using data from server*/
function buildTable(data) {
		
		/*delete old table body*/
		for(var i=0; i<data.length; i++) {
			console.log(data[i].name);
		}
		var oldTable = document.getElementById("animalData");
		var child = document.getElementsByTagName("tbody");
		for(var i=0; i<child.length; i++) {
			oldTable.removeChild(child[i]);
		}
				
				
		var tableBody = document.createElement("tbody");
		for(var i=0; i<data.length; i++) {
			var newRow = document.createElement("tr");
						
			var newCellName = document.createElement("td");
			newCellName.textContent = data[i].name;
			var newCellSpecies = document.createElement("td");
			newCellRep.textContent = data[i].species;
			var newCellBreed = document.createElement("td");
			newCellWeight.textContent = data[i].breed;
			var newCellDob = document.createElement("td");
			newCellDate.textContent = data[i].dob;
			var newCellDateIn = document.createElement("td");
			newCellDate.textContent = data[i].dateIn;
			
			newRow.appendChild(newCellName);
			newRow.appendChild(newCellSpecies);
			newRow.appendChild(newCellBreed);
			newRow.appendChild(newCellDob);
			newRow.appendChild(newCellDateIn);
			tableBody.appendChild(newRow);
			oldTable.appendChild(tableBody);
			
			/*Create form with hidden id of data id and 
			  delete button with event listener to 
			  submit data id to delete function  */
			var newDelete = document.createElement("td");
			newRow.appendChild(newDelete);
			
			var deleteButton = document.createElement("input");
			deleteButton.type = "submit";
			deleteButton.name = "delete";
			
			newDelete.appendChild(deleteButton);
			var deleteCell = document.getElementsByName("delete");
			
			deleteCell[i].addEventListener('click', function (event) {
				var sib = this.nextSibling;
				deleteRow(sib.value);
			});	
			var formInHide = document.createElement("input");
			formInHide.type = "hidden";
			formInHide.name = "id";
			formInHide.value = data[i].id;
			newDelete.appendChild(formInHide);
			
			/*create update form with hidden id holding the
			  value of the data id.  Add update button with 
			  event listener to submit a get request with
			  the data id */
			var newUpdate = document.createElement("td");
			newRow.appendChild(newUpdate);
			var updateForm = document.createElement("form");
			var query = {id: null};
			updateForm.method = 'GET';
			updateForm.action = "http://52.26.106.49:3000/logID?" + query.id;
			newUpdate.appendChild(updateForm);
			
			var updateButton = document.createElement("input");
			updateButton.type = "submit";
			updateButton.name = "update";
			
			updateForm.appendChild(updateButton);
			var updateCell = document.getElementsByName("update");
			console.log(updateCell.length);
			console.log(i);
			updateCell[i].addEventListener('click', function (event) {
				var sib = this.nextSibling;
				var sibString = String(sib.value);
				query.id = sibString;
				event.stopPropagation();
				
			});	
			var formUpHide = document.createElement("input");
			formUpHide.type = "hidden";
			formUpHide.name = "id";
			formUpHide.value = data[i].id;
			updateForm.appendChild(formUpHide);
			
			}
		
		
}

/*build table by submitting new http request*/
function iniBuildTable() {
	var req = new XMLHttpRequest();
	req.open("GET", "http://52.26.106.49:3000/table", true);
	req.addEventListener("load", function() {
		
	if(req.status >=200 && req.status < 400) {
		var oldTable = document.getElementById("animalData");
		var child = document.getElementsByTagName("tbody");
		for(var i=0; i<child.length; i++) {
			oldTable.removeChild(child[i]);
			
		}
		
	   	var response = JSON.parse(req.responseText);
		var data = JSON.parse(response.results);
				
		var tableBody = document.createElement("tbody");
		for(var i=0; i<data.length; i++) {
			var newRow = document.createElement("tr");
			
			
			var newCellName = document.createElement("td");
			newCellName.textContent = data[i].name;
			var newCellSpecies = document.createElement("td");
			newCellRep.textContent = data[i].species;
			var newCellBreed = document.createElement("td");
			newCellWeight.textContent = data[i].breed;
			var newCellDob = document.createElement("td");
			newCellDate.textContent = data[i].dob;
			var newCellDateIn = document.createElement("td");
			newCellDate.textContent = data[i].dateIn;
			
			newRow.appendChild(newCellName);
			newRow.appendChild(newCellSpecies);
			newRow.appendChild(newCellBreed);
			newRow.appendChild(newCellDob);
			newRow.appendChild(newCellDateIn);
			tableBody.appendChild(newRow);
			oldTable.appendChild(tableBody);
			/*Create form with hidden id of data id and 
			  delete button with event listener to 
			  submit data id to delete function  */
			var newDelete = document.createElement("td");
			newRow.appendChild(newDelete);
			
			var deleteButton = document.createElement("input");
			deleteButton.type = "submit";
			deleteButton.name = "delete";
			
			newDelete.appendChild(deleteButton);
			var deleteCell = document.getElementsByName("delete");
			deleteCell[i].addEventListener('click', function (event) {
				var sib = this.nextSibling;
				deleteRow(sib.value);
			});	
			var formInHide = document.createElement("input");
			formInHide.type = "hidden";
			formInHide.name = "id";
			formInHide.value = data[i].id;
			newDelete.appendChild(formInHide);
			
			/*create update form with hidden id holding the
			  value of the data id.  Add update button with 
			  event listener to submit a get request with
			  the data id */
			var newUpdate = document.createElement("td");
			newRow.appendChild(newUpdate);
			var updateForm = document.createElement("form");
			var query = {id: null};
			updateForm.method = 'GET';
			updateForm.action = "http://52.26.106.49:3000/logID?" + query.id;
			
			newUpdate.appendChild(updateForm);
			var updateButton = document.createElement("input");
			updateButton.type = "submit";
			updateButton.name = "update";
			
			updateForm.appendChild(updateButton);
			var updateCell = document.getElementsByName("update");
			updateCell[i].addEventListener('click', function (event) {
				var sib = this.nextSibling;
				var sibString = String(sib.value);
				query.id = sibString;
				event.stopPropagation();
			});	
			var formUpHide = document.createElement("input");
			formUpHide.type = "hidden";
			formUpHide.name = "id";
			formUpHide.value = data[i].id;
			updateForm.appendChild(formUpHide);
			
			
		}
		
		
		
	}
	else {
		    console.log("Error in network request: " );
	}
	
	});
	req.send(null);
}

	  /*add event listener to click event for newWork button
	    retrieve data from document and sent to server insert
		as an AJAX post request.  send new data to table builder helper */
	  function bindButtons() {
	    document.getElementById("newAnimal").addEventListener('click', function(event) {
		var req = new XMLHttpRequest();
		var animalName = document.getElementById("animalName").value;
		var speciesCurrent = document.getElementById("species").value;
		var breedCurrent = document.getElementById("breed").value;
		var dobCurrent = document.getElementById("dob").value;
		var dateInCurrent = document.getElementById("dateIn").value;
				
		var payload = {};
		payload.name=animalName;
		payload.species=speciesCurrent;
		payload.breed=breedCurrent;
		payload.dob=dobCurrent;
		payload.dateIn=dateInCurrent;
		
		req.open("POST", "http://52.26.106.49:3000/insert", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function() {
		  if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var data = JSON.parse(response.results);
		    buildTable(data);
			}
		  else {
		    console.log("Error in network request: " );
		}});
		
        req.send(JSON.stringify(payload));
		event.preventDefault();
		
	  });
	  }

/*send passed id to server delete via AJAX post request
  build table with new data
*/  
function deleteRow(id) {
	var payload = {};
	payload.id = id;
	var delReq = new XMLHttpRequest();
		 
	delReq.open("POST", "http://52.26.106.49:3000/delete", true);
	delReq.setRequestHeader("Content-Type", "application/json");
	delReq.addEventListener("load", function() {
		if (delReq.status >= 200 && delReq.status < 400) {
			var response = JSON.parse(delReq.responseText);
			var data = JSON.parse(response.results);
			buildTable(data);
			}
		  else {
		    console.log("Error in network request: " );
		}
		});
		
        delReq.send(JSON.stringify(payload));
		event.preventDefault();
		  
	
}
