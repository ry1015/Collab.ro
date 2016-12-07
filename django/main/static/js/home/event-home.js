var EVENT_HOME_NEW_PROJ_DESC_ID = "new_proj_desc";
var NEW_PROJECT_ROW_ID = "new_project_row";
var NEW_PROJECT_TABLE_ID = "new_project_table";
// Change project status
function changeProjectStatus(){
    var parent = getTable(this);
    var private = "PRIVATE";
    var public = "PUBLIC";
    var child = this.childNodes[0];
    var id = parent.id.split("_")[2];
    var processProjectStatus = function(result){
        if (child.textContent == public)
            child.data = private;
        else
            child.data = public;
    }

    var url = "api/change-project-status";
    var formData = new FormData();
    formData.append("projectID", id);
    postFormRequest(url, formData, processProjectStatus);
}

// Get parent table node
// node, the current node
// @return, the table node
function getTable(node){
    var current = node;
    while(current.tagName != "TABLE"){
        current = current.parentNode;
    }
    return current;
}

// Add new project
// Called by home.js
function newProjectEvent(){
    var new_project_exist = document.getElementById(NEW_PROJECT_ROW_ID);
    if (new_project_exist != null)
        return

    var body_div = document.getElementById(BODY_DIV_ID);
    var new_project_div = document.createElement("DIV");
    new_project_div.id = NEW_PROJECT_ROW_ID;

    var project_table = document.createElement("TABLE");
    project_table.id = NEW_PROJECT_TABLE_ID;

    var row = project_table.insertRow(project_table.rows.length);
    row.className = "projectRow"; //copied over from update_project_html branch
    row.id = NEW_PROJECT_ROW_ID;
    var cell = row.insertCell(0);
    var new_project_table = document.createElement("table");
    new_project_table.className = "projectTable"; //new

    new_project_table.className = NEW_PROJECT_TABLE_ID;
    new_project_table.id = NEW_PROJECT_TABLE_ID; //copied over from update_project_html branch
    cell.appendChild(new_project_table);


    // TITLE ROW
    row = new_project_table.insertRow(new_project_table.rows.length); //use new_project_table.rows.length to append row to the last index
    row.id = "projectTitleRow";
    cell = row.insertCell(0);
    var text = document.createTextNode("TITLE");
    cell.appendChild(text);

    cell = row.insertCell(1);
    // Please move style to css file
    cell.style.width = "100%";
    var input = document.createElement("INPUT");
    input.id = "project_name_field";
    input.placeholder = "Enter project title";
    cell.appendChild(input);

    var div = document.createElement("DIV");
    div.className = "required_field";
    var span = document.createElement("SPAN");
    var asterisk = document.createTextNode("*");
    span.appendChild(asterisk);
    div.appendChild(span);
    cell.appendChild(div);

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectStatusRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='project_status'>"+
                      "<option selected disabled>Status</option>"+
                                "<option value='public'>Public"+
                      "<option value='private'>Private";

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "emptyProjectTitleRow";
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");


    // INSERT TRACKS ROW
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectTrackTitleRow";
    cell = row.insertCell(0);
    text = document.createTextNode("TRACK");
    cell.appendChild(text);

    cell = row.insertCell(1);
    input = document.createElement("INPUT");
    input.id = "project_track_title";
    input.placeholder = "Enter track title";
    cell.appendChild(input);

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectTrackGenreRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='project_track_genre'>"+
                        "<option selected disabled>Genre</option>"+
                        "<option value='jazz'>Jazz"+
                        "<option value='metal'>Metal"+
                        "<option value='pop'>Pop"+
                        "<option value='rap'>Rap";

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectTrackStatusRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='project_track_status'>"+
                        "<option selected disabled>Status</option>"+
                        "<option value='public'>Public"+
                        "<option value='private'>Private";

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectTrackFileRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<input id='project_track_upload' type='file'>";

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "emptyProjectTrackRow";
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");


    // STEMS ROW
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectStemTitleRow";
    cell = row.insertCell(0);
    text = document.createTextNode("STEMS");
    cell.appendChild(text);

    cell = row.insertCell(1);
    input = document.createElement("INPUT");
    input.id = "project_stem_title";
    input.placeholder = "Enter stem title";
    cell.appendChild(input);

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectStemCategoryRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='project_stem_category'>"+
                        "<option selected disabled>Category</option>"+
                        "<option value='drums'>Drums"+
                        "<option value='guitar'>Guitar"+
                        "<option value='producer'>Producer"+
                        "<option value='vocal'>Vocal";

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectStemStatusRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.innerHTML = "<select id='project_stem_status'>"+
                        "<option selected disabled>Status</option>"+
                        "<option value='public'>Public"+
                        "<option value='private'>Private";

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectStemFileRow";
    cell = row.insertCell(0);
    cell.width = "10%";
    cell = row.insertCell(1);
    cell.innerHTML = "<input id='project_stem_upload' type='file'>";

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "emptyProjectStemRow";
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");

    // DESCRIPTION ROW
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "projectDescRow";
    cell = row.insertCell(0);
    cell.style.verticalAlign = "top";
    var desc_text = document.createTextNode("DESCRIPTION");
    cell.appendChild(desc_text);
    cell = row.insertCell(1);
    var textarea = document.createElement("TEXTAREA");
    textarea.rows = 5;
    textarea.id = EVENT_HOME_NEW_PROJ_DESC_ID;
    textarea.placeholder = "Enter project description...";
    cell.appendChild(textarea);

    // Extra spacing
    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id = "emptyProjectDescRow";
    cell = row.insertCell(0);
    cell.setAttribute("class", "empty_cell");

    row = new_project_table.insertRow(new_project_table.rows.length);
    row.id= "projectUserActionRow";
    cell = row.insertCell(0);
    cell.width = "10%";

    cell = row.insertCell(1);
    cell.style.textAlign = "right";
    cell.innerHTML = "<button id='project_save_button'>SAVE</button>";
    cell.innerHTML += "<button id='project_cancel_button'>CANCEL</button";
    new_project_div.appendChild(project_table);

    var user_projects = document.getElementById(USER_PROJECTS_WRAPPER_DIV);
    if (user_projects == null)
        body_div.appendChild(new_project_div);
    else
        body_div.insertBefore(new_project_div, user_projects);

    document.getElementById("project_save_button").addEventListener('click', saveProjectEvent, false);
    document.getElementById("project_cancel_button").addEventListener('click', cancelProjectEvent, false);
}

function cancelProjectEvent() {
    var project_row_div = document.getElementById(NEW_PROJECT_ROW_ID);
    var parent = document.getElementById(BODY_DIV_ID);
    
    project_row_div.setAttribute("class","fadeOut");
    setTimeout(function(){
        parent.removeChild(project_row_div);
    }, 300);
}

function saveProjectEvent(){
    var username = current_user.user.username;
    var projectName = document.getElementById("project_name_field").value;
    var projectStatus = document.getElementById("project_status");
    var selectedProjectStatusIndex = projectStatus.selectedIndex;
    var selectedProjectStatus = projectStatus.options[selectedProjectStatusIndex].value;
    if(selectedProjectStatus== "Status") {
        selectedProjectStatus = "";
    }
    var projectTrackGenre = document.getElementById("project_track_genre");
    var selectedProjectTrackGenreIndex = projectTrackGenre.selectedIndex;
    var selectedProjectTrackGenre = projectTrackGenre.options[selectedProjectTrackGenreIndex].value;
    if(selectedProjectTrackGenre== "Genre") {
        selectedProjectTrackGenre = "";
    }
    var projectTrackStatus = document.getElementById("project_track_status");
    var selectedProjectTrackStatusIndex = projectTrackStatus.selectedIndex;
    var selectedProjectTrackStatus = projectTrackStatus.options[selectedProjectTrackStatusIndex].value;
    if(selectedProjectTrackStatus== "Status") {
        selectedProjectTrackStatus = "";
    }
    var projectTrackTitle = document.getElementById("project_track_title").value;
    var projectTrackFilename = document.getElementById("project_track_upload");

    var projectStemCategory = document.getElementById("project_stem_category");
    var selectedProjectStemCategoryIndex = projectStemCategory.selectedIndex;
    var selectedProjectStemCategory = projectStemCategory.options[selectedProjectStemCategoryIndex].value
    if(selectedProjectStemCategory== "Category") {
        selectedProjectStemCategory = "";
    }
    var projectStemStatus = document.getElementById("project_stem_status");
    var selectedProjectStemStatusIndex = projectStemStatus.selectedIndex;
    var selectedProjectStemStatus = projectStemStatus.options[selectedProjectStemStatusIndex].value;
    if(selectedProjectStemStatus== "Status") {
        selectedProjectStemStatus = "";
    }
    var projectStemTitle = document.getElementById("project_stem_title").value;
    var projectStemFilename = document.getElementById("project_stem_upload");

    var projectDescription = document.getElementById(EVENT_HOME_NEW_PROJ_DESC_ID).value;

    var projectData = {};
    var trackData = {};
    var stemData = {};

    projectData["project_name"] = projectName;
    projectData["project_status"] = selectedProjectStatus;
    projectData["project_description"] = projectDescription;

    trackData["project_track_title"] = projectTrackTitle;
    trackData["selected_project_track_genre"] = selectedProjectTrackGenre;
    trackData["selected_project_track_status"] = selectedProjectTrackStatus;
    trackData["project_track_filename"] = projectTrackFilename.value;

    stemData["project_stem_title"] = projectStemTitle;
    stemData["selected_project_stem_category"] = selectedProjectStemCategory;
    stemData["selected_project_stem_status"] = selectedProjectStemStatus;
    stemData["project_stem_filename"] = projectStemFilename.value;

    var processProject = function(result)
    {
        var element = document.getElementById(NEW_PROJECT_ROW_ID).outerHTML = "";
        delete element;
        refreshProjects();
    }


    var formData = new FormData();

    formData.append("username", username);
    formData.append("project_name", projectName);
    formData.append("project_status", selectedProjectStatus);
    formData.append("project_description", projectDescription);
    formData.append("track_title", projectTrackTitle);
    formData.append("track_genre", selectedProjectTrackGenre);
    formData.append("track_status", selectedProjectTrackStatus);
    formData.append("track_filename", projectTrackFilename.files[0]);
    formData.append("stem_title", projectStemTitle);
    formData.append("stem_category", selectedProjectStemCategory);
    formData.append("stem_status", selectedProjectStemStatus);
    formData.append("stem_filename", projectStemFilename.files[0]);

    var valid_form = checkNewProject(projectData, trackData, stemData); // event-home-validation.js

    if(valid_form) {
        var url = "api/add_project";
        postFormRequest(url, formData, processProject);
    }
}

function deleteProjectEvent(id){
  var processProject = function(result)
  {
        refreshProjects();
  }

  var url = "api/delete_project";
    var data = 
    {
        "id":id
    };
    
    data = JSON.stringify(data);
    deleteRequest(url, data, processProject);
}



