// Uploads a Track to current Project
function addNewTrackEvent(button_id) {
	var new_track_exist = document.getElementById(NEW_TRACK_ROW_ID + proj_id);
	if(new_track_exist != undefined) {
		return
	}
	var proj_id = button_id.replace("add_track_", "");
	var track_table_body= document.getElementById(TRACK_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
	track_table_body.innerHTML = "";
	delete track_table_body;
	
	// NEW TRACK TABLE
    var row = track_table_body.insertRow(0);
	row.id = NEW_TRACK_ROW_ID + proj_id;
    var cell = row.insertCell(0);
	var new_track_table = document.createElement("table");
	new_track_table.id = "new_track_table_" + proj_id;
	new_track_table.className = NEW_TRACK_TABLE_ID;
	cell.appendChild(new_track_table);
    
	row = new_track_table.insertRow(new_track_table.rows.length);
	cell = row.insertCell(0);
	text = document.createTextNode("TRACKS");
    cell.appendChild(text);

    cell = row.insertCell(1);
    var input = document.createElement("INPUT");
    input.id = "track_title";
    input.placeholder = "Enter track title";
    cell.appendChild(input);

    row = new_track_table.insertRow(new_track_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='track_genre'>"+
                        "<option value=''>Genre"+
                        "<option value='jazz'>Jazz"+
                        "<option value='metal'>Metal"+
                        "<option value='pop'>Rock"+
                        "<option value='rap'>Rap";
    
    row = new_track_table.insertRow(new_track_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    cell.innerHTML = "<input id='track_upload' type='file'>";
	
	// Extra spacing
    row = new_track_table.insertRow(new_track_table.rows.length);
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");
	
	// Track Save Button
	row = new_track_table.insertRow(new_track_table.rows.length);
	cell = row.insertCell(0);
	var saveButton = document.createElement("BUTTON");
	saveButton.id = "save_button_" + proj_id;
	saveButton.value = proj_id;
	saveButton.innerHTML = "SAVE";
	saveButton.addEventListener('click', function() { saveTrackEvent(this.value); }, false);
	cell.appendChild(saveButton);
	
	// Track Cancel Button
	cell = row.insertCell(1);
	var cancelButton = document.createElement("BUTTON");
	cancelButton.id = "cancel_button_" + proj_id;
	cancelButton.value = proj_id;
	cancelButton.innerHTML = "CANCEL";
	cancelButton.addEventListener('click', function() {cancelTrackEvent(this.value); }, false);
	cell.appendChild(cancelButton);
}

function cancelTrackEvent(proj_id) {
	var track_table_body = document.getElementById(TRACK_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
	track_table_body.deleteRow(0);
}

function saveTrackEvent(proj_id){
	var username = current_user.user.username;
	var trackGenre = document.getElementById("track_genre");
	if(trackGenre == "Genre") {
		trackGenre = "";
	}
    var selectedTrackGenreIndex = trackGenre.selectedIndex;
	var selectedTrackGenre = trackGenre.options[selectedTrackGenreIndex].value;
	var track_name = document.getElementById("track_title").value;
	var filename = document.getElementById("track_upload");
	console.log("Save clicked");
	
	var processTrack = function(result)
	{
        console.log("Saved track " + track_name + " to "  + result);
		var track_table_body = document.getElementById(TRACK_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
		track_table_body.deleteRow(0);
        refreshProjects();
	}
	
	var url = "api/upload_track";
	var formData = new FormData();
	formData.append("username", username);
	formData.append("genre", selectedTrackGenre);
	formData.append("track_name", track_name);
    formData.append("proj_id", proj_id);
	formData.append("filename", filename.files[0]);
    
    postProjectRequest(url, formData, processTrack);
}

function postTrackRequest(url, data, callback){
   $.ajax({
       type: "POST",
       url: url,
       data: data,
       dataType: 'json',
       processData: false, // important
       contentType: false, // important
       success : function (result){
           callback(result);
       },
       error : function(result){
           failCallback(result);
       }
   });
}