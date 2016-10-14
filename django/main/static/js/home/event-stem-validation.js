function checkNewStem(stemData) {
    setStemDataErrors(stemData);
    if(validateStemFields(stemData) == true) {
        return true;
    }
    else {
        return false;
    }
}

function validateStemFields(stemData) {
    var stem_title_error_exists = document.getElementById("stem_title_error_row_" + stemData["project_id"]);
    var stem_file_error_exists = document.getElementById("stem_file_error_row_" + stemData["project_id"]);

    if(stemData["stem_filename"] == "") {
        if(stemData["stem_title"] == "") {
            if(stem_title_error_exists ==null) {
                if(stem_file_error_exists ==null) {
                    createStemTitleErrorRow(stemData);
                    createStemFileErrorRow(stemData);
                    return false;
                }
                else {
                    createStemTitleErrorRow(stemData);
                    return false;
                }
            }
            else {
                if(stem_file_error_exists ==null) {
                    createStemFileErrorRow(stemData);
                    return false;
                }
                else {
                    return false;
                }
            }
        }
        else {
            if(stem_title_error_exists ==null) {
                if(stem_file_error_exists ==null) {
                    createStemFileErrorRow(stemData);
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                if(stem_file_error_exists ==null) {
                    deleteStemTitleErrorRow(stemData);
                    createStemFileErrorRow(stemData);
                    return false;
                }
                else {
                    deleteStemTitleErrorRow(stemData);
                    return false;
                }
            }
        }
    }
    else {
        if(stemData["stem_title"] == "") {
            if(stem_title_error_exists ==null) {
                if(stem_file_error_exists ==null) {
                    createStemTitleErrorRow(stemData);
                    return false;
                }
                else {
                    deleteStemFileErrorRow(stemData);
                    createStemTitleErrorRow(stemData);
                    return false;
                }
            }
            else {
                if(stem_file_error_exists ==null) {
                    return false;
                }
                else {
                    deleteStemFileErrorRow(stemData);
                    return false;
                }
            }
        }
        else {
            if(stem_title_error_exists ==null) {
                if(stem_file_error_exists ==null) {
                    return true;
                }
                else {
                    deleteStemFileErrorRow(stemData);
                    return true;
                }
            }
            else {
                if(stem_file_error_exists ==null) {
                    deleteStemTitleErrorRow(stemData);
                    return true;
                }
                else {
                    deleteStemTitleErrorRow(stemData);
                    deleteStemFileErrorRow(stemData);
                    return true;
                }
            }
        }
    }
}

// creates an error message for stem title.
function createStemTitleErrorRow(stemData) {
    var new_stem_table = document.getElementById("new_stem_table_" + stemData["project_id"]);
    var new_stem_table_tbody = new_stem_table.getElementsByTagName('tbody')[0];
    var stem_category_row = document.getElementById("stem_category_row_" + stemData["project_id"]);
    var stem_error_row = new_stem_table_tbody.insertBefore(document.createElement("TR"), stem_category_row);
    stem_error_row.id = "stem_title_error_row_" + stemData["project_id"];

    var cell = stem_error_row.insertCell(0);
    cell.width = "10%";

    cell = stem_error_row.insertCell(1);
    var stemTitleError = document.createTextNode("Please enter a stem title.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(stemTitleError);

    stemData["stem_title_error"] = document.getElementById(stem_error_row.id).textContent;
}

// deletes the stem title error row.
function deleteStemTitleErrorRow(stemData) {
    var new_stem_table = document.getElementById("new_stem_table_" + stemData["project_id"]);
    var new_stem_table_tbody = new_stem_table.getElementsByTagName('tbody')[0];
    var stem_title_error_index = document.getElementById("stem_title_error_row_" + stemData["project_id"]).rowIndex;
    new_stem_table_tbody.deleteRow(stem_title_error_index);
    stemData["stem_title_error"] = "";
}

// creates an error message for stem file.
function createStemFileErrorRow(stemData) {
    var new_stem_table = document.getElementById("new_stem_table_" + stemData["project_id"]);
    var new_stem_table_tbody = new_stem_table.getElementsByTagName('tbody')[0];
    var empty_stem_row = document.getElementById("empty_stem_row_" + stemData["project_id"]);
    var stem_error_row = new_stem_table_tbody.insertBefore(document.createElement("TR"), empty_stem_row);
    stem_error_row.id = "stem_file_error_row_" + stemData["project_id"];

    var cell = stem_error_row.insertCell(0);
    cell.width = "10%";

    cell = stem_error_row.insertCell(1);
    var stemFileError = document.createTextNode("Please choose a stem.");
    cell.id = EVENT_HOME_VALIDATION_FIELD_ERROR_ID;
    cell.appendChild(stemFileError);

    stemData["stem_file_error"] = document.getElementById(stem_error_row.id).textContent;

}

// deletes the stem file error row.
function deleteStemFileErrorRow(stemData) {
    var new_stem_table = document.getElementById("new_stem_table_" + stemData["project_id"]);
    var new_stem_table_tbody = new_stem_table.getElementsByTagName('tbody')[0];
    var stem_file_error_index = document.getElementById("stem_file_error_row_" + stemData["project_id"]).rowIndex;
    new_stem_table_tbody.deleteRow(stem_file_error_index);
    stemData["stem_file_error"] = "";
}

// Sets the stem errors for stemData
function setStemDataErrors(stemData) {
    var stem_title_error = document.getElementById("stem_title_error_row");
    if(stem_title_error != null) {
        stem_title_error = stem_title_error.textContent;
        stemData["stem_title_error"] = stem_title_error;
    }
    else {
        stemData["stem_title_error"] = "";
    }

    var stem_file_error = document.getElementById("stem_file_error_row");
    if(stem_file_error != null) {
        stem_file_error = stem_file_error.textContent;
        stemData["stem_file_error"] = stem_file_error;
    }
    else {
        stemData["stem_file_error"] = "";
    }
}