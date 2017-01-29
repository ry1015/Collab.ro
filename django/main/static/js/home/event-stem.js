function addUploadStemEvent(node){
    node.onclick = uploadStem;
}

function createProjectStemEvent(stem_node, proj_obj){
    stem_node.onclick = function(){
        console.log("CREATING STEM FILES PAGE");
        console.log(proj_obj);
        var children = ["project-detail-track", "options-div", "info-div"];
        var parent = document.getElementById("project-detail-wrapper");
        
        //Remove children from parent
        for (i = 0; i < children.length; ++i){
            var child = document.getElementById(children[i]);
            if (child != null)
                parent.removeChild(child);
        }

        //Change highlighted link
        var proj_overview_link = document.getElementById("project-overview-link");
        var proj_stem_link = document.getElementById("project-stem-files-link");

        if (proj_stem_link.children.length > 0){ //Stem Files Selected
            return;
        }
        else {
            var text = proj_stem_link.textContent;
            proj_stem_link.innerHTML = "<b><u>" + text + "</u></b>";
            proj_overview_link.innerHTML = proj_overview_link.textContent;
            createStemTitle(parent, proj_obj);
        }

    }
}

function createStemTitle(parent, proj_obj){
    var stem_title_div = document.createElement("DIV");
    stem_title_div.id = "stem-files-title-div";

    // Create current stem files count div
    var current_stem_files_div = document.createElement("DIV");
    var span = document.createElement("SPAN");
    var stem_count = proj_obj.stems.length;
    var content = "Current Stem Files (" + stem_count + ")";
    var stem_files_text = document.createTextNode(content);
    span.appendChild(stem_files_text);
    current_stem_files_div.appendChild(span);

    // Create uplaod stem div
    var stem_upload_div = document.createElement("DIV");
    stem_upload_div.id = "stem-upload";
    var upload_span = document.createElement("SPAN");
    content = "+ Upload Stem";
    var upload_text = document.createTextNode(content);
    upload_span.appendChild(upload_text);
    stem_upload_div.appendChild(upload_span);

    stem_title_div.appendChild(current_stem_files_div);
    stem_title_div.appendChild(stem_upload_div);
    parent.appendChild(stem_title_div);
}

function uploadStem(){
    
}

//Creates stem table using the result of api/get_project_stems
function createStemTableEvent(project_id){
    var url = "api/get_project_stems";
    var formData = new FormData();
    formData.append("proj_id", project_id);
    var result = postFormRequest(url, formData, createStemTable);
}

var createStemTable = function(result){
    if(result == null){
        return null;
    }
    var stem_data = result;
    var project_id = stem_data[0]["proj_id"];
    var stemTable = document.getElementById(STEM_TABLE_ID + project_id);

    for(i = 0; i < stem_data.length; i++){
        
        //Create single_stem_table
        var single_stem_table = document.createElement("table");
        single_stem_table.id = "stem_" + stem_data[i]["proj_id"] + "_table";
        var header = single_stem_table.createTHead();
        var row = header.insertRow();
        var cell = row.insertCell();
        var b = document.createElement("B");
        var text = document.createTextNode(stem_data[i]["title"]);
        b.appendChild(text);
        cell.appendChild(b);

        //Create Text Node that signifies owner of stem
        var ownerText = document.createTextNode(" (owner: " + stem_data[i]["stem_user_id"] + ")");
        cell.appendChild(ownerText);
        
        var deleteStemButton = document.createElement("button");
        deleteStemButton.id = DELETE_STEM_BUTTON_ID;
        deleteStemButton.value = stem_data[i]["stem_id"];
        deleteStemButton.appendChild(document.createTextNode("Delete"));
        deleteStemButton.addEventListener('click', function() { deleteStemEvent(this.value); }, false);
        cell = row.insertCell();
        cell.appendChild(deleteStemButton);
        
        //Append single_stem_table to StemListTable
        row = stemTable.insertRow();
        cell = row.insertCell();
        cell.appendChild(single_stem_table);
    }
}

// Uploads a Stem to current Project
function addNewStemEvent(button_id) {
    var new_stem_exist = document.getElementById(NEW_STEM_ROW_ID + proj_id);
    if(new_stem_exist != undefined) {
        return
    }
    var proj_id = button_id.replace("add_stem_", "");
    var stem_table_body= document.getElementById(STEM_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
    if(stem_table_body.hasChildNodes()) {
        stem_table_body.innerHTML = "";
    }

    // NEW STEM TABLE
    var row = stem_table_body.insertRow(0);
    row.id = NEW_STEM_ROW_ID + proj_id;
    var cell = row.insertCell(0);
    var new_stem_table = document.createElement("table");
    new_stem_table.id = "new_stem_table_" + proj_id;
    new_stem_table.className = NEW_STEM_TABLE_ID;
    cell.appendChild(new_stem_table);

    row = new_stem_table.insertRow(new_stem_table.rows.length);
	row.id = "stem_title_row_" + proj_id;
    cell = row.insertCell(0);
    text = document.createTextNode("STEMS");
    cell.appendChild(text);

    cell = row.insertCell(1);
    var input = document.createElement("INPUT");
    input.id = "stem_title_" + proj_id;
    input.placeholder = "Enter stem title";
    cell.appendChild(input);

    var div = document.createElement("DIV");
    div.className = "required_field";
    var span = document.createElement("SPAN");
    var asterisk = document.createTextNode("*");
    span.appendChild(asterisk);
    div.appendChild(span);
    cell.appendChild(div);

    row = new_stem_table.insertRow(new_stem_table.rows.length);
	row.id = "stem_category_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    var stemCategoryId = "stem_category_" + proj_id;
    cell.innerHTML = "<select id='"+stemCategoryId+"'>"+ 
                        "<option selected disabled>Category</option>"+
                        "<option value='drums'>Drums"+
                        "<option value='guitar'>Guitar"+
                        "<option value='producer'>Producer"+
                        "<option value='vocal'>Vocal";

    row = new_stem_table.insertRow(new_stem_table.rows.length);
    row.id = "stem_status_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    var stemStatusId = "stem_status_" + proj_id;
    cell.innerHTML = "<select id='"+stemStatusId+"'>"+
                        "<option selected disabled>Status</option>"+
                        "<option value='public'>Public"+
                        "<option value='private'>Private";

    row = new_stem_table.insertRow(new_stem_table.rows.length);
	row.id = "stem_file_row_" + proj_id;
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    var stemUploadId = "stem_upload_" + proj_id;
    cell.innerHTML = "<input id='"+stemUploadId+"' type='file'>";

    var file = document.getElementById(stemUploadId);
    file.style.width = "73.5%";
    div = document.createElement("DIV");
    div.className = "required_field";
    span = document.createElement("SPAN");
    asterisk = document.createTextNode("*");
    span.appendChild(asterisk);
    div.appendChild(span);
    cell.appendChild(div);

    // Extra spacing
    row = new_stem_table.insertRow(new_stem_table.rows.length);
	row.id = "empty_stem_row_" + proj_id;
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");

    // Stem Save Button
    row = new_stem_table.insertRow(new_stem_table.rows.length);
	row.id = "stem_user_action_row_" + proj_id;
    cell = row.insertCell(0);
    var saveButton = document.createElement("BUTTON");
    saveButton.id = "stem_save_button_" + proj_id;
    saveButton.value = proj_id;
    saveButton.innerHTML = "SAVE";
    saveButton.addEventListener('click', function() { saveStemEvent(this.value); }, false);
    cell.appendChild(saveButton);

    // Stem Cancel Button
    cell = row.insertCell(1);
    var cancelButton = document.createElement("BUTTON");
    cancelButton.id = "stem_cancel_button_" + proj_id;
    cancelButton.value = proj_id;
    cancelButton.innerHTML = "CANCEL";
    cancelButton.addEventListener('click', function() { cancelStemEvent(this.value); }, false);
    cell.appendChild(cancelButton);
}

function cancelStemEvent(proj_id) {
    var stem_table_body = document.getElementById(STEM_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
    stem_table_body.deleteRow(0);
}

function saveStemEvent(proj_id){
    var username = current_user.user.username;
    var stemCategoryId = "stem_category_" + proj_id;
    var stemCategory = document.getElementById(stemCategoryId);
    var selectedStemCategoryIndex = stemCategory.selectedIndex;
    var selectedStemCategory = stemCategory.options[selectedStemCategoryIndex].value;
    if(selectedStemCategory == "Category") {
        selectedStemCategory = "";
    }
    var stemStatusId = "stem_status_" + proj_id;
    var stemStatus = document.getElementById(stemStatusId);
    var selectedStemStatusIndex = stemStatus.selectedIndex;
    var selectedStemStatus = stemStatus.options[selectedStemStatusIndex].value;
    if(selectedStemStatus == "Status") {
        selectedStemStatus = "";
    }
    var stemTitleId = "stem_title_" + proj_id;
    var stemTitle = document.getElementById(stemTitleId).value;
    var stemFilenameId = "stem_upload_" + proj_id;
    var stemFilename = document.getElementById(stemFilenameId);

	var stemData = {};

    stemData["project_id"] = proj_id;
    stemData["stem_title"] = stemTitle;
    stemData["selected_stem_category"] = selectedStemCategory;
    stemData["selected_stem_status"] = selectedStemStatus;
    stemData["stem_filename"] = stemFilename.value;

    var processStem = function(result)
    {
        var stem_table_body = document.getElementById(STEM_TABLE_ID + proj_id).getElementsByTagName('tbody')[0];
        stem_table_body.deleteRow(0);
        refreshProjects();
    }

    var formData = new FormData();
    formData.append("username", username);
    formData.append("category", selectedStemCategory);
    formData.append("stem_status", selectedStemStatus);
    formData.append("stem_title", stemTitle);
    formData.append("proj_id", proj_id);
    formData.append("filename", stemFilename.files[0]);

    var valid_form = checkNewStem(stemData);

    if(valid_form) {
        var url = "api/upload_stem";
        postFormRequest(url, formData, processStem);
    }
}

function deleteStemEvent(stem_id){
    var url = "api/delete_stem";
    var formData = new FormData();
    formData.append("stem_id", stem_id);
    deleteFormRequest(url, formData, refreshProjects);
    refreshProjects();
}