// Global Variables
var HOME_DIV_ID = "home_div";
var PROJ_DIV_ID = "project_div";
var PROJECT_TABLE_ID = "project_table";
var PROJECT_TABLE_BODY_ID = "project_table_body";
var NEW_PROJECT_TABLE_ID = "new_project_table";
var NEW_PROJECT_ROW_ID = "new_project_row";
var BODY_DIV_ID = "body_div";
var CURRENT_TRACKS_ID = "current-tracks-div";
var NEW_PROJECT_ID = "new_project";
var DELETE_PROJECT_ID = "delete_project";
var STEM_TABLE_ID = "stem_table_";
var NEW_STEM_ROW_ID = "new_stem_row_";
var NEW_STEM_TABLE_ID = "new_stem_table";
var TRACK_TABLE_ID = "track_table_";
var NEW_TRACK_ROW_ID = "new_track_row_";
var NEW_TRACK_TABLE_ID = "new_track_table";
var DELETE_TRACK_BUTTON_ID = "delete_track_button";
var DELETE_STEM_BUTTON_ID = "delete_stem_button";
var MY_PROJECTS_DIV_ID = "my_projects_div";
var MY_PROJECTS_WRAPPER_DIV = "my_projects_wrapper_div";
var CREATE_PROJECT_DIV_ID = "create_project_div";
var MY_PROJECTS_SPAN_ID = "my_projects_span";
var MY_PROJECTS_DIV_CLASS = "my_projects_div_class";
var USER_PROJECTS_WRAPPER_DIV = "user_projects";
var project_data;

// Add click event when new_project id is clicked
function addProjectButtonEventListener(){
    document.getElementById(NEW_PROJECT_ID).addEventListener('click', newProjectEvent, false); //event-home.js
}

function projectStatusEventListener(node){
    node.onclick = changeProjectStatus;
}

// Creates Current Uploaded Tracks of A User
// user, current user
function createCurrentTracks(user){
    var body_div = document.getElementById(BODY_DIV_ID);
    var current_tracks_div = document.createElement("div");
    current_tracks_div.id = CURRENT_TRACKS_ID;

    var table = document.createElement("table");
    var row = table.insertRow(table.rows.length);
    
    for (var i=0; i < 2; i++){
        var cell = row.insertCell(i);
    }
}

// Create user home page
// user, current user
function createHomePage(user){
    // Check if user has uploaded some music
    createCurrentTracks(user);
    var parent_node = document.getElementById(BODY_DIV_ID);
    // createTrackList(parent_node); //track-list.js
    createProjectsTitle(parent_node);
    // createProject(parent_node);
}

function createProjectsTitle(parent_node){
    var projects_div = document.createElement("DIV");
    projects_div.id = MY_PROJECTS_WRAPPER_DIV;  
    var my_projects_div = document.createElement("DIV");
    my_projects_div.id = MY_PROJECTS_DIV_ID;
    var create_project_div = document.createElement("DIV");
    create_project_div.id = CREATE_PROJECT_DIV_ID;
    
    var span = document.createElement("SPAN");
    span.id = MY_PROJECTS_SPAN_ID;
    var text = document.createTextNode("My Projects");
    span.appendChild(text);
    my_projects_div.appendChild(span);
    my_projects_div.setAttribute("class", MY_PROJECTS_DIV_CLASS);
    projects_div.appendChild(my_projects_div);
    

    span = document.createElement("SPAN");
    span.id = NEW_PROJECT_ID;
    text = document.createTextNode("+ Create Project");
    span.appendChild(text);
    create_project_div.appendChild(span);
    create_project_div.setAttribute("class", MY_PROJECTS_DIV_CLASS);
    projects_div.appendChild(create_project_div);

    parent_node.appendChild(projects_div);
    addProjectButtonEventListener();
    refreshProjects();
}

// Creates user project div
// parent_node, parent div where the project div will be appended to
function createProject(parent_node){
    var attributes = [];
    var project_node = document.createElement("div");
    project_node.id = PROJ_DIV_ID;
    project_node.className = "projectDiv";

    var project_list_table = document.createElement("table"); //copied over from update_project_html branch
    project_list_table.id = PROJECT_TABLE_ID; //copied over from update_project_html branch
    
    var header = project_list_table.createTHead(); //copied over from update_project_html branch
    var row = header.insertRow();
    var cell = row.insertCell(0);
    var b = document.createElement("B");

    var text = document.createTextNode("PROJECT");
    b.appendChild(text);
    cell.appendChild(b);
    var img= document.createElement("IMG");
    img.id = "new_project";
    img.src = "media/add_project_button.png";
    cell.appendChild(img);;

    var body = project_list_table.createTBody(); //copied over from update_project_html branch
    body.id = PROJECT_TABLE_BODY_ID;
    
    project_node.appendChild(project_list_table); //copied over from update_project_html branch
    parent_node.appendChild(project_node);

    addProjectButtonEventListener();
    refreshProjects();
}

// Get all music title
function getMusicTitle(){

}

// Checks if a dictionary is empty
function isEmpty(some_list){
    for (var i in some_list)
        return false;
    return true;
}

// Creates User Home Page
// user, current user
// user contains {info and user}
// info contains address, phone_number, and address
// user contains username, password, and email
function showHome(user){
    var login = document.getElementById("login");
    if (login.innerHTML != "")
        login.innerHTML = "";
    
    var main = document.getElementById("main");

    // Add Header
    var header_div = createHeader();
    main.appendChild(header_div);

    // Add Navigation
    var nav_div = createNavigationBar(); //navigation.js
    main.appendChild(nav_div);

    // Add Navigation Event Listener
    addNavigationEventListener(); //navigation.js

    var body = document.createElement("div");
    body.id = BODY_DIV_ID;
    main.appendChild(body);
    openHomePage(); //navigation.js
}

//TODO: Shortern function, split up repetitive code
var processProjectData = function(result)
{
    project_data = result;
    var user_projects = document.getElementById(USER_PROJECTS_WRAPPER_DIV);
    while (user_projects.children.length > 0){
        var last_child = user_projects.lastElementChild;
        user_projects.removeChild(last_child);
    }

    var bold_node = undefined;
    var text_node = undefined;
    var anchor_node = undefined;
    var text = undefined;
    var parent = document.getElementById('user_projects');
    for (i = 0; i < project_data.length; i++){
        var project_id = project_data[i]["id"];
        var user_project_div = document.createElement("DIV");
        user_project_div.setAttribute('class', 'user_project');
        user_project_div.id = "project_table_" + project_id;

        //Create Project Table Header & Title
        var project_header = document.createElement("DIV");
        project_header.setAttribute('class', 'project_title_div');
        anchor_node = document.createElement("A");
        anchor_node.href="#";
        bold_node = document.createElement("B");
        text = document.createTextNode(project_data[i]["name"]);
        bold_node.appendChild(text);
        bold_node.onclick = getProjectId; //event-project-detail.js
        anchor_node.appendChild(bold_node);
        project_header.appendChild(anchor_node);

        //Create Delete Button
        var project_delete_div = document.createElement("DIV");
        project_delete_div.setAttribute('class', 'project_delete_div');
        var deleteButton = document.createElement("button");
        deleteButton.id = DELETE_PROJECT_ID;
        deleteButton.value = project_id;
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', function() { deleteProjectEvent(this.value); }, false);
        var span = document.createElement("SPAN");
        project_delete_div.appendChild(deleteButton);

        user_project_div.appendChild(project_header);
        user_project_div.appendChild(project_delete_div);
        parent.appendChild(user_project_div);
        // projectRow = projects_table_body.insertRow();
        // var project_id = project_data[i]["id"]; //copied over from update_project_html branch
        // projectRow.id = "project_row_" + project_id; //copied over from update_project_html branch
        // projectRow.className = "projectRow";
        // var cell = projectRow.insertCell(0);
        
        // //Create Project Table
        // var project_table = document.createElement("table");
        // project_table.className = "projectTable";
        // project_table.id = "project_table_" +project_id;
        // cell.appendChild(project_table);
        
        // //Create Project Table Header & Title
        // var header = project_table.createTHead();
        // var row = header.insertRow();
        // cell = row.insertCell(0);
        // anchor_node = document.createElement("A");
        // anchor_node.href="#";
        // bold_node = document.createElement("B");
        // text = document.createTextNode(project_data[i]["name"]);
        // bold_node.appendChild(text);
        // bold_node.onclick = getProjectId; //event-project-detail.js
        // anchor_node.appendChild(bold_node);
        // cell.appendChild(anchor_node);
        // // cell.innerHTML = "<b>" + project_data[i]["name"] + "</b>";
        
        // //Create Delete Button
        // var deleteButton = document.createElement("button");
        // deleteButton.id = DELETE_PROJECT_ID;
        // deleteButton.value = project_id;
        // deleteButton.innerHTML = "Delete";
        // deleteButton.addEventListener('click', function() { deleteProjectEvent(this.value); }, false);
        // var span = document.createElement("SPAN");
        // span.appendChild(deleteButton);
        // cell.appendChild(deleteButton); //ADD TEXT TO DELETE BUTTON

        // //Create Public/Private Button
        // var div = document.createElement("DIV");
        // span = document.createElement("SPAN");
        // span.style.fontSize="10px";
        // span.style.paddingRight="3px";
        // text = document.createTextNode(project_data[i].status.toUpperCase());
        // span.appendChild(text);
        // projectStatusEventListener(span);
        // div.appendChild(span);
        // div.style.display="inline-block";
        // div.style.float="right";
        // cell.appendChild(div);

        // //Create Project Table Body
        // var body = project_table.createTBody();
        // row = body.insertRow();
        // var trackCell = row.insertCell();
        // row = body.insertRow();
        // var stemCell = row.insertCell();
        
        // //Create Track Table
        // var trackTable = document.createElement("table");
        // trackTable.id = TRACK_TABLE_ID + project_id;
        // trackCell.appendChild(trackTable);
        // header = trackTable.createTHead();
        // row = header.insertRow();
        // cell = row.insertCell();
        // var b = document.createElement("B");
        // var text = document.createTextNode("Tracks");
        // b.appendChild(text);
        // cell.appendChild(b);
        // var addTrackButton = document.createElement("IMG");
        // addTrackButton.id = "add_track_" + project_id;
        // addTrackButton.className = "add_track";
        // addTrackButton.src = "media/add_track_button.png";
        // addTrackButton.addEventListener('click', function() { addNewTrackEvent(this.id); }, false);
        // // cell.innerHTML = "<p> Track Placeholder </p>"; //modify to load tracks & stems from backend
        // //cell = row.insertCell(1);
        // cell.appendChild(addTrackButton);
        // body = trackTable.createTBody();
        
        // //Load Track List Here
        // createTrackTableEvent(project_id); //event-track.js
        
        // //Create Stem Table
        // var stemTable = document.createElement("table");
        // stemTable.id = STEM_TABLE_ID + project_id;
        // stemCell.appendChild(stemTable);
        // header = stemTable.createTHead();
        // row = header.insertRow();
        // cell = row.insertCell();
        // var b = document.createElement("B");
        // var text = document.createTextNode("Stems");
        // b.appendChild(text);
        // cell.appendChild(b);
        // var addStemButton = document.createElement("IMG");
        // addStemButton.id = "add_stem_" + project_id;
        // addStemButton.className = "add_stem";
        // addStemButton.src = "media/add_stem_button.png";
        // addStemButton.addEventListener('click', function() { addNewStemEvent(this.id); }, false); // event-stem.js
        // // cell.innerHTML = "Stem PlaceHolder";
        // cell.appendChild(addStemButton);
        // body = stemTable.createTBody();
		
        // //Load Stem List Here
        // createStemTableEvent(project_id); //event-stem.js      
    }

}

var refreshProjects = function(args){
    var body_div = document.getElementById(BODY_DIV_ID);
    var user_projects_div = document.createElement("DIV");
    user_projects_div.id = USER_PROJECTS_WRAPPER_DIV;
    var table = document.createElement("TABLE");
    table.id = PROJECT_TABLE_ID;
    
    user_projects_div.appendChild(table);
    body_div.appendChild(user_projects_div);
    var username = current_user.user.username;
    
    var url = "api/get_projects";
    var data = 
    {
        "username": username
    };
    
    data = JSON.stringify(data);
    postRequest(url, data, processProjectData);
}



