var EVENT_HOME_VALIDATION_FIELD_ERROR_ID = "form_field_error";

function checkNewProject(projectData, trackData, stemData) {
    var project_name = projectData["project_name"];
    setProjectDataErrors(projectData);
    setProjectTrackDataErrors(trackData);
    setProjectStemDataErrors(stemData);
    if(project_name.length < 1) {
        var project_error_exists = document.getElementById("project_error_row");
        if(project_error_exists !=undefined) {
            if(!isEmptyTrack(trackData)) {
                if(isEmptyStem(stemData)) {
                    validateProjectTrackFields(projectData, trackData);
                }
                else {
                    validateProjectTrackFields(projectData, trackData);
                    validateProjectStemFields(projectData, stemData);
                }
            }
           else {
                if(!isEmptyStem(stemData)) {
                    validateProjectStemFields(projectData, stemData);
                }
                else {
                    return false;
                }
            }
        }
        else {
            createProjectErrorRow(projectData);

            if(!isEmptyTrack(trackData)) {
                if(isEmptyStem(stemData)) {
                    validateProjectTrackFields(projectData, trackData);
                }
                else {
                    validateProjectTrackFields(projectData, trackData);
                    validateProjectStemFields(projectData, stemData);
                }
            }
            else {
                if(!isEmptyStem(stemData)) {
                    validateProjectStemFields(projectData, stemData);
                }
                else {
                    return false;
                }
            }
        }
    }
    else {
        var project_error_exists = document.getElementById("project_error_row");
        if(project_error_exists !=undefined) {
            if(!isEmptyTrack(trackData)) {
                if(isEmptyStem(stemData)) {
                    deleteProjectErrorRow(projectData);
                    if(validateProjectTrackFields(projectData, trackData) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if(validateProjectTrackFields(projectData, trackData) == true) {
                        if(validateProjectStemFields(projectData, stemData) == true) {
                            deleteProjectErrorRow(projectData);
                            return true;
                        }
                        else {
                            deleteProjectErrorRow(projectData);
                            return false;
                        }
                    }
                    else {
                        if(validateProjectStemFields(projectData, stemData) == true) {
                            deleteProjectErrorRow(projectData);
                            return false;
                        }
                        else {
                            deleteProjectErrorRow(projectData);
                            return false;
                        }
                    }
                }
            }
            else {
                if(!isEmptyStem(stemData)){
                    deleteProjectErrorRow(projectData);
                    if(validateProjectStemFields(projectData, stemData) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    deleteProjectErrorRow(projectData);
                    return true;
                }
            }
        }
        else {
            if(!isEmptyTrack(trackData)) {
                if(isEmptyStem(stemData)) {
                    if(validateProjectTrackFields(projectData, trackData) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if(validateProjectTrackFields(projectData, trackData) == true) {
                        if(validateProjectStemFields(projectData, stemData) == true) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        if(validateProjectStemFields(projectData, stemData) == true) {
                            return false;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            else {
                if(!isEmptyStem(stemData)) {
                    if(validateProjectStemFields(projectData, stemData)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
        }
    }
}

function validateProjectTrackFields(projectData, trackData) {
    var project_track_title_error_exists = document.getElementById("project_track_title_error_row");
    var project_track_file_error_exists = document.getElementById("project_track_file_error_row");
    if(trackData["project_track_filename"] == "") {
        if(trackData["project_track_title"] == "") {
            if((trackData["selected_project_track_genre"] != "") ||
               (trackData["selected_project_track_status"] != "")) {
                if(projectData["project_name"] == "") {
                    if(project_track_title_error_exists !=null) {
                        if(project_track_file_error_exists ==null) {
                            deleteTrackTitleErrorRow(trackData);
                            return false;
                        }
                    }
                    else if(project_track_file_error_exists !=null) {
                        if(project_track_title_error_exists ==null) {
                            deleteTrackFileErrorRow(trackData);
                            return false;
                        }
                    }
                    else {
                        if(project_track_file_error_exists ==null) {
                            return false;
                        }
                    }
                }
                else {
                    if(project_track_title_error_exists !=null) {
                        if(project_track_file_error_exists ==null) {
                            deleteTrackTitleErrorRow(trackData);
                            return true;
                        }
                    }
                    else if(project_track_file_error_exists !=null) {
                        if(project_track_title_error_exists ==null) {
                            deleteTrackFileErrorRow(trackData);
                            return true;
                        }
                    }
                    else {
                        if(project_track_file_error_exists ==null) {
                            return true;
                        }
                    }
                }
            }
            else {
                if(projectData["project_name"] =="") {
                    if(project_track_title_error_exists !=null) {
                        if(project_track_file_error_exists ==null) {
                            deleteTrackTitleErrorRow(trackData);
                            return false;
                        }
                    }
                    else {
                        if(project_track_file_error_exists !=null) {
                            deleteTrackFileErrorRow(trackData);
                            return false;
                        }
                    }
                }
                else {
                    if(project_track_title_error_exists !=null) {
                        if(project_track_file_error_exists ==null) {
                            deleteTrackTitleErrorRow(trackData);
                            return true;
                        }
                    }
                    else {
                        if(project_track_file_error_exists !=null) {
                            deleteTrackFileErrorRow(trackData);
                            return true;
                        }
                    }
                }
            }
        }
        else {
            if(project_track_file_error_exists !=null) {
                return false;
            }
            else {
                createTrackFileErrorRow(trackData);
                return false;
            }
        }
    }
    else {
        if(projectData["project_name"] == "") {
            if(trackData["project_track_title"] == "") {
                if(project_track_file_error_exists !=null) {
                    deleteTrackFileErrorRow(trackData);
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
                else {
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
            }
            else {
                if(project_track_file_error_exists !=null) {
                    deleteTrackFileErrorRow(trackData);
                    return false;
                }
                else {
                    if(project_track_title_error_exists !=null) {
                        deleteTrackTitleErrorRow(trackData);
                        return false;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            if(trackData["project_track_title"] == "") {
                if(project_track_file_error_exists !=null) {
                    deleteTrackFileErrorRow(trackData);
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
                else {
                    createTrackTitleErrorRow(trackData);
                    return false;
                }
            }
            else {
                if(project_track_file_error_exists !=null) {
                    deleteTrackFileErrorRow(trackData);
                    return true;
                }
                else {
                    if(project_track_title_error_exists !=null) {
                        deleteTrackTitleErrorRow(trackData);
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
    }
}

function validateProjectStemFields(projectData, stemData) {
    var project_stem_title_error_exists = document.getElementById("project_stem_title_error_row");
    var project_stem_file_error_exists = document.getElementById("project_stem_file_error_row");

    if(stemData["project_stem_filename"] == "") {
        if(stemData["project_stem_title"] == "") {
            if((stemData["selected_project_stem_category"] != "") ||
               (stemData["selected_project_stem_status"] != "")) {
                if(projectData["project_name"] == "") {
                    if(project_stem_title_error_exists !=null) {
                        if(project_stem_file_error_exists ==null) {
                            deleteStemTitleErrorRow(stemData);
                            return false;
                        }
                    }
                    else if(project_stem_file_error_exists !=null) {
                        if(project_stem_title_error_exists ==null) {
                            deleteStemFileErrorRow(stemData);
                            return false;
                        }
                    }
                    else {
                        if(project_stem_file_error_exists ==null) {
                            return false;
                        }
                    }
                }
                else {
                    if(project_stem_title_error_exists !=null) {
                        if(project_stem_file_error_exists ==null) {
                            deleteStemTitleErrorRow(stemData);
                            return true;
                        }
                    }
                    else if(project_stem_file_error_exists !=null) {
                        if(project_stem_title_error_exists ==null) {
                            deleteTrackFileErrorRow(stemData);
                            return true;
                        }
                    }
                    else {
                        if(project_stem_file_error_exists ==null) {
                            return true;
                        }
                    }
                }
            }
            else {
                if(projectData["project_name"] =="") {
                    if(project_stem_title_error_exists !=null) {
                        if(project_stem_file_error_exists ==null) {
                            deleteStemTitleErrorRow(stemData);
                            return false;
                        }
                    }
                    else {
                        if(project_stem_file_error_exists !=null) {
                            deleteStemFileErrorRow(stemData);
                            return false;
                        }
                    }
                }
                else {
                    if(project_stem_title_error_exists !=null) {
                        if(project_stem_file_error_exists ==null) {
                            deleteStemTitleErrorRow(stemData);
                            return true;
                        }
                    }
                    else {
                        if(project_stem_file_error_exists !=null) {
                            deleteStemFileErrorRow(stemData);
                            return true;
                        }
                    }
                }
            }
        }
        else {
            if(project_stem_file_error_exists !=null) {
                return false;
            }
            else {
                createStemFileErrorRow(stemData);
                return false;
            }
        }
    }
    else {
        if(projectData["project_name"] == "") {
            if(stemData["project_stem_title"] == "") {
                if(project_stem_file_error_exists !=null) {
                    deleteStemFileErrorRow(stemData);
                    createStemTitleErrorRow(stemData);
                    return false;
                }
                else {
                    createStemTitleErrorRow(stemData);
                    return false;
                }
            }
            else {
                if(project_stem_file_error_exists !=null) {
                    deleteStemFileErrorRow(stemData);
                    return false;
                }
                else {
                    if(project_stem_title_error_exists !=null) {
                        deleteStemTitleErrorRow(stemData);
                        return false;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            if(stemData["project_stem_title"] == "") {
                if(project_stem_file_error_exists !=null) {
                    deleteStemFileErrorRow(stemData);
                    createStemTitleErrorRow(stemData);
                    return false;
                }
                else {
                    createStemTitleErrorRow(stemData);
                    return false;
                }
            }
            else {
                if(project_stem_file_error_exists !=null) {
                    deleteStemFileErrorRow(stemData);
                    return true;
                }
                else {
                    if(project_stem_title_error_exists !=null) {
                        deleteStemTitleErrorRow(stemData);
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
    }
}

// creates an error message for project title.
function createProjectErrorRow(projectData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_status_row = document.getElementById("projectStatusRow");
    var project_error_row = new_project_table_tbody.insertBefore(document.createElement("TR"), project_status_row);
    project_error_row.id = "project_error_row";

    var cell = project_error_row.insertCell(0);
    cell.width = "10%";

    cell = project_error_row.insertCell(1);
    var projectTitleError = document.createTextNode("Please enter a project title.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(projectTitleError);

    projectData["project_error"] = document.getElementById(project_error_row.id).textContent;
}

// deletes the project error row.
function deleteProjectErrorRow(projectData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_error_index = document.getElementById(project_error_row).rowIndex;
    new_project_table_tbody.deleteRow(project_error_index);
    projectData["project_error"] = "";
}

// creates an error message for track title.
function createProjectTrackTitleErrorRow(trackData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_track_genre_row = document.getElementById("projectTrackGenreRow");
    var project_track_error_row = new_project_table_tbody.insertBefore(document.createElement("TR"), project_track_genre_row);
    project_track_error_row.id = "project_track_title_error_row";

    var cell = project_track_error_row.insertCell(0);
    cell.width = "10%";

    cell = project_track_error_row.insertCell(1);
    var projectTrackTitleError = document.createTextNode("Please enter a track title.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(projectTrackTitleError);

    trackData["project_track_title_error"] = document.getElementById(project_track_error_row.id).textContent;
}

// deletes the track title error row
function deleteProjectTrackTitleErrorRow(trackData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_track_title_error_index = document.getElementById("project_track_title_error_row").rowIndex;
    new_project_table_tbody.deleteRow(project_track_title_error_index);
    trackData["project_track_title_error"] = "";
}

// creates an error message for track file.
function createProjectTrackFileErrorRow(trackData) {
	var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var empty_project_track_row = document.getElementById("emptyProjectTrackRow");
    var project_track_error_row = new_project_table_tbody.insertBefore(document.createElement("TR"), empty_project_track_row);
    project_track_error_row.id = "project_track_file_error_row";

    var cell = project_track_error_row.insertCell(0);
    cell.width = "10%";

    cell = project_track_error_row.insertCell(1);
    var projectTrackFileError = document.createTextNode("Please choose a track.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(projectTrackFileError);

    trackData["project_track_file_error"] = document.getElementById(project_track_error_row.id).textContent;
}

// deletes the track file error row.
function deleteProjectTrackFileErrorRow(trackData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_track_file_error_index = document.getElementById("project_track_file_error_row").rowIndex;
    new_project_table_tbody.deleteRow(project_track_file_error_index);
    trackData["project_track_file_error"] = "";
}

// creates an error message for stem title.
function createProjectStemTitleErrorRow(stemData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_stem_category_row = document.getElementById("projectStemCategoryRow");
    var project_stem_error_row = new_project_table_tbody.insertBefore(document.createElement("TR"), project_stem_category_row);
    project_stem_error_row.id = "project_stem_title_error_row";

    var cell = project_stem_error_row.insertCell(0);
    cell.width = "10%";

    cell = project_stem_error_row.insertCell(1);
    var projectStemTitleError = document.createTextNode("Please enter a stem title.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(projectStemTitleError);

    stemData["project_stem_title_error"] = document.getElementById(project_stem_error_row.id).textContent;
}

// deletes the stem title error row.
function deleteProjectStemTitleErrorRow(stemData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_stem_title_error_index = document.getElementById("project_stem_title_error_row").rowIndex;
    new_project_table_tbody.deleteRow(project_stem_title_error_index);
    stemData["project_stem_title_error"] = "";
}

// creates an error message for stem file.
function createProjectStemFileErrorRow(stemData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_empty_stem_row = document.getElementById("emptyProjectStemRow");
    var project_stem_error_row = new_project_table_tbody.insertBefore(document.createElement("TR"), project_empty_stem_row);
    project_stem_error_row.id = "project_stem_file_error_row";

    var cell = project_stem_error_row.insertCell(0);
    cell.width = "10%";

    cell = project_stem_error_row.insertCell(1);
    var projectStemFileError = document.createTextNode("Please choose a stem.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(projectStemFileError);

    stemData["project_stem_file_error"] = document.getElementById(project_stem_error_row.id).textContent;
}

// deletes the stem file error row.
function deleteProjectStemFileErrorRow(stemData) {
    var new_project_table = document.getElementById(NEW_PROJECT_TABLE_ID);
    var new_project_table_tbody = new_project_table.getElementsByTagName('tbody')[0];
    var project_stem_file_error_index = document.getElementById("project_stem_file_error_row").rowIndex;
    new_project_table_tbody.deleteRow(project_stem_file_error_index);
    stemData["project_stem_file_error"] = "";
}

// checks if user has left the track section blank or not.
function isEmptyTrack(trackData) {
    var count = 0;
    for(var key in trackData) {
        if(trackData[key] == "") {
            count++;
        }
    }
    if(count == Object.keys(trackData).length) {
        return true;
    }
    else {
        return false;
    }
}

// checks if user has left the stem section blank or not.
function isEmptyStem(stemData) {
    var count = 0;
    for(var key in stemData) {
        if(stemData[key] == "") {
            count++;
        }
    }
    if(count == Object.keys(stemData).length) {
        return true;
    }
    else {
        return false;
    }
}

// Sets the project error for projectData
function setProjectDataErrors(projectData) {
    var project_error = document.getElementById("project_error_row");
    if(project_error != null) {
        project_error = project_error.textContent;
        projectData["project_error"] = project_error;
    }
    else {
        projectData["project_error"] = "";
    }
}

// Sets the track errors for trackData
function setProjectTrackDataErrors(trackData) {
    var project_track_title_error = document.getElementById("project_track_title_error_row");
    if(project_track_title_error != null) {
        project_track_title_error = project_track_title_error.textContent;
        trackData["project_track_title_error"] = project_track_title_error;
    }
    else {
        trackData["project_track_title_error"] = "";
    }

    var project_track_file_error = document.getElementById("project_track_file_error_row");
    if(project_track_file_error != null) {
        project_track_file_error = project_track_file_error.textContent;
        trackData["project_track_file_error"] = project_track_file_error;
    }
    else {
        trackData["project_track_file_error"] = "";
    }
}

// Sets the stem errors for stemData
function setProjectStemDataErrors(stemData) {
    var project_stem_title_error = document.getElementById("project_stem_title_error_row");
    if(project_stem_title_error != null) {
        project_stem_title_error = project_stem_title_error.textContent;
        stemData["project_stem_title_error"] = project_stem_title_error;
    }
    else {
        stemData["project_stem_title_error"] = "";
    }

    var project_stem_file_error = document.getElementById("project_stem_file_error_row");
    if(project_stem_file_error != null) {
        project_stem_file_error = project_stem_file_error.textContent;
        stemData["project_stem_file_error"] = project_stem_file_error;
    }
    else {
        stemData["project_stem_file_error"] = "";
    }
}