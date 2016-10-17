//Creates track table using the result of api/get_project_tracks
function createTrackTableEvent(project_id){
    var url = "api/get_project_tracks";
    var formData = new FormData();
    formData.append("proj_id", project_id);
    var result = postFormRequest(url, formData, createTrackTable);
}

function toggleTrackPlayPauseEvent(button){
    var url = "api/get_track";
    var formData = new FormData();
    formData.append("track_id", button.value);
    var audio = document.getElementById("audio_" + button.value);
    
    var saveTrackFile = function(result){
            var track_filepath = result;
            console.log(track_filepath);
            audio.src = track_filepath;    
    }
    
    if(button.getAttribute('data-state') == -1){
        console.log("null");
        postFormRequest(url, formData, saveTrackFile);
    }
    
    if(button.getAttribute('data-state') == 0 || button.getAttribute('data-state') == -1){ //Is paused, (Showing play button)
        button.setAttribute('data-state', 1); //Play track, set to pause button
        button.src = "media/pause.png?random="+new Date().getTime(); //for some reason this doesn't refresh without the  getTime() call
        audio.currentTime = audio.getAttribute('data-position');
        audio.play();
        
    }else{ //Is playing, (showing pause button)
        button.setAttribute('data-state', 0); //Pause track, set to play button
        button.src = "media/play.png?random="+new Date().getTime();
        audio.setAttribute('data-position', audio.currentTime);
        audio.pause();
    }
    
    
    
}

var createTrackTable = function(result){
    if(result == null){
        return null;
    }
    var track_data = result;
    var project_id = track_data[0]["proj_id"];
    var trackTable = document.getElementById(TRACK_TABLE_ID + project_id);
    
    for(i = 0; i < track_data.length; i++){
        
        //Create single_track_table
        var single_track_table = document.createElement("table");
        single_track_table.id = "track_" + track_data[i]["proj_id"] + "_table";
        var header = single_track_table.createTHead();
        var row = header.insertRow();
        var cell = row.insertCell();
        var b = document.createElement("B");
        var text = document.createTextNode(track_data[i]["title"]);
        b.appendChild(text);
        cell.appendChild(b);
        
        //Create audio element
        cell = row.insertCell();
        var audio = document.createElement("audio");
        audio.id = "audio_" + track_data[i]["track_id"];
        audio.setAttribute('data-position', 0);
        cell.appendChild(audio);
        
        //Create play/pause button
        cell = row.insertCell();
        var playPauseButton = document.createElement("img");
        playPauseButton.className = "track-play";
        playPauseButton.src = "media/play.png";
        playPauseButton.value = track_data[i]["track_id"];
        playPauseButton.setAttribute('data-state', -1);
        playPauseButton.addEventListener('click', function() {toggleTrackPlayPauseEvent(this)}, false);
        cell.appendChild(playPauseButton);
        
        //Create track comment button
        cell = row.insertCell();
        var commentButton = document.createElement("img");
        commentButton.className = "track-comment";
        commentButton.src = "media/comment.png";
        cell.appendChild(commentButton);
        
        //Create track delete button
        var deleteTrackButton = document.createElement("button");
        deleteTrackButton.id = DELETE_TRACK_BUTTON_ID;
        deleteTrackButton.value = track_data[i]["track_id"];
        deleteTrackButton.appendChild(document.createTextNode("Delete"));
        deleteTrackButton.addEventListener('click', function() { deleteTrackEvent(this.value); }, false);
        cell = row.insertCell();
        cell.appendChild(deleteTrackButton);
        
        //Append single_track_table to TrackListTable
        row = trackTable.insertRow();
        cell = row.insertCell();
        cell.appendChild(single_track_table);
    }
}

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
    row.id = "track_title_row_" + proj_id;
    cell = row.insertCell(0);
    text = document.createTextNode("TRACKS");
    cell.appendChild(text);

    cell = row.insertCell(1);
    var input = document.createElement("INPUT");
    input.id = "track_title_" + proj_id;
    input.placeholder = "Enter track title";
    cell.appendChild(input);

    row = new_track_table.insertRow(new_track_table.rows.length);
    row.id = "track_genre_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    var trackGenreId = "track_genre_" + proj_id;
    cell.innerHTML = "<select id='"+trackGenreId+"'>"+ 
                        "<option selected disabled>Genre</option>"+
                        "<option value='jazz'>Jazz"+
                        "<option value='metal'>Metal"+
                        "<option value='pop'>Pop"+
                        "<option value='rap'>Rap";
    
    row = new_track_table.insertRow(new_track_table.rows.length);
    row.id = "track_status_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";
    
    cell = row.insertCell(1);
    var trackStatusId = "track_status_" + proj_id;
    cell.innerHTML = "<select id='"+trackStatusId+"'>"+
                        "<option selected disabled>Status</option>"+
                        "<option value='public'>Public"+
                        "<option value='private'>Private";
                        
    row = new_track_table.insertRow(new_track_table.rows.length);
    row.id = "track_file_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    var trackUploadId = "track_upload_" + proj_id;
    cell.innerHTML = "<input id='"+trackUploadId+"' type='file'>";
    
    // Extra spacing
    row = new_track_table.insertRow(new_track_table.rows.length);
    row.id = "empty_track_row_" + proj_id;
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");
    
    // Track Save Button
    row = new_track_table.insertRow(new_track_table.rows.length);
    row.id = "track_user_action_row_" + proj_id;
    cell = row.insertCell(0);
    var saveButton = document.createElement("BUTTON");
    saveButton.id = "track_save_button_" + proj_id;
    saveButton.value = proj_id;
    saveButton.innerHTML = "SAVE";
    saveButton.addEventListener('click', function() { saveTrackEvent(this.value); }, false);
    cell.appendChild(saveButton);
    
    // Track Cancel Button
    cell = row.insertCell(1);
    var cancelButton = document.createElement("BUTTON");
    cancelButton.id = "track_cancel_button_" + proj_id;
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
    var trackGenreId = "track_genre_" + proj_id;
    var trackGenre = document.getElementById(trackGenreId);
    if(trackGenre == "Genre") {
        trackGenre = "";
    }
    var selectedTrackGenreIndex = trackGenre.selectedIndex;
    var selectedTrackGenre = trackGenre.options[selectedTrackGenreIndex].value;
    var trackStatusId = "track_status_" + proj_id;
    var trackStatus = document.getElementById(trackStatusId);
    var selectedTrackStatusIndex = trackStatus.selectedIndex;
    var selectedTrackStatus = trackStatus.options[selectedTrackStatusIndex].value;
    if(selectedTrackStatus == "Status") {
        selectedTrackStatus = "";
    }
    var trackTitleId = "track_title_" + proj_id;
    var trackTitle = document.getElementById(trackTitleId).value;
    var trackFilenameId = "track_upload_" + proj_id;
    var trackFilename = document.getElementById(trackFilenameId);

    var trackData = {};

    trackData["project_id"] = proj_id;
    trackData["track_title"] = trackTitle;
    trackData["selected_track_genre"] = selectedTrackGenre;
    trackData["selected_track_status"] = selectedTrackStatus;
    trackData["track_filename"] = trackFilename.value;

    var processTrack = function(result)
    {
        var track_table_body = document.getElementById(TRACK_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
        track_table_body.deleteRow(0);
        refreshProjects();
    }
    
    //var url = "api/upload_track";
    var formData = new FormData();
    formData.append("username", username);
    formData.append("genre", selectedTrackGenre);
    formData.append("track_status", selectedTrackStatus);
    formData.append("track_title", trackTitle);
    formData.append("proj_id", proj_id);
    formData.append("filename", trackFilename.files[0]);

    var valid_form = checkNewTrack(trackData);

    if(valid_form) {
        var url = "api/upload_track";
        postFormRequest(url, formData, processTrack);
    }
}

function deleteTrackEvent(track_id){
    var url = "api/delete_track";
    var formData = new FormData();
    formData.append("track_id", track_id);
    deleteFormRequest(url, formData, refreshProjects);
    refreshProjects();
}
