function checkNewTrack(trackData) {
    setTrackDataErrors(trackData);
    if(validateTrackFields(trackData) == true) {
        return true;
    }
    else {
        return false;
    }
}

function validateTrackFields(trackData) {
    var track_title_error_exists = document.getElementById("track_title_error_row_" + trackData["project_id"]);
    var track_file_error_exists = document.getElementById("track_title_error_row_" + trackData["project_id"]);

    if(trackData["track_filename"] == "") {
        if(trackData["track_title"] == "") {
            if(track_title_error_exists ==null) {
                if(track_file_error_exists ==null) {
                    createTrackTitleErrorRow(trackData);
                    createTrackFileErrorRow(trackData);
                    return false;
                }
                else {
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
            }
            else {
                if(track_file_error_exists ==null) {
                    createTrackFileErrorRow(trackData);
                    return false;
                }
                else {
                    return false;
                }
            }
        }
        else {
            if(track_title_error_exists ==null) {
                if(track_file_error_exists ==null) {
                    createTrackFileErrorRow(trackData);
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                if(track_file_error_exists ==null) {
                    deleteTrackTitleErrorRow(trackData);
                    createTrackFileErrorRow(trackData);
                    return false;
                }
                else {
                    deleteTrackTitleErrorRow(trackData);
                    return false;
                }
            }
        }
    }
    else {
        if(trackData["track_title"] == "") {
            if(track_title_error_exists ==null) {
                if(track_file_error_exists ==null) {
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
                else {
                    deleteTrackFileErrorRow(trackData);
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
            }
            else {
                if(track_file_error_exists ==null) {
                    return false;
                }
                else {
                    deleteTrackFileErrorRow(trackData);
                    return false;
                }
            }
        }
        else {
            if(track_title_error_exists ==null) {
                if(track_file_error_exists ==null) {
                    return true;
                }
                else {
                    deleteTrackFileErrorRow(trackData);
                    return true;
                }
            }
            else {
                if(track_file_error_exists ==null) {
                    deleteTrackTitleErrorRow(trackData);
                    return true;
                }
                else {
                    deleteTrackTitleErrorRow(trackData);
                    deleteTrackFileErrorRow(trackData);
                    return true;
                }
            }
        }
    }
}

// creates an error message for track title.
function createTrackTitleErrorRow(trackData) {
    var new_track_table = document.getElementById("new_track_table_" + trackData["project_id"]);
    var new_track_table_tbody = new_track_table.getElementsByTagName('tbody')[0];
    var track_genre_row = document.getElementById("track_genre_row_" + trackData["project_id"]);
    var track_error_row = new_track_table_tbody.insertBefore(document.createElement("TR"), track_genre_row);
    track_error_row.id = "track_title_error_row_" + trackData["project_id"];

    var cell = track_error_row.insertCell(0);
    cell.width = "10%";

    cell = track_error_row.insertCell(1);
    var trackTitleError = document.createTextNode("Please enter a track title.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(trackTitleError);

    trackData["track_title_error"] = document.getElementById(track_error_row.id).textContent;
}

// deletes the track title error row.
function deleteTrackTitleErrorRow(trackData) {
    var new_track_table = document.getElementById("new_track_table_" + trackData["project_id"]);
    var new_track_table_tbody = new_track_table.getElementsByTagName('tbody')[0];
    var track_title_error_index = document.getElementById("track_title_error_row_" + trackData["project_id"]).rowIndex;
    new_track_table_tbody.deleteRow(track_title_error_index);
    trackData["track_title_error"] = "";
}

// creates an error message for track file.
function createTrackFileErrorRow(trackData) {
    var new_track_table = document.getElementById("new_track_table_" + trackData["project_id"]);
    var new_track_table_tbody = new_track_table.getElementsByTagName('tbody')[0];
    var empty_track_row = document.getElementById("empty_track_row_" + trackData["project_id"]);
    var track_error_row = new_track_table_tbody.insertBefore(document.createElement("TR"), empty_track_row);
    track_error_row.id = "track_file_error_row_" + trackData["project_id"];

    var cell = track_error_row.insertCell(0);
    cell.width = "10%";

    cell = track_error_row.insertCell(1);
    var trackFileError = document.createTextNode("Please choose a track.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(trackFileError);

    trackData["track_file_error"] = document.getElementById(track_error_row.id).textContent;

}

// deletes the track file error row.
function deleteTrackFileErrorRow(trackData) {
    var new_track_table = document.getElementById("new_track_table_" + trackData["project_id"]);
    var new_track_table_tbody = new_track_table.getElementsByTagName('tbody')[0];
    var track_file_error_index = document.getElementById("track_file_error_row_" + trackData["project_id"]).rowIndex;
    new_track_table_tbody.deleteRow(track_file_error_index);
    trackData["track_file_error"] = "";
}

// Sets the track errors for trackData.
function setTrackDataErrors(trackData) {
    var track_title_error = document.getElementById("track_title_error_row");
    if(track_title_error != null) {
        track_title_error = track_title_error.textContent;
        trackData["track_title_error"] = track_title_error;
    }
    else {
        trackData["track_title_error"] = "";
    }

    var track_file_error = document.getElementById("track_file_error_row");
    if(track_file_error != null) {
        track_file_error = track_file_error.textContent;
        trackData["track_file_error"] = track_file_error;
    }
    else {
        trackData["track_file_error"] = "";
    }
}