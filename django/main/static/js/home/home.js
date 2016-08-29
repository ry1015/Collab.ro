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
var home_data;

// Add click event when new_project id is clicked
function addProjectButtonEventListener(){
    document.getElementById(NEW_PROJECT_ID).addEventListener('click', newProjectEvent, false); //event-home.js
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
    createTrackList(parent_node); //track-list.js
    createProject(parent_node);
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

var processProjectData = function(result)
{
	home_data = result;
	var projects_table_body = document.getElementById(PROJECT_TABLE_BODY_ID);
	while(projects_table_body.rows.length > 0) {
	    projects_table_body.deleteRow(0);
    }

	for (i = 0; i < home_data.length; i++){
        projectRow = projects_table_body.insertRow();
        var project_id = home_data[i]["id"]; //copied over from update_project_html branch
        projectRow.id = "project_row_" + project_id; //copied over from update_project_html branch
        projectRow.className = "projectRow";
        var cell = projectRow.insertCell(0);
		
		//Create Project Table
        var project_table = document.createElement("table");
        project_table.className = "projectTable";
        project_table.id = "project_table_" +project_id;
        cell.appendChild(project_table);
		
		//Create Project Table Header & Title
        var header = project_table.createTHead();
        var row = header.insertRow();
        cell = row.insertCell(0);
        cell.innerHTML = "<b>" + home_data[i]["name"] + "</b>";
		
		//Create Delete Button
        var deleteButton = document.createElement("button");
        deleteButton.id = DELETE_PROJECT_ID;
        deleteButton.value = project_id;
		deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', function() { deleteProjectEvent(this.value); }, false);
		var span = document.createElement("SPAN");
		span.appendChild(deleteButton);
		cell.appendChild(deleteButton); //ADD TEXT TO DELETE BUTTON
				
		//Create Project Table Body
        var body = project_table.createTBody();
        row = body.insertRow();
        var trackCell = row.insertCell();
        row = body.insertRow();
        var stemCell = row.insertCell();
		
		//Create Track Table
        var trackTable = document.createElement("table");
        trackCell.appendChild(trackTable);
		header = trackTable.createTHead();
        row = header.insertRow();
        cell = row.insertCell();
        var span = document.createElement("SPAN");
        var addTrackButton = document.createElement("IMG");
        addTrackButton.id = "add_track_" + project_id;
        addTrackButton.className = "add_track";
        addTrackButton.addEventListener('click', function() { addNewTrackEvent(this.id); }, false);
        cell.innerHTML = "<p> Track Placeholder </p>"; //modify to load tracks & stems from backend
		//cell = row.insertCell(1);
        body = trackTable.createTBody();
		//TODO: Load Track List Here
		
		//Create Stem Table
        var stemTable = document.createElement("table");
		stemTable.id = STEM_TABLE_ID + project_id;
        stemCell.appendChild(stemTable);
        header = stemTable.createTHead();
        row = header.insertRow();
        cell = row.insertCell();
		span = document.createElement("SPAN");
		var addStemButton = document.createElement("IMG");
		addStemButton.id = "add_stem_" + project_id;
		addStemButton.className = "add_stem";
		addStemButton.addEventListener('click', function() { addNewStemEvent(this.id); }, false);
        cell.innerHTML = "Stem PlaceHolder";
		span.appendChild(addStemButton);
		cell.appendChild(span);
        body = stemTable.createTBody();
		//TODO: Load Stem List Here
				
//		cell = projectRow.insertCell(1);
//		cell.innerHTML = "<p>" + "Track Place Holder" + "</p>";
	}
}

function refreshProjects(){
	var username = current_user.user.username;
	
	var url = "api/get_projects";
    var data = 
    {
        "username": username
    };
    
    data = JSON.stringify(data);
    postRequest(url, data, processProjectData);
}



